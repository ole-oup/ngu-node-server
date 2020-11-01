import fs from 'fs';
import ini from 'ini';
import nwm from 'node-window-manager';

import db from './lib/debugger.js';
import rebirth from './lib/rebirth.js';
// import rebirthserver from './lib/server.js';
import toweridle from './lib/toweridle.js';
import thirtymin from './lib/thirtymin.js';
import snipe from './lib/snipe.js';

import cp from './lib/helper/print.js';
import rl from './lib/helper/question.js';
import quest from './lib/quest.js';

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

const getFlags = (config, m) => {
  const flags = process.argv.slice(2);

  [...m].forEach((c) => {
    flags.push(c);
  });

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
        case 'h':
          config.general.hide = '1';
          break;
        case 'f':
          config.idle.fstop = '0';
          break;
        case 's':
          config.general.slowcd = config.general.slowcd === '1' ? '0' : '1';
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

  return input;
};

const init = async (config) => {
  try {
    if (mode === 0) {
      const modes = [];
      modes.push('  1. rebirth');
      modes.push('  2. toweridle');
      modes.push('  3. 30m');
      modes.push('  4. snipe');
      modes.push('  5. quest');

      mode = await chooseMode(modes);
    }

    getFlags(config, mode);

    // clear screen
    console.clear();

    const coords = await getGameCoords();
    if (!coords) throw 'Game not found';

    gameWindow.bringToTop();

    // data (state) for modules
    const data = {
      terminal, //                     terminal that has node running
      crd: coords, //                  game's bounds
      cfg: config, //                  config.ini
      win: gameWindow, //              game's window object
      spin: ['|', '/', '—', '\\'], //  spinner
      inf: null, //                    infinite itopod [idle / toweridle, snipe]
      dur: null, //                    itopod duration [idle / toweridle, snipe] in ms
      skc: 0, //                       snipe killcount
      wfm: 0, //                       wait for move [snipe / idle]
    };

    const m = Number(mode.substring(0, 1));

    switch (m) {
      case 0:
        await db(data);
        break;
      case 1:
        await rebirth(data);
        // rebirthserver(data);
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
        await quest(data);
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
