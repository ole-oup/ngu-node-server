import fs from 'fs';
import ini from 'ini';
import nwm from 'node-window-manager';

import cp from './lib/helper/print.js';
import rl from './lib/helper/question.js';

import toweridle from './lib/toweridle.js';
import hhb from './lib/thirtymin.js';

const { windowManager } = nwm;

const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

// initialize empty object for window
let gameWindow = new Object(null);
// set invalid mode
let mode = 0;

const getGameCoords = async () => {
  const windows = windowManager.getWindows();
  const path =
    'C:\\Program Files (x86)\\Steam\\steamapps\\common\\NGU IDLE\\NGUIdle.exe';

  for (let i = 0; i < windows.length; i++) {
    gameWindow = windows[i].path === path ? windows[i] : false;
    if (gameWindow) break;
  }

  try {
    process.on('exit', () => gameWindow.show());
    process.on('SIGINT', () => gameWindow.show());
    process.on('SIGUSR1', () => gameWindow.show());
    process.on('SIGUSR2', () => gameWindow.show());
    process.on('uncaughtException', () => gameWindow.show());

    gameWindow.show();
    gameWindow.bringToTop();
    const bounds = gameWindow.getBounds();
    // offset x & y b/c of window borders
    bounds.x += 3;
    bounds.y += 27;

    return bounds;
  } catch (err) {
    return cp(err, true);
  }
};

const getFlags = async (config) => {
  const flags = process.argv.slice(2);

  if (flags.length > 0) {
    flags.forEach((flag) => {
      const f = flag.trim();
      switch (f.toLowerCase()) {
        case '-1':
          mode = 1;
          break;
        case '-2':
          mode = 2;
          break;
        case '-h':
        case '--hide':
          config.general.hide = 1;
          break;
      }
    });
  }
};

const init = async (config) => {
  try {
    getFlags(config);

    if (mode === 0) {
      cp('\n  1. toweridle\n  2. 30m\n\n');
      mode = await rl('choose a mode: ');
    }

    // clear screen
    console.clear();

    const coords = await getGameCoords();
    if (!coords) throw 'Game not found';

    const m = Number(mode);

    switch (m) {
      case 1:
        toweridle(coords, config, gameWindow);
        break;
      case 2:
        hhb(coords, gameWindow);
        break;
      default:
        throw 'Invalid Mode';
    }
  } catch (err) {
    return cp(err, true);
  }
};

console.clear();

init(config);
