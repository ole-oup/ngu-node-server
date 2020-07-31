import robot from 'robotjs';
import nwm from 'node-window-manager';

import spgc from './spinnerPGC.js';
import gd from './getDifference.js';
import cp from './print.js';

const { windowManager } = nwm;

const loop = async (data) => {
  let diff = gd(data.start);

  await spgc(data, 472, 109, '7c4e4e', 'waitNot'); // wait for cd

  // if we are sniping -> end the loop when megabuff is off cd
  if (data.snipe === true) {
    const megabuff = robot.getPixelColor(data.crd.x + 683, data.crd.y + 175);
    if (megabuff === 'c39494') diff = data.dur;
  }

  await spgc(data, 736, 415, 'ffffff', 'waitNot', true); // wait for enemy spawn, updateTimer = true

  robot.keyTap('w');

  // if game loses focus -> send q + error
  const currWin = windowManager.getActiveWindow();
  if (currWin.getTitle() !== 'NGU Idle' && data.cfg.idle.fstop === '1') {
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
