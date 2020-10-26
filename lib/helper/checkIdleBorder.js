import robot from 'robotjs';

import wait from './wait.js';

const checkIdleBorder = async (data, action) => {
  await wait(0.2);
  const idleBorder = robot.getPixelColor(data.crd.x + 316, data.crd.y + 86);

  const condition =
    action === 'disable' ? idleBorder === 'ffeb04' : idleBorder !== 'ffeb04';

  if (condition) {
    robot.keyTap('q');
    await wait(0.05);
  }
};

export default checkIdleBorder;
