import click from './click.js';
import wt from './waitTap.js';
import ga from './aug.js';
import cp from './print.js';
import gd from './getDifference.js';
import progress from './progress.js';
import wishes from './wishes.js';
import { positions, button } from './uxpos.js';

const distributeRes = async (data) => {
  const start = new Date();

  // steps & progress
  let s = 30;
  if (data.cfg.rebirth.boss === '1') s++;
  if (data.cfg.rebirth.gold === '1') s++;
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
    await button(data, positions.Adventure.RightArrow, 'rc'); // right click
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

  for (let i = 0; i <= Number(augrepeat); i++) {
    await click(data.crd, aug.x, aug.y); // aug +
  }
  await click(data.crd, aug.ux, aug.uy); // upgrade +
  p = progress(p, s);

  // tm
  // todo tm mit %, option in config
  await button(data, positions.TimeMachine.Menu);
  p = progress(p, s);

  await button(data, positions.Inputs.ECapCustom2);
  p = progress(p, s);
  await button(data, positions.TimeMachine.TMEPlus);
  p = progress(p, s);

  await button(data, positions.Inputs.MCapCustom2);
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

  if (data.cfg.rebirth.spell === '1') {
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

  await button(data, positions.NGU.CapAll);
  p = progress(p, s);

  await button(data, positions.NGU.SwitchMode);
  await button(data, positions.NGU.CapAll);
  p = progress(p, s);

  // wishes
  if (data.cfg.rebirth.wish === '1') await wishes(data, p, s);

  // max resources in input
  await button(data, positions.Inputs.InputCustom4);

  // // tm mit rest em
  // await button(data, positions.TimeMachine.Menu);
  // p = progress(p, s);

  // await button(data, positions.TimeMachine.TMEPlus);
  // p = progress(p, s);

  // await button(data, positions.TimeMachine.TMMPlus);
  // p = progress(p, s);

  // hacks
  await button(data, positions.Hacks.Menu);
  p = progress(p, s);

  await button(data, positions.Hacks.Page2);
  p = progress(p, s);

  await button(data, positions.Hacks.HackPlus);
  p = progress(p, s);

  if (p !== s) throw 'progress error';

  const t = gd(start);

  cp(`completed in: ${t / 1000}s`);
};

export default distributeRes;
