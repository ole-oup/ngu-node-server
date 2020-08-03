import fs from 'fs';
import ini from 'ini';
import nwm from 'node-window-manager';

import distributeRes from './lib/helper/distribute.js';
import toweridle from './lib/toweridle.js';
import thirtymin from './lib/thirtymin.js';
import snipe from './lib/snipe.js';

import cp from './lib/helper/print.js';
import rl from './lib/helper/question.js';
import attack from './lib/helper/attack.js';

const { windowManager } = nwm;

const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

// initialize empty object for game window
let gameWindow = new Object(null);

// get terminal
const terminal = windowManager.getActiveWindow();

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
    const events = [
      'exit',
      'SIGINT',
      'SIGUSR1',
      'SIGUSR2',
      'uncaughtException',
    ];
    events.forEach((e) => {
      // todo hier cleanup function (zb. wenn idle -> q drücken für ingame idle)
      process.on(e, () => gameWindow.show());
    });

    gameWindow.show();
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
      const f = {};

      f.trim = flag.trim();
      f.lc = f.trim.toLowerCase();

      f.m = Number(flag[1]); // mode number
      f.NaN = Number.isNaN(f.m);

      if (f.NaN === false) mode = f.m;

      // options
      switch (f.lc) {
        case '-h':
        case '--hide':
          config.general.hide = '1';
          break;
        case '-f':
        case '--fstop':
          config.idle.fstop = '0';
          break;
        case '-n':
        case '--new':
          config.rebirth.spell = '1';
          config.rebirth.boss = '1';
          config.rebirth.wish = '1';
          break;
        case '-s':
        case '--spell':
          config.rebirth.spell = '1';
          break;
        case '-b':
        case '-boss':
          config.rebirth.boss = '1';
          break;
        case '-w':
        case '-wish':
          config.rebirth.wish = '1';
          break;
      }
    });
  }
};

const chooseMode = async (modes) => {
  const input = await rl(`choose a mode (1-${modes.length}): `);

  if (input === 'modes') {
    modes.forEach((e) => {
      console.log(e);
    });
    return chooseMode(modes);
  }

  return Number(input);
};

const init = async (config) => {
  try {
    getFlags(config);

    if (mode === 0) {
      const modes = [];
      modes.push('  1. rebirth');
      modes.push('  2. toweridle');
      modes.push('  3. 30m');
      modes.push('  4. snipe');
      modes.push('  5. attack');

      mode = await chooseMode(modes);
    }

    // clear screen
    console.clear();

    const coords = await getGameCoords();
    if (!coords) throw 'Game not found';

    gameWindow.bringToTop();

    // data (state) for modules
    const data = {
      terminal, //         terminal that has node running
      crd: coords, //      game's bounds
      cfg: config, //      config.ini
      win: gameWindow, //  game's window object
      inf: null, //        infinite itopod [idle / toweridle, snipe]
      dur: null, //        itopod duration [idle / toweridle, snipe] in ms?
      skc: 0, //           snipe killcount
      tdd: 0, //           timer data difference [displayTimer / spinnerPGC]
      lat: new Date(), //  last attack time [idle / spinnerPGC]
      lam: 0, //           last attack ms [idle / spinnerPGC]
      wfm: 0, //           wait for move [snipe / idle]
      to: null, //         timeout [snipe, spinnerPGC]
    };

    switch (mode) {
      case 1:
        await distributeRes(data);
        break;
      case 2:
        await toweridle(data);
        break;
      case 3:
        await thirtymin(data);
        break;
      case 4:
        await snipe(data);
        break;
      case 5:
        await attack(data);
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
