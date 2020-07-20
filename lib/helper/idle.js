import robot from 'robotjs';
import nwm from 'node-window-manager';

import cp from './print.js';
import wt from './waitTrigger.js';

const { windowManager } = nwm;

const idle = async (data) => {
  try {
    // wait for enemy spawn
    await wt(data.crd, 736, 415, 'ffffff', 'waitNot');

    robot.keyTap('w');

    // if game loses focus -> send q + error
    const currWin = windowManager.getActiveWindow();
    if (currWin.getTitle() !== 'NGU Idle' && data.cfg.idle.fstop === '1') {
      data.win.bringToTop();
      robot.keyTap('q');
      currWin.bringToTop();
      throw 'Game lost focus';
    }

    // todo bei data.dur in data duration setzen und mit getDiff testen (aus thirtymin auskoppeln)
    if (data.inf || data.dur) idle(data);
    else robot.keyTap('q');
  } catch (err) {
    cp(err, true);
  }
};

export default idle;
