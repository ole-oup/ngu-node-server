import robot from 'robotjs';
import cp from './print.js';

const spinner = ['|', '/', '-', '\\'];

const spinnerPGC = (data, x, y, color, action) => {
  const combinedX = data.crd.x + x;
  const combinedY = data.crd.y + y;

  return new Promise((resolve) => {
    while (true) {
      cp(`  ${spinner[0]} searching\r`);
      spinner.push(spinner[0]);
      spinner.shift();

      const hex = robot.getPixelColor(combinedX, combinedY);

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

export default spinnerPGC;
