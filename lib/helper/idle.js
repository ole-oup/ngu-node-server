const robot = require('robotjs');
const { windowManager } = require('node-window-manager');

const cp = require('./clearprint.js');
const cgp = require('./coordgetpixel.js');

const idle = async (coords, config, win) => {
  try {
    // wait for enemy spawn
    await cgp(coords, 736, 415, 'ffffff', 'waitNot');

    // if game loses focus and is not hidden -> send q + error
    const currWin = windowManager.getActiveWindow();
    if (currWin.getTitle() !== 'NGU Idle') {
      win.bringToTop();
      if (Number(config.general.hide) !== 1) {
        robot.keyTap('q');
        currWin.bringToTop();
        throw 'Game lost focus';
      }
    }

    robot.keyTap('w');

    idle(coords, config, win);
  } catch (err) {
    cp(err, true);
  }
};

module.exports = (coords, config, win) => {
  idle(coords, config, win);
};
