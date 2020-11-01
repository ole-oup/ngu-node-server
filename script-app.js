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

const getGameCoords = async () => {
  // initialize empty object for game window
  let gameWindow = false;
  let terminal = false;

  const windows = windowManager.getWindows();
  const gamePath =
    'C:\\Program Files (x86)\\Steam\\steamapps\\common\\NGU IDLE\\NGUIdle.exe';
  const scriptTitle = 'ngu_node.ps1';

  for (let i = 0; i < windows.length; i++) {
    gameWindow = windows[i].path === gamePath ? windows[i] : false;
    // if (gameWindow && terminal) break;
    if (gameWindow) break;
  }

  for (let i = 0; i < windows.length; i++) {
    terminal = windows[i].getTitle() === scriptTitle ? windows[i] : false;
    if (terminal) break;
  }

  try {
    const bounds = gameWindow.getBounds();
    // offset x & y b/c of window borders
    bounds.x += 3;
    bounds.y += 27;

    return { terminal, coords: bounds, gameWin: gameWindow };
  } catch (err) {
    return cp(err, true);
  }
};

const init = async (config, mode, rmode) => {
  try {
    const appStart = new Date();

    const ggc = await getGameCoords();
    const { coords, gameWin, terminal } = ggc;

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
