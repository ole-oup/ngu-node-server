import robot from 'robotjs';

import cp from './helper/print.js';
import idle from './helper/idle.js';
import { positions, button } from './helper/uxpos.js';
import dt from './helper/displayTimer.js';
import rebirth from './rebirth.js';
import goToAdv from './helper/goToAdv.js';
import gd from './helper/getDifference.js';
import checkIdleBorder from './helper/checkIdleBorder.js';
import wait from './helper/wait.js';

const countdown = async (str, sec) => {
  for (sec; sec > 0; sec--) {
    cp(`${str} ${sec}...`);
    await wait(1);
  }
};

const moneypit = async (data) => {
  const mp = robot.getPixelColor(data.crd.x + 274, data.crd.y + 74);
  if (mp !== 'ffffff') {
    await button(data, positions.MoneyPit.Menu);
    await button(data, positions.MoneyPit.FeedMe);
    await button(data, positions.MoneyPit.Yeah);
  }
};

const idleWaiting = async (data, start, dist) => {
  const d = data.timings[dist];

  status(data, `idle to ${dist} => ${dt(data, d)}`);

  await goToAdv(data);

  data.dur = d;
  await idle(data, start);

  checkIdleBorder(data);

  status(data, dist);
  await moneypit(data);
};

const status = (data, action) => {
  cp(`rb #${data.counter}, ${action}`);
};

const loop = async (data) => {
  data.win.bringToTop();

  data.start = new Date();

  status(data, 'init dist');
  await rebirth(data, 1);

  // no tower idle bc regular attack isn't learned yet -> autozone

  await button(data, positions.Adventure.Menu);
  await button(data, positions.Adventure.EnterITOPOD.Button);
  await button(data, positions.Adventure.EnterITOPOD.Optimal);
  await button(data, positions.Adventure.EnterITOPOD.Enter);

  checkIdleBorder(data);

  status(data, `waiting for dist1 => ${dt(data, data.timings.dist1)}`);
  const curTime = gd(data.start);
  await wait((data.timings.dist1 - curTime) / 1000);

  status(data, 'dist1');
  await moneypit(data);
  await rebirth(data, 1);

  await idleWaiting(data, data.start, 'dist2');
  await rebirth(data, 1);

  await idleWaiting(data, data.start, 'dist3');
  await rebirth(data, 2);

  await idleWaiting(data, data.start, 'dist4');
  await rebirth(data, 2);

  // final wait
  await idleWaiting(data, data.start, 'total');

  // nuke
  await button(data, positions.FightBoss.Menu);
  await button(data, positions.FightBoss.Nuke);

  await countdown('rebirth in', 3);

  // rebirth
  await button(data, positions.Rebirth.Menu);
  await button(data, positions.Rebirth.Rebirth);
  await button(data, positions.Rebirth.Yeah);

  data.counter++;

  loop(data);
};

const thirtyMin = async (data) => {
  try {
    const dist1 = Number(data.cfg.dist1);
    if (dist1 <= 0) throw 'dist1 too small';
    const dist2 = Number(data.cfg.dist2);
    if (dist2 <= dist1) throw 'dist2 too small';
    const dist3 = Number(data.cfg.dist3);
    if (dist3 <= dist2) throw 'dist3 too small';
    const dist4 = Number(data.cfg.dist4);
    if (dist4 <= dist3) throw 'dist4 too small';
    const total = Number(data.cfg.total);
    if (dist4 >= total) throw "Distributions can't be longer than total";

    data.cfg.fstop = 0;

    data.timings = {
      dist1: dist1 * 60 * 1000,
      dist2: dist2 * 60 * 1000,
      dist3: dist3 * 60 * 1000,
      dist4: dist4 * 60 * 1000,
      total: total * 60 * 1000,
    };

    data.counter = 1;

    await countdown('starting in', 10);

    loop(data);
  } catch (err) {
    cp(err, true);
  }
};

export default thirtyMin;
