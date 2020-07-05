const robot = require('robotjs');
const click = require('./helper/click.js');
const idle = require('./helper/idle.js');

async function toweridle(c) {
  // click adventure menu
  await click(c, 233, 104);

  // disable idle mode if on
  const idleBorder = robot.getPixelColor(c.x + 315, c.y + 87);
  if (idleBorder === 'ffeb04') {
    setTimeout(() => {
      robot.keyTap('q');
    }, 50);
  }

  // click itopod
  await click(c, 372, 224);

  // click enter itopod
  await click(c, 626, 296);

  idle(c);
}

module.exports = (coords) => {
  toweridle(coords);
};
