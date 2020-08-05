import robot from 'robotjs';
import nwm from 'node-window-manager';

import spgc from './spinnerPGC.js';
import gd from './getDifference.js';
import cp from './print.js';
import sp from './spinner.js';

const { windowManager } = nwm;

const loop = async (data) => {
  let diff = gd(data.start);

  if (!data.inf && diff > data.dur) return;

  await spgc(data, 472, 109, '7c4e4e', 'waitNot'); // wait for cd
  sp(data);

  // for sniping
  if (data.wfm !== 0) {
    if (data.wfm === 1) {
      const charge = robot.getPixelColor(data.crd.x + 757, data.crd.y + 139);
      sp(data);
      if (charge === '6687a3') return robot.keyTap('g');
    }

    if (data.wfm === 2) {
      const megabuff = robot.getPixelColor(data.crd.x + 683, data.crd.y + 175);
      sp(data);
      if (megabuff === 'c39494') return;
    }
  }

  await spgc(data, 736, 415, 'ffffff', 'waitNot', true); // wait for enemy spawn, updateTimer = true
  sp(data);

  robot.keyTap('w');
  sp(data, 'magenta');

  // if game loses focus -> send q + error
  const currWin = windowManager.getActiveWindow();
  if (data.cfg.idle.fstop === '1' && currWin.getTitle() !== 'NGU Idle') {
    data.win.bringToTop();
    robot.keyTap('q');
    currWin.bringToTop();
    throw 'Game lost focus';
  }

  if (data.inf ?? data.dur > diff) return loop(data);
};

const idle = async (data) => {
  try {
    data.start = new Date();
    data.lat = data.start;
    await loop(data);
  } catch (err) {
    cp(err, true);
  }
};

export default idle;
