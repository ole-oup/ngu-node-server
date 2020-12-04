import getColor from '../util/getColor.js';
import goToAdv from '../util/goToAdv.js';
import { button, positions } from '../util/uxpos.js';

const checkPit = async (data) => {
  const pitLight = getColor(data, 188, 76);
  if (pitLight !== 'ffffff') {
    await button(data, positions.MoneyPit.Menu);
    if (pitLight === 'ffd23b') {
      await button(data, positions.MoneyPit.DailySpin);
      await button(data, positions.MoneyPit.NoBS);
    } else {
      await button(data, positions.MoneyPit.FeedMe);
      await button(data, positions.MoneyPit.Yeah);
    }
    await goToAdv(data);
  }
};

export default checkPit;
