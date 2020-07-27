import robot from 'robotjs';

const waitTap = (key, delay) => {
  return new Promise((res) => {
    robot.keyTap(key);
    setTimeout(() => {
      res();
    }, delay ?? 50);
  });
};

export default waitTap;
