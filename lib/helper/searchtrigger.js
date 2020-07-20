import robot from 'robotjs';
import cp from './print.js';

const gpcSpinner = ['|', '/', '-', '\\'];

const searchTrigger = (coords, x, y, color, action) => {
  const combinedX = coords.x + x;
  const combinedY = coords.y + y;

  return new Promise((resolve) => {
    while (color) {
      const text = `  ${gpcSpinner[0]} searching\r`;
      const hex = robot.getPixelColor(combinedX, combinedY);

      // if (action === 'detect') {
      //   resolve(hex);
      //   break;
      // }

      if (
        (action !== 'waitNot' && hex === color) ||
        (action === 'waitNot' && hex !== color)
      ) {
        resolve();
        cp(`  ${gpcSpinner[0]} trigger found\r`);
        break;
      }

      gpcSpinner.push(gpcSpinner[0]);
      gpcSpinner.shift();
      cp(text);
    }
  });
};

export default searchTrigger;
