const robot = require('robotjs');

const cp = require('./helper/clearprint.js');
const click = require('./helper/click.js');
const idle = require('./helper/idle.js');
const { windowManager } = require('node-window-manager');

async function toweridle(coords, config, win) {
  cp('Clicking Adventure Mode');
  await click(coords, 233, 104);

  cp('Disabling Idle');
  const idleBorder = robot.getPixelColor(coords.x + 315, coords.y + 87);
  if (idleBorder === 'ffeb04') {
    setTimeout(() => {
      robot.keyTap('q');
    }, 50);
  }

  // todo check beastmode

  cp('Entering ITOPOD');
  await click(coords, 372, 224);
  await click(coords, 626, 296);

  if (Number(config.general.hide) === 1) {
    cp('Hiding Game');
    win.hide();
  }

  cp('Looping ITOPOD');
  idle(coords, win);
}

module.exports = (coords, config, win) => {
  toweridle(coords, config, win);
};
