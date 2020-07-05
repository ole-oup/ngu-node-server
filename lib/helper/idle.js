const robot = require('robotjs');
const cgp = require('./coordgetpixel.js');

async function idle(c) {
  try {
    // wait for enemy spawn
    await cgp(c, 736, 415, 'ffffff', 'waitNot');
    // wait for cooldown
    await cgp(c, 472, 109, '7c4e4e', 'waitNot');
    robot.keyTap('w');
    idle(c);
  } catch (err) {
    console.log(err.message);
    return;
  }
}

module.exports = (coordinates) => {
  idle(coordinates);
};
