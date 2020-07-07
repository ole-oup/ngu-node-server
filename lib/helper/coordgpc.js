const robot = require('robotjs');
const cp = require('./print.js');

const spinner = ['|', '/', '-', '\\'];

const coordGetPixel = (coords, x, y, color, action) => {
  const combinedX = coords.x + x;
  const combinedY = coords.y + y;

  return new Promise((resolve) => {
    while (color) {
      const text = `  ${spinner[0]} searching\r`;
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

      spinner.push(spinner[0]);
      spinner.shift();
      cp(text);
    }
  });
};

module.exports = (coords, x, y, color, action) => {
  coordGetPixel(coords, x, y, color, action);
};
