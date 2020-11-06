import robot from 'robotjs';

const checkIdleBorder = (data, action) => {
  const idleBorder = robot.getPixelColor(data.crd.x + 316, data.crd.y + 86);

  const condition =
    action === 'disable' ? idleBorder === 'ffeb04' : idleBorder !== 'ffeb04';

  if (condition) {
    robot.keyTap('q');
  }
};

export default checkIdleBorder;
