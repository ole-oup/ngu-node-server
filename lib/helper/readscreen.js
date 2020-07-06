const robot = require('robotjs');
const { createWorker } = require('tesseract.js');
const screenshot = require('screenshot-desktop');
const jimp = require('jimp');

const cp = require('./print.js');

let spinner = ['|', '/', '-', '\\'];

const spinnerCP = async (text, spinner) => {
  const str = `  ${spinner[0]} ${text}\r`;

  spinner.push(spinner[0]);
  spinner.shift();

  cp(str);
  return new Promise((resolve) => {
    setTimeout(resolve, 90);
  });
};

module.exports = (text, spinner) => {
  spinnerCP(text, spinner);
};

const worker = createWorker({
  logger: (m) => console.log(m), // todo cp(m)
});

// todo whitelist chars die ich brauche
const reader = async (image) => {
  try {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(image);
    console.log(text);
    await worker.terminate();
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
      robot.moveMouse(this.bounds.x + 30, this.bounds.y + 30);
      const img = await screenshot();

      ji = await jimp.read(img);

      ji.crop(this.bounds.x, this.bounds.y, 350, 200);
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
