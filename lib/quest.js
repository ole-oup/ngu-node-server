import goToAdv from './util/goToAdv.js';
import idle from './util/idle.js';
import checkIdleBorder from './util/checkIdleBorder.js';
import { button, positions } from './util/uxpos.js';

const quest = async (data) => {
  data.cfg.quest = 1;
  const { questdur } = data.cfg;

  data.start = new Date();
  data.dur = Number(questdur) * 60 * 1000;

  await goToAdv(data);
  await idle(data);

  checkIdleBorder(data);
  await button(data, positions.Inventory.Menu);
};

export default quest;
