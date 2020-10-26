import goToAdv from './helper/goToAdv.js';
import idle from './helper/idle.js';

const towerIdle = async (data) => {
  data.win.bringToTop();
  data.inf = true;

  await goToAdv(data);

  // if (data.cfg.general.hide === '1') {
  //   // todo terminal auch minimieren?
  //   data.win.hide();
  // }

  await idle(data);

  await towerIdle(data);
};

export default towerIdle;
