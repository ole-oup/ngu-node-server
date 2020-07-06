const readline = require('readline');
const { windowManager } = require('node-window-manager');

const cp = require('./print.js');
const toweridle = require('../toweridle.js');
const hhb = require('../thirtymin.js');

const initialize = async (config) => {
  cp('processing flags');

  let flagMode = false;

  const flags = process.argv.slice(2);

  if (flags.length > 0) {
    flags.forEach((flag) => {
      switch (flag.toLowerCase()) {
        case '-1':
          flagMode = 1;
          break;
        case '-2':
          flagMode = 2;
          break;
        case '-h':
        case '--hide':
          config.general.hide = 1;
          break;
      }
    });
  }

  cp('creating readline interface');

  // initialize empty object for window
  let win = new Object(null);
  const getGameCoords = async () => {
    cp('getting windows');

    const windows = windowManager.getWindows();
    const path =
      'C:\\Program Files (x86)\\Steam\\steamapps\\common\\NGU IDLE\\NGUIdle.exe';

    for (let i = 0; i < windows.length; i++) {
      win = windows[i].path === path ? windows[i] : false;
      if (win) break;
    }

    cp('initializing signals');
    process.on('exit', () => win.show());

    cp('initializing signals');
    process.on('SIGINT', () => win.show());

    cp('initializing signals');
    process.on('SIGUSR1', () => win.show());

    cp('initializing signals');
    process.on('SIGUSR2', () => win.show());

    cp('initializing signals');
    process.on('uncaughtException', () => win.show());

    cp('initializing signals');

    try {
      win.show();
      win.bringToTop();
      const bounds = win.getBounds();
      // offset x & y b/c of window borders
      bounds.x += 3;
      bounds.y += 27;

      return bounds;
    } catch (err) {
      return cp(err, true);
    }
  };

  cp('initializing signals');
  if (!flagMode) cp('\n  1. toweridle\n  2. 30m\n\n');

  const inputPromise = new Promise((resolve, reject) => {
    try {
      // resolve before readline if flag is set
      if (flagMode) {
        resolve(flagMode);
        return;
        // else read line
      } else {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Choose a mode: ', (answer) => {
          rl.close();
          resolve(answer);
        });
      }
    } catch (err) {
      reject(err);
    }
  });

  inputPromise
    .then(async (input) => {
      // clear screen
      console.clear();

      const coords = await getGameCoords();
      if (!coords) throw 'Game not found';

      switch (Number(input)) {
        case 1:
          cp('starting toweridle');
          toweridle(coords, config, win);
          break;
        case 2:
          cp('starting 30m');
          hhb(coords);
          break;
        default:
          throw 'Invalid Mode';
      }
    })
    .catch((error) => {
      cp(error, true);
    });
};

module.exports = (config) => {
  initialize(config);
};
