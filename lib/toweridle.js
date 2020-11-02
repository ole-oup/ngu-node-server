import goToAdv from './helper/goToAdv.js';
import idle from './helper/idle.js';

const towerIdle = async (data) => {
  data.inf = true;
  await goToAdv(data);
  await idle(data);
};

export default towerIdle;
