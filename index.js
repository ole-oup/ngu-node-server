const readline = require('readline');
const fs = require('fs');
const ini = require('ini');
const { windowManager } = require('node-window-manager');
// const robot = require('robotjs');
const lazyIdle = require('./lib/lazyidle.js');
const idle = require('./lib/idle.js');

const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getGameCoords = () => {
  const windows = windowManager.getWindows();
  let win = new Object(null);

  for (let i = 0; i < windows.length; i++) {
    if (
      windows[i].path ===
      'C:\\Program Files (x86)\\Steam\\steamapps\\common\\NGU IDLE\\NGUIdle.exe'
    ) {
      win = windows[i];
      break;
    }
  }

  win.bringToTop();

  const bounds = win.getBounds();
  const x = bounds.x + 3;
  const y = bounds.y + 27;

  return { x, y };
};

console.log(`
  modes:
  0: debug
  1: idle
  2: lazyidle
`);

const inputPromise = new Promise((resolve, reject) => {
  try {
    rl.question('Choose a mode: ', (answer) => {
      rl.close();
      resolve(answer);
      return;
    });
  } catch (err) {
    reject('Error: ' + err);
  }
  return;
});

inputPromise
  .then((input) => {
    const coords = getGameCoords();
    switch (input) {
      case '0':
        break;
      case '1':
        idle(coords);
        break;
      case '2':
        lazyIdle();
        break;
      default:
        console.error(new Error('Invalid mode'));
    }
  })
  .catch((error) => {
    console.error(new Error(error));
  });
