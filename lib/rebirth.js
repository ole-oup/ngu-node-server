import robot from 'robotjs';

import { positions, button } from './helper/uxpos.js';
import wishes from './helper/wishes.js';
import cp from './helper/print.js';
import click from './helper/click.js';
import ga from './helper/aug.js';
import wait from './helper/wait.js';

const rebirth = async (data, rmode) => {
  try {
    const isHackDay = data.cfg.rebirth.hackday !== '1' ? false : true;

    let aug;

    data.win.bringToTop();

    // fight boss
    await button(data, positions.FightBoss.Menu);
    await button(data, positions.FightBoss.Nuke);

    // reset resources after, can't be in adv menu (r and t hotkeys)
    robot.keyTap('r');
    robot.keyTap('t');
    if (!isHackDay) robot.keyTap('f');

    await wait(0.25);

    // gold diggers
    await button(data, positions.Diggers.Menu);
    await button(data, positions.Diggers.ClearAllActive);
    await button(data, positions.Diggers.CapSaved);

    // ngu
    await button(data, positions.NGU.Menu);
    await button(data, positions.NGU.CapAll);
    await button(data, positions.NGU.SwitchMode);
    await button(data, positions.NGU.CapAll);

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

        switch (Number(data.cfg.rebirth.spell)) {
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

        await click(data.crd, aug.x, aug.y); // aug +
        await click(data.crd, aug.ux, aug.uy); // upgrade +

        // max resources in input
        await button(data, positions.Inputs.InputCustom4);
        break;
      case 3:
        await wishes(data);
        await button(data, positions.Inputs.InputCustom4);
        break;
      default:
        throw 'Invalid rmode';
    }

    // hacks
    await button(data, positions.Hacks.Menu);

    if (!isHackDay) {
      await button(data, positions.Hacks.Page2);
      await button(data, positions.Hacks.HackPlus);
    }
  } catch (err) {
    data.terminal.bringToTop();
    cp(err, true);
  }
};

export default rebirth;
