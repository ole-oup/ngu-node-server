import click from '../util/click.js';
import getColor from '../util/getColor.js';

import goToAdv from '../util/goToAdv.js';
import idle from '../util/idle.js';
import { button, positions } from '../util/uxpos.js';

const towerIdle = async (data) => {
  if (data.cfg.ring == 1) {
    await button(data, positions.Inventory.Menu);
    await click(data, 358, 574);
    const ring = getColor(data, 898, 532) === 'cfbfe7';
    if (ring) await click(data, 898, 532, true);
  }

  await goToAdv(data);
  await idle(data, null, null, null, true);
};

export default towerIdle;
