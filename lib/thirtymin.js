import robot from 'robotjs';

import wt from './helper/waitTap.js';
import cp from './helper/print.js';
import idle from './helper/idle.js';
import { positions, button } from './helper/uxpos.js';
import dt from './helper/displayTimer.js';
import rebirth from './rebirth.js';
import goToAdv from './helper/goToAdv.js';

const wait = (sec) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, sec * 1000);
  });
};

const countdown = async (str, sec) => {
  for (sec; sec > 0; sec--) {
    cp(`${str} ${sec}...`);
    await wait(1);
  }
};

const idleWaiting = async (data, dur, start) => {
  await goToAdv(data);

  data.dur = dur;
  await idle(data, start);

  await wt('q');
};

const status = (data, action) => {
  console.clear();
  console.log(`  rebirth #${data.counter}`);
  console.log(action);
};

const loop = async (data) => {
  console.clear();
  data.win.bringToTop();

  data.start = new Date();

  status(data, 'init dist');
  await rebirth(data, 1);

  status(data, `idle => ${dt(data, data.timings.dist1)}`);
  await idleWaiting(data, data.timings.dist1, data.start);

  //  moneypit
  const moneypit = robot.getPixelColor(data.crd.x + 274, data.crd.y + 74);
  if (moneypit !== 'ffffff') {
    await button(data, positions.MoneyPit.Menu);
    await button(data, positions.MoneyPit.FeedMe);
    await button(data, positions.MoneyPit.Yeah);
  }

  status(data, 'dist 1');
  await rebirth(data, 1);

  // idle itopod until ressources are maxed
  status(data, `idle => ${dt(data, data.timings.dist2)}`);
  await idleWaiting(data, data.timings.dist2, data.start);

  status(data, 'dist 2');
  await rebirth(data, 2);

  // idle until 30 (or x) minutes are over
  status(data, `idle => ${dt(data, data.timings.duration)}`);
  await idleWaiting(data, data.timings.duration, data.start);

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
    // we rely on fixwish
    data.cfg.rebirth.fixwish = '1';

    data.timings = {
      dist1: Number(data.cfg.thirtym.dist1) * 60 * 1000,
      dist2: Number(data.cfg.thirtym.dist2) * 60 * 1000,
      duration: Number(data.cfg.thirtym.total) * 60 * 1000,
    };

    data.counter = 1;

    // don't quit the script when the game loses focus
    // data.cfg.idle.fstop = false;

    console.log('start a new rebirth');
    console.log('equip loadout');
    console.log('autospell number boost');
    await countdown('starting in', 10);

    loop(data);
  } catch (err) {
    cp(err, true);
  }
};

/* todo
timer dauerhaft anzeigen -> auch bei itopod idle
nur bei idle timer anzeigen? dann richtigen halt
*/

export default thirtyMin;
