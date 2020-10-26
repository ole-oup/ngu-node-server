import robot from 'robotjs';
import nwm from 'node-window-manager';

import wf from './waitFor.js';
import gd from './getDifference.js';
import cp from './print.js';
import rl from './question.js';
import checkIdleBorder from './checkIdleBorder.js';
import wait from './wait.js';

const { windowManager } = nwm;

const loop = async (data) => {
  const diff = gd(data.start);

  if (!data.inf && diff > data.dur) return;

  if (data.cfg.general.slowcd === '1')
    await wf(data, 472, 109, '7c4e4e', 'not'); // wait for cd

  // for sniping
  if (data.wfm) {
    // if we haven't waited before
    if (data.cfg.general.slowcd !== '1')
      await wf(data, 472, 109, '7c4e4e', 'not'); // wait for cd

    if (data.wfm === 1) {
      const charge = robot.getPixelColor(data.crd.x + 757, data.crd.y + 139);
      if (charge !== '334452') {
        const ultimate = robot.getPixelColor(
          data.crd.x + 858,
          data.crd.y + 105
        );

        if (ultimate !== '7c4e4e') return robot.keyTap('g');
      }
    }

    if (data.wfm === 2) {
      const megabuff = robot.getPixelColor(data.crd.x + 664, data.crd.y + 175);
      if (megabuff !== '624a4a') return;
    }
  }

  if (data.cfg.general.slowcd !== '1')
    await wf(data, 736, 415, 'ffffff', 'not'); // wait for enemy spawn

  robot.keyTap('w');

  const currWin = windowManager.getActiveWindow();
  if (currWin.getTitle() !== 'NGU Idle') {
    data.win.bringToTop();
    robot.keyTap('q');

    await wait(0.2);

    if (data.cfg.idle.fstop === '1') {
      currWin.bringToTop();
      throw 'Game lost focus';
    }

    data.terminal.bringToTop();
    await rl('cont');

    data.win.bringToTop();
    await wait(1);
    await checkIdleBorder(data, 'disable');
  }

  if (data.inf ?? data.dur > diff) return loop(data);
};

const idle = async (data, start) => {
  try {
    data.start = start ?? new Date();
    robot.setKeyboardDelay(0);
    await wf(data, 736, 415, 'ffffff', 'not'); // wait for enemy spawn

    await loop(data);
  } catch (err) {
    cp(err, true);
  }
};

export default idle;
