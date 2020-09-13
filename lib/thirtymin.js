import robot from 'robotjs';

import wt from './helper/waitTap.js';
import cp from './helper/print.js';
import dist from './helper/distribute.js';
import idle from './helper/idle.js';
import { positions, button } from './helper/uxpos.js';
import dt from './helper/displayTimer.js';

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
  await button(data, positions.Adventure.Menu);

  await button(data, positions.Adventure.EnterITOPOD.Button);
  await button(data, positions.Adventure.EnterITOPOD.Enter);

  const idleBorder = robot.getPixelColor(data.crd.x + 315, data.crd.y + 87);
  if (idleBorder === 'ffeb04') await wt('q', 100);

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

  status(data, 'dist 1');
  await dist(data);

  // idle autoadvance zone
  status(data, `idle => ${dt(data, data.timings.toGold)}`);
  await idleWaiting(data, data.timings.toGold, data.start);

  status(data, 'dist 2');
  await dist(data);

  // todo if money pit grün dann moneypit

  // idle itopod until ressources are maxed
  status(data, `idle => ${dt(data, data.timings.toMax)}`);
  await idleWaiting(data, data.timings.toMax, data.start);

  status(data, 'dist 3');
  await dist(data);

  // idle until 30 (or x) minutes are over
  status(data, `idle => ${dt(data, data.timings.duration)}`);
  await idleWaiting(data, data.timings.duration, data.start);

  // nuke
  await button(data, positions.FightBoss.Menu);
  await button(data, positions.FightBoss.Nuke);

  await countdown('rebirth in', 3);

  // todo hier rebirth
  await button(data, positions.Rebirth.Menu);
  await button(data, positions.Rebirth.Rebirth);
  await button(data, positions.Rebirth.Yeah);

  data.counter++;

  loop(data);
};

const thirtyMin = async (data) => {
  try {
    // we rely on adv autoadvance and fixwish
    data.cfg.rebirth.boss = false;
    data.cfg.rebirth.fixwish = '1';

    data.timings = {
      toGold: 1 * 60 * 1000,
      toMax: Number(data.cfg.thirtym.tomax) * 60 * 1000,
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
