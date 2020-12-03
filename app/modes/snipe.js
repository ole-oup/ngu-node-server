import robot from 'robotjs';

import click from '../util/click.js';
import wf from '../util/waitFor.js';
import idle from '../util/idle.js';
import cp from '../util/print.js';
import { positions, button } from '../util/uxpos.js';
import goToAdv from '../util/goToAdv.js';
import gd from '../util/getDifference.js';
import getColor from '../util/getColor.js';

robot.setKeyboardDelay(0);

let start = null;

const crown = (data) => {
  return getColor(data, 735, 280) === 'f7ef29' ? true : false;
};

const waitForBoss = async (data) => {
  robot.keyTap('left');
  robot.keyTap('right');

  const charge = getColor(data, 757, 139);
  if (data.cfg.heal != 1 && charge === '6687a3') {
    robot.keyTap('g');
  }

  const enemyto = await wf(data, 'enemy');
  if (enemyto) await click(data, 937, 210, true); // right arrow
  return crown(data);
};

const waitForCharge = async (data) => {
  await wf(data, 'cd');
  const charge = getColor(data, 757, 139);
  if (charge !== '334452') {
    return true;
  }
  waitForCharge(data);
};

const attack = async (data, arr) => {
  await wf(data, 'cd');
  if (arr.length !== 0) {
    robot.keyTap(arr[0]);
    arr.shift();
  } else {
    const e = getColor(data, 541, 109);
    if (e !== '7c4e4e') robot.keyTap('e');
    else robot.keyTap('w');
  }
};

const snipeCycle = async (data, killcount, wfm) => {
  // if we wait for a move -> start idle
  await button(data, positions.Adventure.EnterITOPOD.Button);
  await button(data, positions.Adventure.EnterITOPOD.Enter);

  await idle(data, null, 60, wfm, true);

  if (data.cfg.heal == 1) {
    await click(data, 735, 210, true); // left arrow
    await wf(data, 'cd');
    robot.keyTap('b');
    await wf(data, 'cd');
    robot.keyTap('g');
    await wf(data, 'cd');
    robot.keyTap('r');
    await wf(data, 'hp');
    if (data.cfg.charge2x == 1) waitForCharge(data);
  } else if (data.cfg.heal != 1 && wfm == 2) {
    // wait for charge if we wait for megabuff
    await wf(data, 'cd');
    robot.keyTap('g');
  }

  await click(data, 937, 210, true); // right arrow
  const zonesBack = Number(data.cfg.zone);
  if (zonesBack !== 0) for (let i = 0; i < zonesBack; i++) robot.keyTap('left');

  await wf(data, 'cd');
  robot.keyTap('v');

  const searchStart = new Date();

  await wf(data, 'enemy');
  let c = crown(data);

  while (!c) {
    c = await waitForBoss(data);
    if (wfm == 2 && gd(searchStart) > 13 * 1000) break; // reset snipe before megabuff runs out
  }

  const atkarr = [...data.cfg.atk];

  let kc = killcount;
  while (c) {
    // only runs when there is a boss before the timeout
    await attack(data, atkarr);

    c = crown(data);
    if (!c) {
      kc++;
      const res = {
        ...data.response('snipe', 2),
        progress: {
          kills: kc,
          start,
        },
      };
      data.broadcast(res);
    }
  }

  snipeCycle(data, kc, wfm);
};

const snipe = async (data) => {
  try {
    start = new Date();

    data.broadcast({
      ...data.response('snipe', 2),
      progress: {
        kills: 0,
        start,
      },
    });

    await goToAdv(data);
    await snipeCycle(data, 0, data.cfg.move);
  } catch (err) {
    cp(data, err);
  }
};

export default snipe;
