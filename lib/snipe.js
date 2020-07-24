import robot from 'robotjs';

import click from './helper/click.js';
import wt from './helper/waitTap.js';
import spgc from './helper/spinnerPGC.js';
import idle from './helper/idle.js';

let crown = (data) => {
  return robot.getPixelColor(data.crd.x + 735, data.crd.y + 281) === 'f7ef29'
    ? true
    : false;
};

const waitTower = async (data) => {
  await click(data.crd, 372, 224); // itopod
  await click(data.crd, 626, 296); // enter

  idle(data);

  // todo hier warten bis leben voll und cd da (mit config option)
  await wt('g');
};

const snipeEnemy = async (data) => {
  const atkstr = data.cfg.snipe.atk;
  const atkarr = atkstr.split(',');

  await click(data.crd, 937, 210, true); // right arrow
  const zonesBack = data.cfg.general.zone;
  if (zonesBack !== '0') for (let i = 0; i < zonesBack; i++) await wt('left');

  await spgc(data, 736, 415, 'ffffff', 'waitNot'); // wait for enemy spawn

  let c = crown(data);

  if (!c) {
    await wt('left', 50);
    await wt('right', 50);

    await wt('g', 50);

    return snipeEnemy(data);
  }

  await wt('v');

  while (c) {
    c = crown(data);

    await spgc(data, 472, 109, '7c4e4e', 'waitNot'); // wait for cd

    atkarr.forEach(async (e) => {
      await wt(e, 0);
    });
  }
};

const snipe = async (data) => {
  data.dur = data.cfg.snipe.idle * 1000;

  await click(data.crd, 233, 104); // adventure

  const idleBorder = robot.getPixelColor(data.crd.x + 315, data.crd.y + 87);
  if (idleBorder === 'ffeb04') await wt('q');

  while (true) {
    await waitTower(data);
    await snipeEnemy(data);
  }
};

export default snipe;
