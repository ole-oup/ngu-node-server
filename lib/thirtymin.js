import robot from 'robotjs';

import calibrate from './helper/calibrate.js';
import click from './helper/click.js';
import wt from './helper/waittap.js';
import cp from './helper/print.js';
import dist from './helper/distribute.js';
import wait from './helper/wait.js';

const getDiff = (start) => {
  const now = new Date();
  return now.getTime() - start.getTime();
};

const displayTimer = (data) => {
  // timer data
  const td = { d: getDiff(data.start) };

  td.m = Math.floor(td.d / 1000 / 60);
  td.min = td.m < 10 ? `0${td.m}` : String(td.m);
  td.s = Math.floor((td.d / 1000) % 60);
  td.sec = td.s < 10 ? `0${td.s}` : String(td.s);

  td.str = `${td.min}:${td.sec}`;

  td.result = data.prevTimer === td.str ? null : cp(td.str);

  data.prevTimer = td.str;

  return td.result;
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
  if (idleBorder === 'ffeb04') {
    await wait(100);
    await wt('q');
  }

  while (diff < dur) {
    diff = getDiff(idlestart);

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

  const rest = duration.total - getDiff(data.start);
  if (rest > 0) await idleWaiting(data, rest);

  clearInterval(timer);

  // todo hier rebirth

  wait(500);

  loop(data, duration);
};

const thirtyMin = async (data) => {
  try {
    const toMax = await calibrate(data.cfg, data.terminal);
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
