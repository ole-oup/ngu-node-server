const readline = require('readline');
const fs = require('fs');
const ini = require('ini');
const { windowManager } = require('node-window-manager');

const cp = require('./lib/helper/clearprint.js');
const toweridle = require('./lib/toweridle.js');

const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// initialize empty object for window
let win = new Object(null);

const getGameCoords = () => {
  const windows = windowManager.getWindows();

  for (let i = 0; i < windows.length; i++) {
    if (
      windows[i].path ===
      'C:\\Program Files (x86)\\Steam\\steamapps\\common\\NGU IDLE\\NGUIdle.exe'
    ) {
      win = windows[i];
      break;
    }
  }

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

cp(`
  1: toweridle
  2: bla
  3. bla
`);

const inputPromise = new Promise((resolve, reject) => {
  try {
    // read line
    rl.question('Choose a mode: ', (answer) => {
      rl.close();

      resolve(answer);
      return;
    });
  } catch (err) {
    reject(err);
  }
  // return;
});

inputPromise
  .then((input) => {
    const coords = getGameCoords();
    if (!coords) throw 'Game not found';

    switch (input) {
      case '1':
        cp('Starting Toweridle');
        toweridle(coords, config, win);
        break;
      default:
        throw 'Invalid Mode';
    }
  })
  .catch((error) => {
    cp(error, true);
  });
