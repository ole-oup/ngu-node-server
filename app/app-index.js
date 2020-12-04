import nwm from 'node-window-manager';

import db from './modes/debugger.js';
import rebirth from './modes/rebirth.js';
import toweridle from './modes/toweridle.js';
import thirtymin from './modes/thirtymin.js';
import snipe from './modes/snipe.js';
import quest from './modes/quest.js';
import lazyshifter from './modes/lazyshifter.js';
import reserver from './modes/reserver.js';
import { setImmediatePromise } from './util/waitFor.js';

const { windowManager } = nwm;

const activeWindow = () => {
  return windowManager.getActiveWindow();
};

const getGame = () => {
  let gameWin = false;

  const windows = windowManager.getWindows();

  const gamePath =
    'C:\\Program Files (x86)\\Steam\\steamapps\\common\\NGU IDLE\\NGUIdle.exe';

  for (let i = 0; i < windows.length; i++) {
    gameWin = windows[i].path === gamePath ? windows[i] : false;
    if (gameWin) return gameWin;
  }

  return false;
};

const startApp = async (config, mode, rmode, broadcast, response) => {
  try {
    const m = Number(mode);
    let lazymode = config.lazystop == 1;

    const gameWin = getGame();

    if (!gameWin) throw 'Game not found';

    const initWin = activeWindow();
    gameWin.bringToTop();
    let currWin = activeWindow();
    while (currWin.getTitle() !== 'NGU Idle') {
      currWin = activeWindow();
      await setImmediatePromise();
    }

    // data (state) for modules
    const state = {
      mode: m, //           current mode
      start: new Date(), // start of current mode
      broadcast, //         broadcast() from http-server
      response, //          response from http-server
      cfg: config, //       config
      res: null, //         resolution
      win: gameWin, //      game's window object
    };

    switch (state.cfg.res) {
      case 1:
        state.res = 1 + 1 / 3;
        break;
      case 2:
        state.res = 1.5;
        break;
      case 3:
        state.res = 1.75;
        break;
      default:
        state.res = 1;
    }

    switch (m) {
      case 0:
        await db();
        break;
      case 1:
        await rebirth(state, rmode);
        break;
      case 2:
        await toweridle(state);
        break;
      case 3:
        await snipe(state);
        break;
      case 4:
        await quest(state);
        break;
      case 5:
        await thirtymin(state);
        break;
      case 6:
        lazymode = true;
        break;
      case 7:
        reserver(state);
        break;
      default:
        throw 'Invalid Mode';
    }
    if (lazymode) await lazyshifter(state, activeWindow, initWin);
  } catch (err) {
    console.log(err);
  }
};

export default startApp;
