const robot = require('robotjs');

const click = require('./helper/click.js');
const idle = require('./helper/idle.js');

async function toweridle(coords, config, win) {
  await click(coords, 233, 104);

  const idleBorder = robot.getPixelColor(coords.x + 315, coords.y + 87);
  if (idleBorder === 'ffeb04') {
    setTimeout(() => {
      robot.keyTap('q');
    }, 50);
  }

  // todo check beastmode

  await click(coords, 372, 224);
  await click(coords, 626, 296);

  if (Number(config.general.hide) === 1) {
    // todo terminal auch minimieren?
    win.hide();
  }

  idle(coords, config, win);
}

module.exports = (coords, config, win) => {
  toweridle(coords, config, win);
};
