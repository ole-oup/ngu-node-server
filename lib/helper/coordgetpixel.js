const robot = require('robotjs');

const coordGetPixel = (coords, x, y, color, action) => {
  const combinedX = coords.x + x;
  const combinedY = coords.y + y;

  return new Promise((resolve) => {
    while (color) {
      const hex = robot.getPixelColor(combinedX, combinedY);

      if (action !== 'waitNot' && hex === color) {
        resolve();
        break;
      }

      if (action === 'waitNot' && hex !== color) {
        resolve();
        break;
      }
    }
  });
};

module.exports = (coords, x, y, color, action) => {
  coordGetPixel(coords, x, y, color, action);
};
