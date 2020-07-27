import robot from 'robotjs';
import nwm from 'node-window-manager';

import cp from './print.js';
import spgc from './spinnerPGC.js';
import gd from './getDifference.js';
import displayTimer from './displayTimer.js';

const { windowManager } = nwm;

const idle = async (data, nospin) => {
  let start = new Date();
  let diff = 0;

  while (data.inf || data.dur > diff) {
    diff = gd(start);

    cp(`    ${displayTimer(data, start)}`);
    await spgc(data, 736, 415, 'ffffff', 'waitNot', nospin); // wait for enemy spawn

    robot.keyTap('w');

    // if game loses focus -> send q + error
    const currWin = windowManager.getActiveWindow();
    if (currWin.getTitle() !== 'NGU Idle' && data.cfg.idle.fstop === '1') {
      data.win.bringToTop();
      robot.keyTap('q');
      currWin.bringToTop();
      cp('Game lost focus', true);
    }
  }
};

export default idle;
