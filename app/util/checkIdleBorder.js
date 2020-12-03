import robot from 'robotjs';
import getColor from './getColor.js';

const checkIdleBorder = (data, action) => {
  const idleBorder = getColor(data, 316, 86);

  const condition =
    action === 'disable' ? idleBorder === 'ffeb04' : idleBorder !== 'ffeb04';

  if (condition) {
    robot.keyTap('q');
  }
};

export default checkIdleBorder;
