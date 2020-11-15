import robot from 'robotjs';

import click from './util/click.js';
import wf from './util/waitFor.js';
import idle from './util/idle.js';
import cp from './util/print.js';
import { positions, button } from './util/uxpos.js';
import goToAdv from './util/goToAdv.js';
import checkIdleBorder from './util/checkIdleBorder.js';

robot.setKeyboardDelay(0);

const crown = (data) => {
  return robot.getPixelColor(data.crd.x + 735, data.crd.y + 281) === 'f7ef29'
    ? true
    : false;
};

const waitForBoss = async (data) => {
  robot.keyTap('left');
  robot.keyTap('right');

  const charge = robot.getPixelColor(data.crd.x + 757, data.crd.y + 139);
  if (Number(data.cfg.heal) !== 1 && charge === '6687a3') {
    robot.keyTap('g');
  }
  // else {
  //   robot.keyTap('r');
  // }

  await wf(data, 'enemy');
  return crown(data);
};

const snipeCycle = async (data) => {
  if (data.wfm !== 0) {
    // if we wait for a move -> start idle
    await button(data, positions.Adventure.EnterITOPOD.Button);
    await button(data, positions.Adventure.EnterITOPOD.Enter);

    await idle(data);

    if (Number(data.cfg.heal) === 1) {
      await click(data.crd, 735, 210, true); // left arrow
      await wf(data, 'cd');
      robot.keyTap('b');
      await wf(data, 'cd');
      robot.keyTap('g');
      await wf(data, 'cd');
      robot.keyTap('r');
      await wf(data, 'hp');
    } else if (Number(data.cfg.heal) !== 1 && data.wfm === 2) {
      // wait for charge if we wait for megabuff
      await wf(data, 'cd');
      robot.keyTap('g');
    }
  }

  cp(`snipe #${data.skc + 1}`);

  await click(data.crd, 937, 210, true); // right arrow
  const zonesBack = Number(data.cfg.zone);
  if (zonesBack !== 0) for (let i = 0; i < zonesBack; i++) robot.keyTap('left');

  data.atkarr = [...data.cfg.atk];

  await wf(data, 'cd');
  robot.keyTap('v');

  await wf(data, 'enemy');
  let c = crown(data);

  while (!c) c = await waitForBoss(data);

  // if (data.wfm === 2) robot.keyTap('v');

  while (c) {
    c = crown(data);

    await wf(data, 'cd');

    if (data.atkarr.length !== 0) {
      robot.keyTap(data.atkarr[0]);
      data.atkarr.shift();
    } else robot.keyTap('w');
  }

  data.skc++; // add to killcount

  snipeCycle(data);
};

const snipe = async (data) => {
  try {
    const idle = Number(data.cfg.idle);
    data.wfm = Number(data.cfg.move);

    if (data.wfm !== 0) data.inf = true;
    else data.dur = idle * 1000;

    await goToAdv(data);

    checkIdleBorder(data, 'disable');

    await snipeCycle(data);
  } catch (err) {
    cp(err);
  }
};

export default snipe;
