const robot = require('robotjs');

const cp = require('./helper/clearprint.js');
const click = require('./helper/click.js');
const idle = require('./helper/idle.js');

async function toweridle(coords, config, win) {
  cp('clicking adventure mode');
  await click(coords, 233, 104);

  cp('disabling idle');
  const idleBorder = robot.getPixelColor(coords.x + 315, coords.y + 87);
  if (idleBorder === 'ffeb04') {
    setTimeout(() => {
      robot.keyTap('q');
    }, 50);
  }

  // todo check beastmode

  cp('entering ITOPOD');
  await click(coords, 372, 224);
  await click(coords, 626, 296);

  if (Number(config.general.hide) === 1) {
    cp('hiding game');
    // todo terminal auch minimieren?
    win.hide();
  }

  cp('looping ITOPOD');
  idle(coords, config, win);
}

module.exports = (coords, config, win) => {
  toweridle(coords, config, win);
};
