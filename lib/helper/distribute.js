import click from './click.js';
import wt from './waitTap.js';
import ga from './aug.js';
import rl from './question.js';
import cp from './print.js';
import gd from './getDifference.js';
import { positions, button } from './uxpos.js';

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

  await button(data, positions.Wishes.Menu);

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
    await button(data, positions.Inputs.EIdleCustom);
    p = progress(p, s);

    await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
    await button(data, positions.Wishes.Eplus);
    p = progress(p, s);

    await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
    await button(data, positions.Wishes.Eplus);
    p = progress(p, s);

    await click(data.crd, wishes.crd.thr.x, wishes.crd.thr.y); // wish 3
    await button(data, positions.Wishes.Eplus);
    p = progress(p, s);
  }

  // set m, repeat
  for (let i = 0; i <= wishrepeat; i++) {
    await button(data, positions.Inputs.MIdleCustom);
    p = progress(p, s);

    await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
    await button(data, positions.Wishes.Mplus);
    p = progress(p, s);

    await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
    await button(data, positions.Wishes.Mplus);
    p = progress(p, s);

    await click(data.crd, wishes.crd.thr.x, wishes.crd.thr.y); // wish 3
    await button(data, positions.Wishes.Mplus);
    p = progress(p, s);
  }

  // r3
  await click(data.crd, 765, 65); // r3 custom 1 (5%)
  await button(data, positions.Inputs.R3CapCustom1);
  p = progress(p, s);

  await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
  await button(data, positions.Wishes.Rplus);
  p = progress(p, s);

  await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
  await button(data, positions.Wishes.Rplus);
  p = progress(p, s);

  await click(data.crd, wishes.crd.thr.x, wishes.crd.thr.y); // wish 3
  await button(data, positions.Wishes.Rplus);

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
  await button(data, positions.FightBoss.Menu);
  p = progress(p, s);
  await button(data, positions.FightBoss.Nuke);
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
    await button(data, positions.Adventure.Menu);
    await button(data.crd, positions.Adventure.RightArrow, 'rc'); // right click
    p = progress(p, s);
  }

  // augment
  // todo config option für augment -> wieviel
  // todo erst hoch / runterscrollen
  await button(data, positions.Augmentation.Menu);
  p = progress(p, s);

  // robot.scrollMouse(0, -10000);
  // await wait(2000);

  await button(data, positions.Inputs.ECapCustom1);
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
  await button(data, positions.TimeMachine.Menu);
  p = progress(p, s);

  await button(data, positions.Inputs.InputCustom2);
  p = progress(p, s);

  await button(data, positions.TimeMachine.TMEPlus);
  p = progress(p, s);
  await button(data, positions.TimeMachine.TMMPlus);
  p = progress(p, s);

  // gold diggers
  await button(data, positions.Diggers.Menu);
  p = progress(p, s);
  await button(data, positions.Diggers.CapSaved);
  p = progress(p, s);

  // blood magic
  await button(data, positions.BloodMagic.Menu);
  p = progress(p, s);

  await button(data, positions.BloodMagic.TackCap);
  p = progress(p, s);

  if (data.cfg.rebirth.gold === '1') {
    await button(data, positions.BloodMagic.Spells.Button);
    await button(data, positions.BloodMagic.Spells.Gold);
    await button(data, positions.BloodMagic.Spells.Spaghetti);
    p = progress(p, s);
  }

  // wandoos
  await button(data, positions.Wandoos.Menu);
  p = progress(p, s);

  await button(data, positions.Wandoos.eCap);
  p = progress(p, s);
  await button(data, positions.Wandoos.mCap);
  p = progress(p, s);

  // ngu
  await button(data, positions.NGU.Menu);
  p = progress(p, s);

  await click(data.crd, 628, 160); // cap all
  await button(data, positions.NGU.CapAll);
  p = progress(p, s);

  await button(data, positions.NGU.SwitchMode);
  await button(data, positions.NGU.CapAll);
  p = progress(p, s);

  // wishes
  if (data.cfg.rebirth.wish === '1') p = await wishes(data, p, s);

  // max resources in input
  await button(data, positions.Inputs.InputCustom4);

  // todo rest in hacks, auch readline?

  // hacks
  await button(data, positions.Hacks.Menu);
  p = progress(p, s);

  if (p !== s) throw 'progress error';

  const t = gd(start);

  cp(`completed in: ${t / 1000}s`);
};

export default distributeRes;
