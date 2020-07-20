import robot from 'robotjs';

import click from './helper/click.js';
import idle from './helper/idle.js';

async function toweridle(data) {
  data.win.bringToTop();
  await click(data.crd, 233, 104); // adv

  const idleBorder = robot.getPixelColor(data.crd.x + 315, data.crd.y + 87);
  if (idleBorder === 'ffeb04') {
    setTimeout(() => {
      robot.keyTap('q');
    }, 50);
  }

  data.inf = data.dur === null ? true : false;

  // todo check beastmode

  await click(data.crd, 372, 224); // itopod
  await click(data.crd, 626, 296); // enter

  if (data.cfg.general.hide === '1') {
    // todo terminal auch minimieren?
    data.win.hide();
  }

  idle(data);
}

export default toweridle;
