import robot from 'robotjs';

import click from './helper/click.js';
import wt from './helper/waitTap.js';
import spgc from './helper/spinnerPGC.js';
import idle from './helper/idle.js';
import cp from './helper/print.js';

let crown = (data) => {
  return robot.getPixelColor(data.crd.x + 735, data.crd.y + 281) === 'f7ef29'
    ? true
    : false;
};

const waitTower = async (data) => {
  console.clear();
  console.log(`\x1b[90m    idle  \x1b[36m${data.skc}\x1b[0m`);
  await click(data.crd, 372, 224); // itopod
  await click(data.crd, 626, 296); // enter

  await idle(data);

  // wait for charge if we wait for megabuff
  if (data.wfm === 2) {
    await spgc(data, 472, 109, '7c4e4e', 'waitNot'); // wait for cd
    await wt('g');
  }
};

const prepSnipe = async (data) => {
  console.clear();
  console.log(`\x1b[90m    snipe \x1b[36m${data.skc}\x1b[0m`);

  await click(data.crd, 937, 210, true); // right arrow
  const zonesBack = data.cfg.general.zone;
  if (zonesBack !== '0') for (let i = 0; i < zonesBack; i++) await wt('left');

  await snipeEnemy(data);
};

const snipeEnemy = async (data) => {
  data.atkarr = data.cfg.snipe.atk.split(',');

  await spgc(data, 736, 415, 'ffffff', 'waitNot', true); // wait for enemy spawn, updateTimer = true

  if (data.to === true) return;

  let c = crown(data);

  if (!c) {
    robot.keyTap('left');
    // await wt('right');

    // await wt('g');
    robot.keyTap('right');
    robot.keyTap('g');

    // todo hier heal

    return snipeEnemy(data);
  }

  if (data.wfm === 2) await wt('v');

  while (c) {
    c = crown(data);

    await spgc(data, 472, 109, '7c4e4e', 'waitNot'); // wait for cd

    if (data.atkarr.length !== 0) {
      robot.keyTap(data.atkarr[0]);
      data.atkarr.shift();
    } else robot.keyTap('w');
  }

  return data.skc++; // add to killcount
};

const snipe = async (data) => {
  try {
    console.clear();
    data.to = false;

    data.win.bringToTop();

    const idle = Number(data.cfg.snipe.idle);
    data.wfm = Number(data.cfg.snipe.move);

    if (data.wfm !== 0) data.inf = true;
    else data.dur = idle * 1000;

    await click(data.crd, 233, 104); // adventure

    const idleBorder = robot.getPixelColor(data.crd.x + 315, data.crd.y + 87);
    if (idleBorder === 'ffeb04') await wt('q', 100);

    while (data.to !== true) {
      // go directly to snipe if we don't wait for a move
      if (data.wfm !== 0) await waitTower(data);

      data.start = new Date();
      await prepSnipe(data);
    }

    await snipe(data);
  } catch (err) {
    cp(err);
  }
};

export default snipe;
