import robot from 'robotjs';

const getColor = (data, x, y) => {
  return robot.getPixelColor(x * data.res, y * data.res);
};

export default getColor;
