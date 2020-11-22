import { restart } from '../util/print.js';
import checkIdleBorder from '../util/checkIdleBorder.js';
import { button, positions } from '../util/uxpos.js';

const reserver = async (data) => {
  await button(data, positions.Adventure.Menu);
  checkIdleBorder(data);
  restart();
};

export default reserver;
