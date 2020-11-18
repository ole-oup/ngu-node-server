import robot from 'robotjs';
import nwm from 'node-window-manager';

import checkIdleBorder from './checkIdleBorder.js';
import cp from './print.js';
import gd from './getDifference.js';

const { windowManager } = nwm;

const wf = (data, trigger) => {
  const timer = { start: new Date(), end: 3000 }; // 3 second timeout
  let x = null;
  let y = null;
  let color = 'ffffff';
  switch (trigger) {
    case 'cd':
      x = 472;
      y = 109;
      color = '7c4e4e';
      break;
    case 'enemy':
      x = 736;
      y = 415;
      break;
    case 'hp':
      x = 514;
      y = 411;
      // timer.end = 10000;
      break;
    default:
      throw 'WaitFor-Trigger Error';
  }

  const combinedX = data.crd.x + x;
  const combinedY = data.crd.y + y;

  return new Promise((resolve) => {
    let onoff = true;
    while (onoff) {
      const hex = robot.getPixelColor(combinedX, combinedY);

      let currWin = windowManager.getActiveWindow();
      if (currWin.getTitle() !== 'NGU Idle') {
        data.win.bringToTop();
        if (Number(data.cfg.force) !== 1) robot.keyTap('q');

        currWin.bringToTop();
        if (Number(data.cfg.fstop) === 1) throw 'Game lost focus';
        else cp('Game lost focus');

        if (Number(data.cfg.force) === 1) data.win.bringToTop();

        while (currWin.getTitle() !== 'NGU Idle') {
          currWin = windowManager.getActiveWindow();
        }

        checkIdleBorder(data, 'disable');
      }
      const diff = timer.end - gd(timer.start);
      const timeout = diff < 0 ? true : false;
      if (hex !== color || timeout) {
        onoff = false;
        resolve(timeout); // return true if we time out
        break;
      }
    }
  });
};

export default wf;
