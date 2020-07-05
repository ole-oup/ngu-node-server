const robot = require('robotjs');
const { windowManager } = require('node-window-manager');

const cp = require('./clearprint.js');
const cgp = require('./coordgetpixel.js');

const idle = async (coords, win) => {
  try {
    // wait for enemy spawn
    await cgp(coords, 736, 415, 'ffffff', 'waitNot');

    const currWin = windowManager.getActiveWindow();
    if (currWin.getTitle() !== 'NGU Idle') {
      win.show();
      throw 'Game lost focus';
    }

    robot.keyTap('w');

    idle(coords, win);
  } catch (err) {
    cp(err, true);
  }
};

module.exports = (coords, win) => {
  idle(coords, win);
};
