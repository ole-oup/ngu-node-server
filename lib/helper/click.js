const robot = require('robotjs');

module.exports = (coords, x, y, right) => {
  const combinedX = coords.x + x;
  const combinedY = coords.y + y;

  return new Promise((resolve) => {
    robot.moveMouse(combinedX, combinedY);
    robot.mouseClick(right ? 'right' : 'left');

    setTimeout(() => {
      resolve();
    }, 50);
  });
};
