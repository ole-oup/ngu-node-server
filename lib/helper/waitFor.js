import robot from 'robotjs';
import nwm from 'node-window-manager';

import checkIdleBorder from './checkIdleBorder.js';
import cp from './print.js';

const { windowManager } = nwm;

const wf = (data, trigger) => {
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
      break;
    default:
      throw 'WaitFor-Trigger Error';
  }

  const combinedX = data.crd.x + x;
  const combinedY = data.crd.y + y;

  return new Promise((resolve) => {
    while (data !== undefined) {
      const hex = robot.getPixelColor(combinedX, combinedY);

      let currWin = windowManager.getActiveWindow();
      if (currWin.getTitle() !== 'NGU Idle') {
        data.win.bringToTop();
        robot.keyTap('q');
        currWin.bringToTop();

        if (Number(data.cfg.fstop) === 1) throw 'Game lost focus';

        cp('paused');

        while (currWin.getTitle() !== 'NGU Idle') {
          currWin = windowManager.getActiveWindow();
        }

        checkIdleBorder(data, 'disable');
      }

      if (hex !== color) {
        resolve();
        break;
      }
    }
  });
};

export default wf;
