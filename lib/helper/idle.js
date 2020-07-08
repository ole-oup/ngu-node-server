const robot = require('robotjs');
const { windowManager } = require('node-window-manager');

const cp = require('./print.js');
const cgpc = require('./coordgpc.js');

const idle = async (coords, config, win) => {
  try {
    // wait for enemy spawn
    await cgpc(coords, 736, 415, 'ffffff', 'waitNot');

    // if game loses focus and is not hidden -> send q + error
    const currWin = windowManager.getActiveWindow();
    if (currWin.getTitle() !== 'NGU Idle') {
      win.bringToTop();
      robot.keyTap('q');
      currWin.bringToTop();
      throw 'Game lost focus';
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
