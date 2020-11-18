import nwm from 'node-window-manager';

import db from './modes/debugger.js';
import rebirth from './modes/rebirth.js';
import toweridle from './modes/toweridle.js';
import thirtymin from './modes/thirtymin.js';
import snipe from './modes/snipe.js';
import quest from './modes/quest.js';
import lazyshifter from './modes/lazyshifter.js';

import cp from './util/print.js';

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

const startApp = async (config, mode, rmode, broadcast, response) => {
  try {
    const m = Number(mode);
    let lazymode = config.lazystop == 1;

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
      mode: m, //           current mode
      start: new Date(), // start of current mode
      broadcast, //         broadcast() from http-server
      response, //          response from http-server
      crd: coords, //       game bounds
      cfg: config, //       config
      win: gameWin, //      game's window object
    };

    switch (m) {
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
        lazymode = true;
        break;
      default:
        throw 'Invalid Mode';
    }
    if (lazymode) await lazyshifter(state, activeWindow, initWin);
  } catch (err) {
    return cp(err, true);
  }
};

export default startApp;
