import robot from 'robotjs';
import nwm from 'node-window-manager';

import cp from './print.js';
import cgpc from './coordgpc.js';

const { windowManager } = nwm;

const idle = async (coords, config, win) => {
  try {
    // wait for enemy spawn
    await cgpc(coords, 736, 415, 'ffffff', 'waitNot');

    // if game loses focus and is not hidden -> send q + error
    const currWin = windowManager.getActiveWindow();
    if (currWin.getTitle() !== 'NGU Idle') {
      win.bringToTop();
      robot.keyTap('q');
      currWin.bringToTop();
      throw 'Game lost focus';
    }

    robot.keyTap('w');

    idle(coords, config, win);
  } catch (err) {
    cp(err, true);
  }
};

export default idle;
