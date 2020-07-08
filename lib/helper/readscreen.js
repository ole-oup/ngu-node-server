import robot from 'robotjs';
import tesseract from 'tesseract.js';
import screenshot from 'screenshot-desktop';
import jimp from 'jimp';

import cp from './print.js';
import rl from './question.js';

const { createWorker } = tesseract;

/* todo
wenn es nicht klappt (zahl interpretieren) -> noch mal (x versuche, option?)

screenshot 1 -> ss 2 -> zusammen -> ganzes bild lesen -> zahlen interpretieren
*/

// print status with a spinner
const spinner = ['|', '/', '-', '\\'];
const spinnerCP = async (text, spinner) => {
  const str = `  ${spinner[0]} ${text}\r`;

  spinner.push(spinner[0]);
  spinner.shift();

  cp(str);
  return new Promise((resolve) => {
    setTimeout(resolve, 90);
  });
};

// worker for tesseract with logging
const worker = createWorker({
  logger: (m) => {
    const prog = m.progress.toFixed(2) * 100;
    const text = `${m.status}: ${prog} %`;
    spinnerCP(text, spinner);
  },
});

// interpret the number from tesseract result (text, resource)
const getNumber = async (txt, res) => {
  console.clear(); // todo weg?
  const text = txt; // (new) String(txt)

  // number 1: cap
  const cap = {};
  cap.i = text.indexOf('+');
  cap.base = text.substr(cap.i - 4, 4);
  cap.exp = text.substr(cap.i + 2, 2);
  cap.num = (Number(cap.base) / 1000) * Math.pow(10, Number(cap.exp));
  cap.str = `${res}: ${cap.base[0]}.${cap.base.substr(1, 3)}E+0${cap.exp}`;

  // number 2: resource per second
  const rps = {};
  rps.i = text.lastIndexOf('+');
  rps.base = text.substr(rps.i - 4, 4);
  rps.exp = text.substr(rps.i + 2, 2);
  rps.num = (Number(rps.base) / 1000) * Math.pow(10, Number(rps.exp));
  rps.str = `   ${rps.base[0]}.${rps.base.substr(1, 3)}E+0${rps.exp}`;

  // print numbers
  console.log(`${cap.str}\n${rps.str}`);

  const cont = await rl('continue (y/n)? ');
  const c = cont.toLowerCase();

  if (c === 'y' || c === 'yes') return { cap, rps };

  throw 'Number capturing aborted';
};

const readResource = async (bounds, win, res) => {
  console.clear();

  let ji = Object(null);
  try {
    const x = bounds.x + 13;
    const y = res === 'e' ? bounds.y + 30 : bounds.y + 71;

    win.bringToTop();
    robot.moveMouse(x, y);

    spinnerCP('waiting for image', spinner);
    let img = await screenshot({ format: 'png' });

    ji = await jimp.read(img);
    ji.crop(bounds.x, bounds.y, 250, 150);
    ji.getBuffer('image/jpeg', (err, buffer) => {
      if (err) return cp(err, true);
      img = buffer;
    });

    // tesseract reading the screen
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
      tessedit_char_whitelist: '0123456789+',
    });
    const {
      data: { text },
    } = await worker.recognize(img);

    if (res === 'm') await worker.terminate(); // todo richtig so?

    // interpret the string from tesseract
    spinnerCP('interpreting text', spinner);

    return getNumber(text, res); // todo await?
  } catch (err) {
    cp(err, true);
  }
};

const screenReader = class {
  constructor(bounds, gameWin) {
    this.bounds = bounds;
    this.gameWin = gameWin;
  }

  async readScreen(r) {
    return r === 'e'
      ? await readResource(this.bounds, this.gameWin, 'e')
      : await readResource(this.bounds, this.gameWin, 'm');
  }

  // async readEnergy() {
  //   const rre = await readResource(this.bounds, this.gameWin, 'e');
  //   return rre;
  // }

  // async readMagic() {
  //   const rrm = await readResource(this.bounds, this.gameWin, 'm');
  //   return rrm;
  // }
};

export default screenReader;
