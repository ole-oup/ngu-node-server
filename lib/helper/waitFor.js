import robot from 'robotjs';

import sp from './spinner.js';

const wf = (data, trigger, time) => {
  let x = null;
  let y = null;
  let color = 'ffffff';
  switch (trigger) {
    case 'cd':
      x = 472;
      y = 109;
      color = '7c4e4e';
      break;
    case 'enemy':
      x = 736;
      y = 415;
      break;
    case 'hp':
      x = 514;
      y = 411;
      break;
    default:
      throw 'WaitFor-Trigger Error';
  }

  const combinedX = data.crd.x + x;
  const combinedY = data.crd.y + y;

  return new Promise((resolve) => {
    while (data !== undefined) {
      const hex = robot.getPixelColor(combinedX, combinedY);

      sp(data, time);

      if (hex !== color) {
        resolve();
        break;
      }
    }
  });
};

export default wf;
