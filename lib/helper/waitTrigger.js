import robot from 'robotjs';
import cp from './print.js';

const spinner = ['|', '/', '-', '\\'];

const searchTrigger = (coords, x, y, color, action) => {
  const combinedX = coords.x + x;
  const combinedY = coords.y + y;

  return new Promise((resolve) => {
    while (color) {
      cp(`  ${spinner[0]} searching\r`);
      spinner.push(spinner[0]);
      spinner.shift();

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
        cp(`  ${spinner[0]} trigger found\r`);
        break;
      }
    }
  });
};

export default searchTrigger;
