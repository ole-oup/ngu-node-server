import robot from 'robotjs';
import cp from './print.js';
import displayTimer from './displayTimer.js';

const spinner = ['|', '/', '-', '\\'];

const spinnerPGC = (data, x, y, color, action) => {
  const combinedX = data.crd.x + x;
  const combinedY = data.crd.y + y;

  return new Promise((resolve) => {
    while (true) {
      const timer = displayTimer(data.start);
      cp(`  ${spinner[0]} ${timer}\r`);
      spinner.push(spinner[0]);
      spinner.shift();

      const hex = robot.getPixelColor(combinedX, combinedY);

      if (
        (action !== 'waitNot' && hex === color) ||
        (action === 'waitNot' && hex !== color)
      ) {
        resolve();
        break;
      }
    }
  });
};

export default spinnerPGC;
