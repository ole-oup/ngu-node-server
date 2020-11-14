import nwm from 'node-window-manager';

import db from './lib/debugger.js';
import rebirth from './lib/rebirth.js';
import toweridle from './lib/toweridle.js';
import thirtymin from './lib/thirtymin.js';
import snipe from './lib/snipe.js';
import quest from './lib/quest.js';
import lazyshifter from './lib/lazyshifter.js';

import cp from './lib/util/print.js';
import gd from './lib/util/getDifference.js';
import dt from './lib/util/displayTimer.js';

const { windowManager } = nwm;

const activeWindow = () => {
  return windowManager.getActiveWindow();
};

const getGameCoords = () => {
  let gameWin = false;

  const windows = windowManager.getWindows();

  const gamePath =
    'C:\\Program Files (x86)\\Steam\\steamapps\\common\\NGU IDLE\\NGUIdle.exe';

  for (let i = 0; i < windows.length; i++) {
    gameWin = windows[i].path === gamePath ? windows[i] : false;
    if (gameWin) break;
  }

  try {
    gameWin.setBounds({ x: 0, y: 0 });
    const bounds = gameWin.getBounds();
    // offset x & y b/c of window borders
    bounds.x += 3;
    bounds.y += 27;

    return { gameWin, coords: bounds };
  } catch (err) {
    return cp(err, true);
  }
};

const init = async (config, mode, rmode) => {
  try {
    const appStart = new Date();

    const ggc = getGameCoords();
    const { coords, gameWin } = ggc;

    if (!ggc) throw 'Game not found';

    const initWin = activeWindow();
    gameWin.bringToTop();
    let currWin = activeWindow();
    while (currWin.getTitle() !== 'NGU Idle') {
      currWin = activeWindow();
    }

    // data (state) for modules
    const state = {
      crd: coords, //                  game bounds
      cfg: config, //                  config
      win: gameWin, //                 game's window object
      inf: null, //                    infinite itopod [idle / toweridle, snipe]
      dur: null, //                    itopod duration [idle / toweridle, snipe] in ms
      skc: 0, //                       snipe killcount
      wfm: 0, //                       wait for move [snipe / idle]
    };

    switch (Number(mode)) {
      case 0:
        await db(state);
        break;
      case 1:
        await rebirth(state, rmode);
        break;
      case 2:
        await toweridle(state);
        break;
      case 3:
        await thirtymin(state);
        break;
      case 4:
        await snipe(state);
        break;
      case 5:
        await quest(state);
        break;
      case 6:
        state.cfg.lazystop = 1;
        break;
      default:
        throw 'Invalid Mode';
    }

    if (Number(state.cfg.lazystop) === 1)
      await lazyshifter(state, activeWindow, initWin);

    const time = dt({}, gd(appStart));
    return time;
  } catch (err) {
    return cp(err, true);
  }
};

export default init;
