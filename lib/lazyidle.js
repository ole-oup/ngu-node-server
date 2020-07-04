const robot = require('robotjs');

const idle = () => {
  robot.keyTap('w');

  // setTimeout(idle, 10);
  idle();
};

module.exports = () => {
  idle();
};
