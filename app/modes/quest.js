import goToAdv from '../util/goToAdv.js';
import idle from '../util/idle.js';
import checkIdleBorder from '../util/checkIdleBorder.js';
import { button, positions } from '../util/uxpos.js';

const quest = async (data) => {
  const { questdur } = data.cfg;

  const duration = Number(questdur) * 60 * 1000; // todo

  await goToAdv(data, 'quest');
  await idle(data, null, duration);

  checkIdleBorder(data);
  await button(data, positions.Inventory.Menu);
};

export default quest;
