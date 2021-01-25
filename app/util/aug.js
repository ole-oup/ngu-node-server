import getColor from '../util/getColor.js';
import click from '../util/click.js';
import { button, positions } from './uxpos.js';

const aug = async (data) => {
  const augButtons = {};
  const { aug } = data.cfg;

  await button(data, positions.Augmentation.Menu);
  await button(data, positions.Inputs.EIdleHalf);

  // todo weg? bessere lösung !
  const lower = aug > 5;
  const scrolledUp = getColor(data, 326, 576) === 'ffffff';
  if (scrolledUp && lower) throw 'Aug Window scrolled up';

  switch (Number(aug)) {
    case 1:
      augButtons.x = 538;
      augButtons.y = 263;
      augButtons.ux = 538;
      augButtons.uy = 289;
      break;
    case 2:
      augButtons.x = 538;
      augButtons.y = 327;
      augButtons.ux = 538;
      augButtons.uy = 356;
      break;
    case 3:
      augButtons.x = 538;
      augButtons.y = 392;
      augButtons.ux = 538;
      augButtons.uy = 420;
      break;
    case 4:
      augButtons.x = 538;
      augButtons.y = 457;
      augButtons.ux = 538;
      augButtons.uy = 486;
      break;
    case 5:
      augButtons.x = 538;
      augButtons.y = 523;
      augButtons.ux = 538;
      augButtons.uy = 551;
      break;
    case 6:
      augButtons.x = 538;
      augButtons.y = 448;
      augButtons.ux = 538;
      augButtons.uy = 476;
      break;
    case 7:
      augButtons.x = 538;
      augButtons.y = 512;
      augButtons.ux = 538;
      augButtons.uy = 542;
      break;
  }

  await click(data, augButtons.x, augButtons.y); // aug +
  await click(data, augButtons.ux, augButtons.uy); // upgrade +
};

export default aug;
