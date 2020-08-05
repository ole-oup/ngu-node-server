import robot from 'robotjs';

import sp from './spinner.js';

const spgc = (data, x, y, color, action) => {
  const combinedX = data.crd.x + x;
  const combinedY = data.crd.y + y;

  const { timeout } = data.cfg.general;
  const to = Number(timeout) * 1000 * 60;

  return new Promise((resolve) => {
    while (Number(to) === 0 || data.tdd < to) {
      const hex = robot.getPixelColor(combinedX, combinedY);
      sp(data);

      if (
        (action !== 'waitNot' && hex === color) ||
        (action === 'waitNot' && hex !== color)
      ) {
        resolve();
        break;
      }
    }

    if (to !== 0 && data.tdd > to) {
      data.to = true;
      data.tdd = 0;
      resolve();
    }
  });
};

export default spgc;
