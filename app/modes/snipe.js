import robot from 'robotjs';

import click from '../util/click.js';
import wf from '../util/waitFor.js';
import idle from '../util/idle.js';
import cp from '../util/print.js';
import { positions, button } from '../util/uxpos.js';
import goToAdv from '../util/goToAdv.js';
import gd from '../util/getDifference.js';

robot.setKeyboardDelay(0);

let start = null;

const crown = (data) => {
  return robot.getPixelColor(data.crd.x + 735, data.crd.y + 280) === 'f7ef29'
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

  const enemyto = await wf(data, 'enemy');
  if (enemyto) await click(data.crd, 937, 210, true); // right arrow
  return crown(data);
};

const snipeCycle = async (data, killcount) => {
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

  await click(data.crd, 937, 210, true); // right arrow
  const zonesBack = Number(data.cfg.zone);
  if (zonesBack !== 0) for (let i = 0; i < zonesBack; i++) robot.keyTap('left');

  data.atkarr = [...data.cfg.atk];

  await wf(data, 'cd');
  robot.keyTap('v');

  const searchStart = new Date();

  await wf(data, 'enemy');
  let c = crown(data);

  while (!c) {
    c = await waitForBoss(data);
    if (Number(data.wfm) === 2 && gd(searchStart) > 13 * 1000) break; // reset snipe before megabuff runs out
  }

  let kc = killcount;
  while (c) {
    // only runs when there is a boss before the timeout
    await wf(data, 'cd');

    if (data.atkarr.length !== 0) {
      robot.keyTap(data.atkarr[0]);
      data.atkarr.shift();
    } else robot.keyTap('w');

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

  // todo hier wird nur der versuch gezählt, wenn oben waitForBoss abläuft dann zählt er trotzdem
  // oben in while if (!c) data.skc++
  // skc umbenennen und einfach als versuchscounter laufen lassen?
  snipeCycle(data, kc);
};

const snipe = async (data) => {
  try {
    data.wfm = Number(data.cfg.move);

    start = new Date();

    if (data.wfm !== 0) data.inf = true;
    else data.dur = 0;

    data.broadcast({
      ...data.response('snipe', 2),
      progress: {
        kills: 0,
        start,
      },
    });

    await goToAdv(data);
    await snipeCycle(data, 0);
  } catch (err) {
    cp(err);
  }
};

export default snipe;
