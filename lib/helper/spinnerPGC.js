import robot from 'robotjs';
import cp from './print.js';
import displayTimer from './displayTimer.js';
import gd from './getDifference.js';

const spinner = ['|', '/', '-', '\\'];

const spinnerPGC = (data, x, y, color, action, updateTimer) => {
  const combinedX = data.crd.x + x;
  const combinedY = data.crd.y + y;

  const { timeout } = data.cfg.general;
  const to = Number(timeout) * 1000 * 60;

  return new Promise((resolve) => {
    while (Number(to) === 0 || data.tdd < to) {
      const timer = displayTimer(data);
      const str = `  \x1b[33m${spinner[0]}\x1b[0m ${timer} \x1b[32m${data.lam}\x1b[0m\r`;
      cp(str);
      spinner.push(spinner[0]);
      spinner.shift();

      const hex = robot.getPixelColor(combinedX, combinedY);

      if (
        (action !== 'waitNot' && hex === color) ||
        (action === 'waitNot' && hex !== color)
      ) {
        if (updateTimer === true) {
          data.lam = gd(data.lat); // set time since last kill
          data.lat = new Date(); // set time of last kill to now
        }
        resolve();
        break;
      }
    }

    if (Number(to) !== 0 && data.tdd > to) {
      // todo richtig handlen & testen ob timeout klappt
      console.log(data.tdd);
      console.log(to);
    }
  });
};

export default spinnerPGC;
