import robot from 'robotjs';

import click from './helper/click.js';
import wf from './helper/waitFor.js';
import idle from './helper/idle.js';
import cp from './helper/print.js';
import { positions, button } from './helper/uxpos.js';
import goToAdv from './helper/goToAdv.js';
import checkIdleBorder from './helper/checkIdleBorder.js';

robot.setKeyboardDelay(0);

let crown = (data) => {
  return robot.getPixelColor(data.crd.x + 735, data.crd.y + 281) === 'f7ef29'
    ? true
    : false;
};

const startIdle = async (data) => {
  console.clear();
  console.log(`\x1b[90m    idle  \x1b[36m${data.skc}\x1b[0m`);

  await goToAdv(data);

  await idle(data);

  if (data.cfg.snipe.heal === '1') {
    await click(data.crd, 735, 210, true); // left arrow
    await wf(data, 'cd');
    robot.keyTap('b');
    await wf(data, 'cd');
    robot.keyTap('g');
    await wf(data, 'cd');
    robot.keyTap('r');
    await wf(data, 'hp');
  } else if (data.cfg.snipe.heal !== '1' && data.wfm === 2) {
    // wait for charge if we wait for megabuff
    await wf(data, 'cd');
    robot.keyTap('g');
  }
};

const prepSnipe = async (data) => {
  console.clear();
  console.log(`\x1b[90m    snipe \x1b[36m${data.skc}\x1b[0m`);

  await click(data.crd, 937, 210, true); // right arrow
  const zonesBack = data.cfg.general.zone;
  if (zonesBack !== '0')
    for (let i = 0; i < zonesBack; i++) robot.keyTap('left');

  await snipeEnemy(data);
};

const snipeEnemy = async (data) => {
  data.atkarr = data.cfg.snipe.atk.split(',');

  await wf(data, 'enemy');

  let c = crown(data);

  if (!c) {
    robot.keyTap('left');
    robot.keyTap('right');

    const charge = robot.getPixelColor(data.crd.x + 757, data.crd.y + 139);
    if (charge === '6687a3') {
      robot.keyTap('g');
    } else {
      robot.keyTap('r');
    }

    return snipeEnemy(data);
  }

  if (data.wfm === 2) robot.keyTap('v');

  while (c) {
    c = crown(data);

    await wf(data, 'cd');

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

    data.win.bringToTop();

    const idle = Number(data.cfg.snipe.idle);
    data.wfm = Number(data.cfg.snipe.move);

    if (data.wfm !== 0) data.inf = true;
    else data.dur = idle * 1000;

    await button(data, positions.Adventure.Menu);

    await checkIdleBorder(data, 'disable');

    while (data !== undefined) {
      // go directly to snipe if we don't wait for a move
      if (data.wfm !== 0) await startIdle(data);

      data.start = new Date();
      await prepSnipe(data);
    }

    await snipe(data);
  } catch (err) {
    cp(err);
  }
};

export default snipe;
