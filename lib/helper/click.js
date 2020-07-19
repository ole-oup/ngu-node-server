import robot from 'robotjs';

const click = (coords, x, y, right, delay) => {
  const combinedX = coords.x + x;
  const combinedY = coords.y + y;

  return new Promise((resolve) => {
    robot.moveMouse(combinedX, combinedY);

    setTimeout(
      () => {
        robot.mouseClick(right ? 'right' : 'left');

        setTimeout(() => {
          resolve();
        }, 50);
      },
      delay ? delay : 50
    );
  });
};

export default click;
