// import robot from 'robotjs';

import click from './click.js';
import wt from './waitTap.js';
import ga from './aug.js';
import rl from './question.js';

const wishes = async (data) => {
  // uses rest of e/m and x% (custom 1) of r3
  // todo mit config option wie viele wishes -> loop / iteration?
  const wishes = {};

  await click(data.crd, 233, 455); // wishes

  data.terminal.bringToTop();

  wishes.one = await rl('wish 1 position (column, row)? ');
  wishes.two = await rl('wish 2 position (column, row)? ');
  wishes.thr = await rl('wish 3 position (column, row)? ');

  wishes.arr = {
    one: wishes.one.split(','),
    two: wishes.two.split(','),
    thr: wishes.thr.split(','),
  };

  // 350 350 wish, 92 right, 106 down

  wishes.crd = {
    one: {
      x: 350 - 92 + wishes.arr.one[0] * 92,
      y: 350 - 106 + wishes.arr.one[1] * 106,
    },

    two: {
      x: 350 - 92 + wishes.arr.two[0] * 92,
      y: 350 - 106 + wishes.arr.two[1] * 106,
    },

    thr: {
      x: 350 - 92 + wishes.arr.thr[0] * 92,
      y: 350 - 106 + wishes.arr.thr[1] * 106,
    },
  };

  // e, repeat once
  for (let i = 0; i < 1; i++) {
    await click(data.crd, 926, 20); // e idle custom (33%)

    await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
    await click(data.crd, 609, 221); // e +

    await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
    await click(data.crd, 609, 221); // e +

    await click(data.crd, wishes.crd.thr.x, wishes.crd.thr.y); // wish 3
    await click(data.crd, 609, 221); // e +
  }

  // m, repeat once
  for (let i = 0; i < 1; i++) {
    await click(data.crd, 926, 42); // m idle custom (33%)

    await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
    await click(data.crd, 739, 221); // m +

    await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
    await click(data.crd, 739, 221); // m +

    await click(data.crd, wishes.crd.thr.x, wishes.crd.thr.y); // wish 3
    await click(data.crd, 739, 221); // m +
  }

  // r3
  await click(data.crd, 765, 65); // r3 custom 1 (5%)

  await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
  await click(data.crd, 866, 221); // r3 +

  await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
  await click(data.crd, 866, 221); // r3 +

  await click(data.crd, wishes.crd.thr.x, wishes.crd.thr.y); // wish 3
  await click(data.crd, 866, 221); // r3 +
};

const distributeRes = async (data) => {
  // fight boss
  await click(data.crd, 233, 50); // fight boss
  await click(data.crd, 626, 150); // nuke

  // reset resources after, can't be in adv menu (r and t hotkeys)
  await wt('r');
  await wt('t');
  await wt('f');

  // adventure
  await click(data.crd, 233, 104); // adventure

  /* todo der punkt hier ist schwarz anstatt gelb, ist aber genau wie in funktionen wo es funzt?
  const idleBorder = robot.getPixelColor(data.crd.x + 315, data.crd.y + 87);
  if (idleBorder !== 'ffeb04') await wt('q', 100);
  console.log(idleBorder);
  // robot.moveMouse(data.crd.x + 315, data.crd.y + 87); */

  if (data.cfg.rebirth.boss === '1') {
    await click(data.crd, 937, 210, true); // right arrow
    const zonesBack = data.cfg.general.zone;
    if (zonesBack !== '0') for (let i = 0; i < zonesBack; i++) await wt('left');
  }

  // augment
  // todo config option für augment -> wieviel
  // todo erst hoch / runterscrollen
  await click(data.crd, 233, 159); // augment

  // robot.scrollMouse(0, -10000);
  // await wait(2000);

  await click(data.crd, 765, 20); //  e cap custom 1 (1%)

  const aug = ga(data);

  await click(data.crd, aug.x, aug.y); // aug +
  await click(data.crd, aug.x, aug.y); // aug +
  await click(data.crd, aug.ux, aug.uy); // upgrade +

  // tm
  // todo tm mit %, option in config
  await click(data.crd, 233, 211); // tm

  await click(data.crd, 357, 42); // custom input 1

  await click(data.crd, 533, 235); // tm e +
  await click(data.crd, 533, 331); // tm m +

  // gold diggers
  await click(data.crd, 233, 346); // gold diggers
  await click(data.crd, 798, 113); // cap saved

  // blood magic
  await click(data.crd, 233, 238); // blood magic

  await click(data.crd, 824, 110); // cap all

  if (data.cfg.rebirth.gold === '1') {
    await click(data.crd, 395, 114); // spells
    await click(data.crd, 735, 310); // gold spell
    await click(data.crd, 396, 310); // drop spell
  }

  // wandoos
  await click(data.crd, 233, 266); // wandoos

  await click(data.crd, 625, 250); // e cap
  await click(data.crd, 625, 348); // m cap

  // ngu
  await click(data.crd, 233, 293); // ngu

  await click(data.crd, 628, 160); // cap all
  await click(data.crd, 378, 110); // switch mode
  await click(data.crd, 628, 160); // cap all

  if (data.cfg.rebirth.wish === '1') await wishes(data);

  // max resources in input
  await click(data.crd, 460, 65); // custom input 4

  // todo rest in hacks, auch readline?
};

export default distributeRes;
