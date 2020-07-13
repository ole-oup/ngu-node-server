import robot from 'robotjs';
import tesseract from 'tesseract.js';
import screenshot from 'screenshot-desktop';
import jimp from 'jimp';

import cp from './print.js';
import rl from './question.js';

const { createWorker } = tesseract;

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
const getNumber = async (txt) => {
  console.clear(); // todo weg?
  const text = txt; // (new) String(txt)

  //todo const cap = { x: y,}
  // number 1: cap
  const cap = {};
  cap.i = text.indexOf('+');
  cap.base = text.substr(cap.i - 4, 4);
  cap.exp = text.substr(cap.i + 2, 2);
  cap.num = (Number(cap.base) / 1000) * Math.pow(10, Number(cap.exp));
  cap.str = `${cap.base[0]}.${cap.base.substr(1)}E+0${cap.exp}`;

  // number 2: resource per second
  const rps = {};
  rps.i = text.lastIndexOf('+');
  rps.base = text.substr(rps.i - 4, 4);
  rps.exp = text.substr(rps.i + 2, 2);
  rps.num = (Number(rps.base) / 1000) * Math.pow(10, Number(rps.exp));
  rps.str = `${rps.base[0]}.${rps.base.substr(1)}E+0${rps.exp}`;

  // print numbers
  console.log(`${cap.str}\n${rps.str}`);

  const cont = await rl('continue (y/n)? ');
  const c = cont.toLowerCase();

  if (c === 'y' || c === 'yes') return { cap, rps };

  /*
    can be multiple, space to separate
    c = cap, r = rps
    b = xxxx, e = xx
    always enter without dot
    eg: 1519c 12b
  */
  try {
    const cor = await rl('correction (value + c || r): ');
    const ca = cor.split(' ');

    if (ca.length > 4) throw 'Too many arguments';

    ca.forEach((str) => {
      const v = str[str.length - 1];
      const base = str.substring(0, 4);
      const exp = str.substring(0, 2);

      if (Number.isNaN(base) || Number.isNaN(exp)) throw 'Number = NaN';

      // todo klappt nicht
      if (v === 'c')
        cap.num =
          str.length === 5
            ? Number(str.substring(0, 4) * Math.pow(10, cap.exp))
            : cap.base * Math.pow(10, Number(exp));
      else if (v === 'r')
        rps.num =
          str.length === 5
            ? Number(str.substring(0, 4) * Math.pow(10, rps.exp))
            : rps.base * Math.pow(10, Number(exp));
    });

    return { cap, rps };
  } catch (err) {
    // cp(err, true);
    process.exit;
  }
};

const readResource = async (bounds, win, res) => {
  console.clear();

  let ji = Object(null);
  // todo die catch exception geht nicht?
  try {
    const x = bounds.x + 13;
    const y = res === 'e' ? bounds.y + 31 : bounds.y + 71;

    // rectangle: x1:45, y1:65  x2:224, y2:96 (w:179, h:31)
    const crop = {
      x: bounds.x + 45,
      y: res === 'e' ? bounds.y + 65 : bounds.y + 105,
      w: 179,
      h: 31,
    };

    win.bringToTop();
    robot.moveMouse(x, y);

    spinnerCP('waiting for image', spinner);
    let img = await screenshot({
      format: 'png',
      quality: 100,
    });

    ji = await jimp.read(img);
    ji.crop(crop.x, crop.y, crop.w, crop.h);
    // ji.quality(100); // todo geht nicht? testen mit ji.write(`${res}.png`);
    ji.greyscale();
    ji.getBuffer('image/png', (err, buffer) => {
      if (err) throw err;
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

    return getNumber(text);
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
};

export default screenReader;
