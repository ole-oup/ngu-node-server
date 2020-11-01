import fs from 'fs';
import ini from 'ini';
import nwm from 'node-window-manager';

import db from './lib/debugger.js';
import rebirth from './lib/rebirth.js';
import toweridle from './lib/toweridle.js';
import thirtymin from './lib/thirtymin.js';
import snipe from './lib/snipe.js';

import cp from './lib/helper/print.js';
import quest from './lib/quest.js';
import gd from './lib/helper/getDifference.js';
import dt from './lib/helper/displayTimer.js';

const { windowManager } = nwm;

// get terminal
const terminal = windowManager.getActiveWindow();

const getGameCoords = async () => {
  // initialize empty object for game window
  let gameWindow = new Object(null);

  const windows = windowManager.getWindows();
  const path =
    'C:\\Program Files (x86)\\Steam\\steamapps\\common\\NGU IDLE\\NGUIdle.exe';

  for (let i = 0; i < windows.length; i++) {
    gameWindow = windows[i].path === path ? windows[i] : false;
    if (gameWindow) break;
  }

  try {
    gameWindow.show();
    const bounds = gameWindow.getBounds();
    // offset x & y b/c of window borders
    bounds.x += 3;
    bounds.y += 27;

    return { coords: bounds, gameWin: gameWindow };
  } catch (err) {
    return cp(err, true);
  }
};

const init = async (mode, rmode) => {
  try {
    const appStart = new Date();
    const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

    const ggc = await getGameCoords();
    const { coords, gameWin } = ggc;

    if (!ggc) throw 'Game not found';

    gameWin.bringToTop();

    // clear screen
    console.clear();

    // data (state) for modules
    const state = {
      terminal, //                     terminal that has node running
      crd: coords, //                  game bounds
      cfg: config, //                  config
      win: gameWin, //                 game's window object
      spin: ['|', '/', '—', '\\'], //  spinner
      inf: null, //                    infinite itopod [idle / toweridle, snipe]
      dur: null, //                    itopod duration [idle / toweridle, snipe] in ms
      skc: 0, //                       snipe killcount
      wfm: 0, //                       wait for move [snipe / idle]
    };

    switch (mode) {
      case '0':
        await db(state);
        break;
      case '1':
        await rebirth(state, rmode);
        break;
      case '2':
        await toweridle(state);
        break;
      case '3':
        await thirtymin(state);
        break;
      case '4':
        await snipe(state);
        break;
      case '5':
        await quest(state);
        break;
      default:
        throw 'Invalid Mode';
    }

    const time = dt({}, gd(appStart));
    console.log(`Completed Mode ${mode} in ${time}`);

    return time;
  } catch (err) {
    return cp(err, true);
  }
};

export default init;
