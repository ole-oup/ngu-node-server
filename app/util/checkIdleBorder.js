import robot from 'robotjs';
import getColor from './getColor.js';

import { activeWindow } from '../app-index.js';

const checkIdleBorder = (data, action) => {
  const idleBorder = getColor(data, 316, 86);

  const window = activeWindow();
  const gameActive = window.getTitle() === 'NGU Idle';

  const act =
    action === 'disable' ? idleBorder === 'ffeb04' : idleBorder !== 'ffeb04';

  if (act && gameActive) {
    robot.keyTap('q');
  }
};

export default checkIdleBorder;
