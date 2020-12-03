import robot from 'robotjs';

import { positions, button } from '../util/uxpos.js';
import wishes from '../util/wishes.js';
import cp from '../util/print.js';
import click from '../util/click.js';
import ga from '../util/aug.js';
import wait from '../util/wait.js';

const rebirth = async (data, rmode) => {
  try {
    let aug;

    // fight boss
    await button(data, positions.FightBoss.Menu);
    await button(data, positions.FightBoss.Nuke);

    // reset resources after, can't be in adv menu (r and t hotkeys)
    robot.keyTap('r');
    robot.keyTap('t');
    robot.keyTap('f');

    await wait(0.25);

    // gold diggers
    await button(data, positions.Diggers.Menu);
    await button(data, positions.Diggers.ClearAllActive);
    await button(data, positions.Diggers.CapSaved);

    if (rmode != 4) {
      // ngu
      await button(data, positions.NGU.Menu);
      await button(data, positions.NGU.EvilCheck);
      await button(data, positions.NGU.CapAll);
      await button(data, positions.NGU.SwitchMode);
      await button(data, positions.NGU.CapAll);
    }

    // max resources in input
    await button(data, positions.Inputs.InputCustom4);

    switch (Number(rmode)) {
      case 1:
        // tm
        await button(data, positions.TimeMachine.Menu);
        await button(data, positions.TimeMachine.TMEPlus);
        await button(data, positions.TimeMachine.TMMPlus);
        break;
      case 2:
        // wandoos & blood diggers
        await button(data, positions.Diggers.Menu);
        await button(data, positions.Diggers.Page1);
        await button(data, positions.Diggers.WandoosCap);
        await button(data, positions.Diggers.Page3);
        await button(data, positions.Diggers.BloodCap);

        // wandoos
        await button(data, positions.Wandoos.Menu);
        await button(data, positions.Wandoos.eCap);
        await button(data, positions.Wandoos.mCap);

        // blood magic
        await button(data, positions.BloodMagic.Menu);

        switch (Number(data.cfg.spell)) {
          case 1:
            await button(data, positions.BloodMagic.TackPlus);
            break;
          case 2:
            await button(data, positions.BloodMagic.CutsPlus);
            break;
          case 3:
            await button(data, positions.BloodMagic.HickeyPlus);
            break;
          case 4:
            await button(data, positions.BloodMagic.BarbPlus);
            break;
          case 5:
            await button(data, positions.BloodMagic.BankPlus);
            break;
          case 6:
            await button(data, positions.BloodMagic.DecapPlus);
            break;
          case 7:
            await button(data, positions.BloodMagic.ChipperPlus);
            break;
          case 8:
            await button(data, positions.BloodMagic.InsideOutPlus);
            break;

          default:
            throw 'Invalid Spell';
        }

        // augment
        await button(data, positions.Augmentation.Menu);
        await button(data, positions.Inputs.EIdleHalf);

        aug = ga(data);

        await click(data, aug.x, aug.y); // aug +
        await click(data, aug.ux, aug.uy); // upgrade +

        // max resources in input
        await button(data, positions.Inputs.InputCustom4);
        break;
      case 3:
        await wishes(data);
        await button(data, positions.Inputs.InputCustom4);
        break;
      case 4:
        // ngu diggers
        await button(data, positions.Diggers.Menu);
        await button(data, positions.Diggers.Page2);
        await button(data, positions.Diggers.ENGUCap);
        await button(data, positions.Diggers.MNGUCap);
        // ngu
        await button(data, positions.NGU.Menu);
        await button(data, positions.NGU.SadCheck);
        await button(data, positions.NGU.CapAll);
        await button(data, positions.NGU.SwitchMode);
        await button(data, positions.NGU.CapAll);
        break;
      default:
        throw 'Invalid rmode';
    }

    // hacks
    await button(data, positions.Hacks.Menu);

    const { hack } = data.cfg;

    switch (Number(hack)) {
      case 0:
        await button(data, positions.Hacks.Page1.Menu);
        await button(data, positions.Hacks.Page1.ADPlus);
        break;
      case 1:
        await button(data, positions.Hacks.Page1.Menu);
        await button(data, positions.Hacks.Page1.AdvPlus);
        break;
      case 2:
        await button(data, positions.Hacks.Page1.Menu);
        await button(data, positions.Hacks.Page1.TMPlus);
        break;
      case 3:
        await button(data, positions.Hacks.Page1.Menu);
        await button(data, positions.Hacks.Page1.DCPlus);
        break;
      case 4:
        await button(data, positions.Hacks.Page1.Menu);
        await button(data, positions.Hacks.Page1.AugPlus);
        break;
      case 5:
        await button(data, positions.Hacks.Page1.Menu);
        await button(data, positions.Hacks.Page1.ENGUPlus);
        break;
      case 6:
        await button(data, positions.Hacks.Page1.Menu);
        await button(data, positions.Hacks.Page1.MNGUPlus);
        break;
      case 7:
        await button(data, positions.Hacks.Page1.Menu);
        await button(data, positions.Hacks.Page1.BloodPlus);
        break;
      case 8:
        await button(data, positions.Hacks.Page2.Menu);
        await button(data, positions.Hacks.Page2.QPPlus);
        break;
      case 9:
        await button(data, positions.Hacks.Page2.Menu);
        await button(data, positions.Hacks.Page2.DaycarePlus);
        break;
      case 10:
        await button(data, positions.Hacks.Page2.Menu);
        await button(data, positions.Hacks.Page2.EXPPlus);
        break;
      case 11:
        await button(data, positions.Hacks.Page2.Menu);
        await button(data, positions.Hacks.Page2.NumberPlus);
        break;
      case 12:
        await button(data, positions.Hacks.Page2.Menu);
        await button(data, positions.Hacks.Page2.PPPlus);
        break;
      case 13:
        await button(data, positions.Hacks.Page2.Menu);
        await button(data, positions.Hacks.Page2.HackPlus);
        break;
      case 14:
        await button(data, positions.Hacks.Page2.Menu);
        await button(data, positions.Hacks.Page2.WishPlus);
        break;
      default:
        throw 'invalid hack';
    }
  } catch (err) {
    cp(data, err, true);
  }
};

export default rebirth;
