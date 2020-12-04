import nwm from 'node-window-manager';

import checkIdleBorder from './checkIdleBorder.js';
import cp from './print.js';
import gd from './getDifference.js';
import getColor from './getColor.js';

const { windowManager } = nwm;

// setImmediate() to unblock the event loop and allow communication with clients
export const setImmediatePromise = () => {
  return new Promise((resolve) => {
    setImmediate(() => resolve());
  });
};

const wf = async (data, trigger, fullhp) => {
  const timer = { start: new Date(), end: 3000, timeout: false }; // 3 second timeout
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

  let onoff = true;
  const end = fullhp === true ? 10000 : timer.end;
  while (onoff) {
    const hex = getColor(data, x, y);

    let currWin = windowManager.getActiveWindow();
    if (currWin.getTitle() !== 'NGU Idle') {
      data.win.bringToTop();
      if (data.cfg.force != 1) checkIdleBorder(data);

      currWin.bringToTop();
      if (data.cfg.fstop == 1) throw 'Game lost focus';
      else cp(data, 'Game lost focus');

      while (currWin.getTitle() !== 'NGU Idle') {
        currWin = windowManager.getActiveWindow();
        await setImmediatePromise();
      }

      checkIdleBorder(data, 'disable');
    }

    const diff = end - gd(timer.start);
    timer.timeout = diff < 0;

    if (hex !== color || timer.timeout) {
      onoff = false;
    }

    await setImmediatePromise();
  }

  return new Promise((resolve) => {
    resolve(timer.timeout);
  });
};

export default wf;
