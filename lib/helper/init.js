const readline = require('readline');
const { windowManager } = require('node-window-manager');

const cp = require('./clearprint.js');
const toweridle = require('../toweridle.js');

const duration = 100;

const sleep = async () => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const initialize = async (config) => {
  cp('/ processing flags');
  await sleep();

  let flagMode = false;

  const flags = process.argv.slice(2);

  if (flags.length > 0) {
    flags.forEach((flag) => {
      switch (flag.toLowerCase()) {
        case '-1':
          flagMode = 1;
          break;
        case '-h':
        case '--hide':
          config.general.hide = 1;
          break;
      }
    });
  }

  cp('- creating readline interface');
  await sleep();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // initialize empty object for window
  let win = new Object(null);
  const getGameCoords = async () => {
    cp('| getting windows');
    await sleep();

    const windows = windowManager.getWindows();
    const path =
      'C:\\Program Files (x86)\\Steam\\steamapps\\common\\NGU IDLE\\NGUIdle.exe';

    for (let i = 0; i < windows.length; i++) {
      win = windows[i].path === path ? windows[i] : false;
      if (win) break;
    }

    cp('/ initializing signals');
    await sleep();
    process.on('exit', () => win.show());

    cp('- initializing signals.');
    await sleep();
    process.on('SIGINT', () => win.show());

    cp('\\ initializing signals..');
    await sleep();
    process.on('SIGUSR1', () => win.show());

    cp('| initializing signals...');
    await sleep();
    process.on('SIGUSR2', () => win.show());

    cp('/ initializing signals....');
    await sleep();
    process.on('uncaughtException', () => win.show());

    cp('- activating window');
    await sleep();

    try {
      win.show();
      win.bringToTop();
      const bounds = win.getBounds();
      // offset the window borders
      const x = bounds.x + 3;
      const y = bounds.y + 27;

      return { x, y };
    } catch (err) {
      return cp(err, true);
    }
  };

  cp('\\ printing menu');
  await sleep();
  if (!flagMode) cp('\n  1. toweridle\n  2. bla\n  3. bleh\n\n');

  const inputPromise = new Promise((resolve, reject) => {
    try {
      // resolve before readline if flag is set
      if (flagMode) {
        resolve(flagMode);
        return;
        // else read line
      } else {
        rl.question('choose a mode: ', (answer) => {
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
