const robot = require('robotjs');

// cooldown: 472, 109, 'ffffff'
// enemyspawn: 736, 415, 'ffffff', 'waitNot'
const coordGetPixel = (coords, x, y, color, action) => {
  let hex;
  hex = robot.getPixelColor(coords.x + x, coords.y + y);

  if (action === 'detect') return hex;

  if (action === 'waitNot') {
    if (hex !== color) return true;
  }

  if (hex === color) return true;

  coordGetPixel(coords);
};

module.exports = (coords, x, y, color, action) => {
  coordGetPixel(coords, x, y, color, action);
};
