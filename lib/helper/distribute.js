import click from './click.js';
import wt from './waitTap.js';
import ga from './aug.js';
import rl from './question.js';
import cp from './print.js';
import gd from './getDifference.js';

const progress = (progress, total) => {
  // bar length & progress
  const l = 20;
  const p = (progress / total) * 20;

  let bar = '[';
  for (let i = 0; i < l; i++) bar += i < p ? '-' : ' ';
  const percent = Math.round((progress / total) * 100);
  bar += `] ${percent > 9 ? '' : ' '}${percent}%`;

  cp(bar);
  return progress + 1;
};

const wishes = async (data, p, s) => {
  // uses rest of e/m and x% (custom 1) of r3
  const wishes = {};

  await click(data.crd, 233, 455); // wishes

  data.terminal.bringToTop();
  console.log(''); // new line

  // enter wish pos, format: xx (ex. 12 for row 1 column 2)
  wishes.one = await rl('wish 1 position (row, column)? ');
  wishes.two = await rl('wish 2 position (row, column)? ');
  wishes.thr = await rl('wish 3 position (row, column)? ');

  console.clear();

  // 350 350 wish, 92 right, 106 down

  wishes.crd = {
    one: {
      x: 350 - 92 + wishes.one[1] * 92,
      y: 350 - 106 + wishes.one[0] * 106,
    },

    two: {
      x: 350 - 92 + wishes.two[1] * 92,
      y: 350 - 106 + wishes.two[0] * 106,
    },

    thr: {
      x: 350 - 92 + wishes.thr[1] * 92,
      y: 350 - 106 + wishes.thr[0] * 106,
    },
  };

  data.win.bringToTop();

  const wishrepeat = Number(data.cfg.rebirth.wishrepeat);

  p = progress(p, s);

  // set e, repeat
  for (let i = 0; i <= wishrepeat; i++) {
    await click(data.crd, 926, 20); // e idle custom (33%)
    p = progress(p, s);

    await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
    await click(data.crd, 609, 221); // e +
    p = progress(p, s);

    await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
    await click(data.crd, 609, 221); // e +
    p = progress(p, s);

    await click(data.crd, wishes.crd.thr.x, wishes.crd.thr.y); // wish 3
    await click(data.crd, 609, 221); // e +
    p = progress(p, s);
  }

  // set m, repeat
  for (let i = 0; i <= wishrepeat; i++) {
    await click(data.crd, 926, 42); // m idle custom (33%)
    p = progress(p, s);

    await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
    await click(data.crd, 739, 221); // m +
    p = progress(p, s);

    await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
    await click(data.crd, 739, 221); // m +
    p = progress(p, s);

    await click(data.crd, wishes.crd.thr.x, wishes.crd.thr.y); // wish 3
    await click(data.crd, 739, 221); // m +
    p = progress(p, s);
  }

  // r3
  await click(data.crd, 765, 65); // r3 custom 1 (5%)
  p = progress(p, s);

  await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
  await click(data.crd, 866, 221); // r3 +
  p = progress(p, s);

  await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
  await click(data.crd, 866, 221); // r3 +
  p = progress(p, s);

  await click(data.crd, wishes.crd.thr.x, wishes.crd.thr.y); // wish 3
  await click(data.crd, 866, 221); // r3 +

  console.clear();
  return progress(p, s);
};

const distributeRes = async (data) => {
  const start = new Date();

  // steps & progress
  let s = 24;
  if (data.cfg.rebirth.boss === '1') s++;
  if (data.cfg.rebirth.gold === '1') s++;
  if (data.cfg.rebirth.wish === '1')
    s += (Number(data.cfg.rebirth.wishrepeat) + 1) * 4 * 2 + 5;
  let p = 0;

  p = progress(p, s);

  // fight boss
  await click(data.crd, 233, 50); // fight boss
  p = progress(p, s);
  await click(data.crd, 626, 150); // nuke
  p = progress(p, s);

  // reset resources after, can't be in adv menu (r and t hotkeys)
  await wt('r');
  p = progress(p, s);
  await wt('t');
  p = progress(p, s);
  await wt('f');
  p = progress(p, s);

  // adventure
  if (data.cfg.rebirth.boss === '1') {
    await click(data.crd, 233, 104); // adventure

    await click(data.crd, 937, 210, true); // right arrow
    p = progress(p, s);
  }

  // augment
  // todo config option für augment -> wieviel
  // todo erst hoch / runterscrollen
  await click(data.crd, 233, 159); // augment
  p = progress(p, s);

  // robot.scrollMouse(0, -10000);
  // await wait(2000);

  await click(data.crd, 765, 20); //  e cap custom 1 (1%)
  p = progress(p, s);

  const aug = ga(data);

  const { augrepeat } = data.cfg.rebirth;

  for (let i = 0; i <= augrepeat; i++) {
    await click(data.crd, aug.x, aug.y); // aug +
  }
  await click(data.crd, aug.ux, aug.uy); // upgrade +
  p = progress(p, s);

  // tm
  // todo tm mit %, option in config
  await click(data.crd, 233, 211); // tm
  p = progress(p, s);

  await click(data.crd, 357, 42); // custom input 1
  p = progress(p, s);

  await click(data.crd, 533, 235); // tm e +
  p = progress(p, s);
  await click(data.crd, 533, 331); // tm m +
  p = progress(p, s);

  // gold diggers
  await click(data.crd, 233, 346); // gold diggers
  p = progress(p, s);
  await click(data.crd, 798, 113); // cap saved
  p = progress(p, s);

  // blood magic
  await click(data.crd, 233, 238); // blood magic
  p = progress(p, s);

  await click(data.crd, 824, 110); // cap all
  p = progress(p, s);

  if (data.cfg.rebirth.gold === '1') {
    await click(data.crd, 395, 114); // spells
    await click(data.crd, 735, 310); // gold spell
    await click(data.crd, 396, 310); // drop spell
    p = progress(p, s);
  }

  // wandoos
  await click(data.crd, 233, 266); // wandoos
  p = progress(p, s);

  await click(data.crd, 625, 250); // e cap
  p = progress(p, s);
  await click(data.crd, 625, 348); // m cap
  p = progress(p, s);

  // ngu
  await click(data.crd, 233, 293); // ngu
  p = progress(p, s);

  await click(data.crd, 628, 160); // cap all
  p = progress(p, s);

  await click(data.crd, 378, 110); // switch mode
  await click(data.crd, 628, 160); // cap all
  p = progress(p, s);

  if (data.cfg.rebirth.wish === '1') p = await wishes(data, p, s);

  // max resources in input
  await click(data.crd, 460, 65); // custom input 4

  // todo rest in hacks, auch readline?

  // hacks
  await click(data.crd, 233, 427); // hax
  p = progress(p, s);

  if (p !== s) throw 'progress error';

  const t = gd(start);

  cp(`completed in: ${t / 1000}s`);
};

export default distributeRes;
