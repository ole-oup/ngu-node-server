const readline = require('readline');
const fs = require('fs');
const ini = require('ini');
const { windowManager } = require('node-window-manager');

const cp = require('./lib/helper/clearprint.js');
const toweridle = require('./lib/toweridle.js');

console.clear();

cp('| parsing config.ini');
const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

cp('/ processing flags');
const flags = process.argv.slice(2);
// todo jetzt geht nur eine flag
if (flags.length !== 0) {
  switch (flags[0].toLowerCase()) {
    case '-h':
    case '--hide':
      config.general.hide = 1;
      break;
  }
}

cp('- creating readline interface');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// initialize empty object for window
let win = new Object(null);
const getGameCoords = () => {
  cp('\\ getting windows');
  const windows = windowManager.getWindows();
  const path =
    'C:\\Program Files (x86)\\Steam\\steamapps\\common\\NGU IDLE\\NGUIdle.exe';

  for (let i = 0; i < windows.length; i++) {
    win = windows[i].path === path ? windows[i] : false;
    if (win) break;
  }

  cp('| initializing signals');
  process.on('exit', () => win.show());

  cp('/ initializing signals.');
  process.on('SIGINT', () => win.show());

  cp('- initializing signals..');
  process.on('SIGUSR1', () => win.show());

  cp('\\ initializing signals...');
  process.on('SIGUSR2', () => win.show());

  cp('| initializing signals....');
  process.on('uncaughtException', () => win.show());

  cp('/ activating window');
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

cp('- printing menu');
cp(`  1. toweridle
  2. bla
  3. bla
`);

const inputPromise = new Promise((resolve, reject) => {
  try {
    // read line
    rl.question('choose a mode: ', (answer) => {
      rl.close();
      resolve(answer);
      return;
    });
  } catch (err) {
    reject(err);
  }
});

inputPromise
  .then((input) => {
    // clear screen
    console.clear();
    const coords = getGameCoords();
    if (!coords) throw 'Game not found';

    switch (input) {
      case '1':
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
