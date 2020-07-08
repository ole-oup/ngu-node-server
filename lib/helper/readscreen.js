const robot = require('robotjs');
const { createWorker } = require('tesseract.js');
const screenshot = require('screenshot-desktop');
const jimp = require('jimp');

const cp = require('./print.js');

/* todo
wenn es nicht klappt (zahl interpretieren) -> noch mal (x versuche, option?)

index of e+
gucken ob es einen punkt gibt
x.xxxE+0exp oder halt xxxxE+0exp (dann noch punkt hinzufügen)
mit x.xxx * Math.pow(10, exp)
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

// interpret the number from tesseract result
const getNumber = (txt) => {
  const text = txt;
  // get first index
  const i1 = text.indexOf('+');
  // get second index
  const i2 = text.indexOf('+', i1 + 1);

  // error if index not found
  if (i1 === -1 || i2 === -1) throw 'Text not found';

  console.clear();

  // console.log(String.raw(text));
  // console.log(i1 + '\n');
  // console.log(text.substring(i1, 2));
  // console.log(text.substring(i2, 9));
};

// todo whitelist chars die ich brauche
const reader = async (image) => {
  spinnerCP('starting screen reader', spinner);
  try {
    // tesseract reading the screen
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
      tessedit_char_whitelist: '0123456789+',
    });
    const {
      data: { text },
    } = await worker.recognize(image);
    await worker.terminate();

    // interpret the string from tesseract
    spinnerCP('interpreting text', spinner);

    getNumber(text);
  } catch (err) {
    cp(err, true);
  }
};

const screenReader = class {
  constructor(bounds) {
    this.bounds = bounds;
  }

  async readScreen() {
    console.clear();

    let ji = Object(null);
    try {
      robot.moveMouse(this.bounds.x + 13, this.bounds.y + 30);
      const img = await screenshot({ format: 'png' });

      ji = await jimp.read(img);

      ji.crop(this.bounds.x, this.bounds.y, 250, 150);
    } catch (err) {
      cp(err, true);
    }

    ji.getBuffer('image/jpeg', (err, buffer) => {
      if (err) cp(err, true);
      return reader(buffer);
    });
  }
};

module.exports = { screenReader };
