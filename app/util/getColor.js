import robot from 'robotjs';

const getColor = (data, x, y) => {
  return robot.getPixelColor(
    data.crd.x + x * data.res,
    data.crd.y + y * data.res
  );
};

export default getColor;
