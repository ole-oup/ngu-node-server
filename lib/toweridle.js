import robot from 'robotjs';

// todo button() statt click
import click from './helper/click.js';
import idle from './helper/idle.js';
import wt from './helper/waitTap.js';

const towerIdle = async (data) => {
  data.win.bringToTop();
  data.cfg.general.timeout = 0;
  data.inf = true;

  await click(data.crd, 233, 104); // adv

  const idleBorder = robot.getPixelColor(data.crd.x + 315, data.crd.y + 87);
  if (idleBorder === 'ffeb04') await wt('q');

  // todo check beastmode

  await click(data.crd, 372, 224); // itopod
  await click(data.crd, 626, 296); // enter

  if (data.cfg.general.hide === '1') {
    // todo terminal auch minimieren?
    data.win.hide();
  }

  idle(data);
};

export default towerIdle;
