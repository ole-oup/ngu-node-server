import robot from 'robotjs';
import click from '../util/click.js';

import goToAdv from '../util/goToAdv.js';
import idle from '../util/idle.js';
import { button, positions } from '../util/uxpos.js';

const towerIdle = async (data) => {
  data.inf = true;

  await button(data, positions.Inventory.Menu);
  await click(data.crd, 358, 574);
  if (Number(data.cfg.ring) === 1) {
    const ring = robot.getPixelColor(data.crd.x + 898, data.crd.y + 532);

    if (ring === 'cfbfe7') {
      await click(data.crd, 898, 532, true);
    }
  }

  await goToAdv(data);
  await idle(data);
};

export default towerIdle;