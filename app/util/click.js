import robot from 'robotjs';

const click = (data, x, y, right, delay) => {
  const combinedX = x * data.res;
  const combinedY = y * data.res;

  return new Promise((resolve) => {
    robot.moveMouse(combinedX, combinedY);

    setTimeout(() => {
      robot.mouseClick(right ? 'right' : 'left');

      setTimeout(() => {
        resolve();
      }, 50);
    }, delay ?? 50);
  });
};

export default click;
