const robot = require('robotjs');
const cgp = require('./helper/coordgetpixel.js');

const idle = (c) => {
  // wait for enemy
  cgp(c, 736, 415, 'ffffff', 'waitNot');

  // wait for cooldown
  cgp(c, 472, 109, '7c4e4e', 'waitNot');

  console.log('whack');

  robot.keyTap('w');

  idle(c);
};

module.exports = (coordinates) => {
  idle(coordinates);
};
