import rl from './helper/question.js';

import goToAdv from './helper/goToAdv.js';
import idle from './helper/idle.js';
import checkIdleBorder from './helper/checkIdleBorder.js';
import { button, positions } from './helper/uxpos.js';

const quest = async (data) => {
  data.cfg.general.quest = '1';
  data.cfg.general.timer = '1';

  data.terminal.bringToTop();
  const duration = await rl('duration? '); // in minutes

  data.start = new Date();
  data.dur = duration * 60 * 1000;

  await goToAdv(data);

  await idle(data);

  await checkIdleBorder(data);

  await button(data, positions.Inventory.Menu);
};

export default quest;
