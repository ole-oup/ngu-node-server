import robot from 'robotjs';

import { positions, button } from '../util/uxpos.js';
import wishes from '../util/wishes.js';
import cp from '../util/print.js';
import aug from '../util/aug.js';
import wait from '../util/wait.js';
import hacks from '../util/hacks.js';
import spells from '../util/spells.js';
import ngu from '../util/ngu.js';

const rebirth = async (data) => {
  try {
    const { rmode } = data.cfg;

    // fight boss
    await button(data, positions.FightBoss.Menu);
    await button(data, positions.FightBoss.Nuke);

    // reset resources after, can't be in adv menu (r and t hotkeys)
    robot.keyTap('r');
    robot.keyTap('t');
    robot.keyTap('f');

    // 9e18 res input
    await button(data, positions.Inputs.InputCustom4);

    await wait(0.25);

    // gold diggers
    await button(data, positions.Diggers.Menu);
    await button(data, positions.Diggers.ClearAllActive);
    await button(data, positions.Diggers.CapSaved);

    if (rmode != 4) {
      // todo alle modes mit sad ngu?
      await ngu(data, 'evil');
    }

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

        await spells(data); // blood magic
        await aug(data); // augments
        break;
      case 3:
        await wishes(data);
        break;
      case 4:
        await ngu(data, 'sad');
        await wishes(data);
        break;
      default:
        throw 'Invalid rmode';
    }

    await hacks(data);
  } catch (err) {
    cp(data, err, true);
  }
};

export default rebirth;
