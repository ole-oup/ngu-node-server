import { positions, button } from './helper/uxpos.js';
import distributeRes from './helper/distribute.js';
import wishes from './helper/wishes.js';
import cp from './helper/print.js';
import rl from './helper/question.js';
import wt from './helper/waitTap.js';
import click from './helper/click.js';
import ga from './helper/aug.js';

const rebirthMode = async () => {
  const input = await rl('rebirth mode: ');

  if (input === 'modes') {
    console.log('1: tm, 2: augs & bm, 3: wishes, 4: dist');
    return rebirthMode();
  }

  return Number(input);
};

const rebirth = async (data, mode) => {
  try {
    data.terminal.bringToTop();

    const m = mode ?? (await rebirthMode());
    if (m === 4) return distributeRes(data);

    let aug;

    data.win.bringToTop();

    // fight boss
    await button(data, positions.FightBoss.Menu);
    await button(data, positions.FightBoss.Nuke);

    // reset resources after, can't be in adv menu (r and t hotkeys)
    await wt('r');
    await wt('t');
    await wt('f');

    // gold diggers
    await button(data, positions.Diggers.Menu);
    await button(data, positions.Diggers.CapSaved);

    // wandoos
    await button(data, positions.Wandoos.Menu);
    await button(data, positions.Wandoos.eCap);
    await button(data, positions.Wandoos.mCap);

    // ngu
    await button(data, positions.NGU.Menu);
    await button(data, positions.NGU.CapAll);
    await button(data, positions.NGU.SwitchMode);
    await button(data, positions.NGU.CapAll);

    // max resources in input
    await button(data, positions.Inputs.InputCustom4);

    switch (m) {
      case 1:
        // tm
        await button(data, positions.TimeMachine.Menu);
        await button(data, positions.TimeMachine.TMEPlus);
        await button(data, positions.TimeMachine.TMMPlus);

        break;
      case 2:
        // blood magic
        await button(data, positions.BloodMagic.Menu);
        await button(data, positions.BloodMagic.DecapPlus); // InsideOutPlus

        if (data.cfg.rebirth.spell === '1') {
          await button(data, positions.BloodMagic.Spells.Button);
          await button(data, positions.BloodMagic.Spells.Gold);
          await button(data, positions.BloodMagic.Spells.Spaghetti);
        }

        // augment
        await button(data, positions.Augmentation.Menu);
        await button(data, positions.Inputs.ECapHalf);

        aug = ga(data);

        await click(data.crd, aug.x, aug.y); // aug +
        await click(data.crd, aug.ux, aug.uy); // upgrade +

        break;
      case 3:
        await wishes(data);
        await button(data, positions.Inputs.InputCustom4);

        break;
      default:
        throw 'Invalid Mode';
    }

    // hacks
    await button(data, positions.Hacks.Menu);

    if (data.cfg.rebirth.hackday !== '1') {
      await button(data, positions.Hacks.Page2);
      await button(data, positions.Hacks.HackPlus);
    }
  } catch (err) {
    cp(err, true);
  }
};

export default rebirth;
