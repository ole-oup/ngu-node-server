import robot from 'robotjs';
import goToAdv from '../util/goToAdv.js';
import { button, positions } from '../util/uxpos.js';

const checkPit = async (data) => {
  const pitLight = robot.getPixelColor(data.crd.x + 188, data.crd.y + 76);
  if (pitLight !== 'ffffff') {
    if (pitLight === 'ffd23b') {
      console.log('daily spin');
      await button(data, positions.MoneyPit.DailySpin);
      await button(data, positions.MoneyPit.NoBS);
    } else {
      console.log('moneypit');
      await button(data, positions.MoneyPit.Menu);
      await button(data, positions.MoneyPit.FeedMe);
      await button(data, positions.MoneyPit.Yeah);
    }
    await goToAdv(data);
  }
};

export default checkPit;
