import robot from 'robotjs';
import cp from './print.js';
import displayTimer from './displayTimer.js';

const spinner = ['|', '/', '-', '\\'];

const spinnerPGC = (data, x, y, color, action) => {
  const combinedX = data.crd.x + x;
  const combinedY = data.crd.y + y;

  const { timeout } = data.cfg.general;
  const to = timeout * 1000 * 60;

  return new Promise((resolve) => {
    while (data.tdd < to) {
      const timer = displayTimer(data);
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

    if (data.tdd > to) {
      // todo error richtig handlen
      console.log(data.tdd);
      console.log(to);
    }
  });
};

export default spinnerPGC;
