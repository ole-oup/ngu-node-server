const robot = require('robotjs');

const cycle = () => {
  robot.keyTap('w');
  cycle();
};

module.exports = () => {
  cycle();
};
