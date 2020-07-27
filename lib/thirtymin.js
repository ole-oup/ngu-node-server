import robot from 'robotjs';

import calibrate from './helper/calibrate.js';
import click from './helper/click.js';
import wt from './helper/waitTap.js';
import cp from './helper/print.js';
import dist from './helper/distribute.js';
import wait from './helper/wait.js';
import gd from './helper/getDifference.js';
import displayTimer from './helper/displayTimer.js';

const countdown = (str, s) => {
  for (s; s > 0; s--) {
    setTimeout(() => {
      cp(`${str} ${s}...`);
    }, 1000);
  }
};

const waitEnemy = (data) => {
  return new Promise((resolve) => {
    while (data) {
      displayTimer(data);

      const hex = robot.getPixelColor(data.crd.x + 736, data.crd.y + 415);

      if (hex !== 'ffffff') {
        resolve();
        break;
      }
    }
  });
};

const idleWaiting = async (data, dur) => {
  const idlestart = new Date();
  let diff = 0;

  await click(data.crd, 233, 104); // click adventure

  await click(data.crd, 372, 224); // click itopod
  await click(data.crd, 626, 296); // click enter

  const idleBorder = robot.getPixelColor(data.crd.x + 315, data.crd.y + 87);
  if (idleBorder === 'ffeb04') await wt('q');

  while (diff < dur) {
    diff = gd(idlestart);

    // wait for enemy spawn
    await waitEnemy(data);

    robot.keyTap('w');
  }

  await wt('q');
};

const loop = async (data, duration) => {
  console.clear();
  data.win.bringToTop();

  // set the timer
  data.start = new Date();
  const timer = setInterval(() => {
    displayTimer(data);
  }, 1000);

  // dist 1
  await dist(data);

  // todo vor itopod in der höchsten zone aus dist eingestellt einen boss für gold snipen
  // itopod bis e & m max

  // dist 2
  // await dist(data);

  const rest = duration.total - gd(data.start);
  if (rest > 0) await idleWaiting(data, rest);

  // stop the timer
  clearInterval(timer);

  // todo hier rebirth
  countdown('rebirth in', 5);

  wait(500);

  loop(data, duration);
};

const thirtyMin = async (data) => {
  try {
    const toMax = await calibrate(data.cfg, data.terminal); // todo raus?
    const duration = {
      total: Number(data.cfg.thirtym.mins) * 1000 * 60,
      max: toMax,
    };

    loop(data, duration);
  } catch (err) {
    cp(err, true);
  }
};

export default thirtyMin;
