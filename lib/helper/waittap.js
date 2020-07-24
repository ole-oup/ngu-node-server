import robot from 'robotjs';

const waitTap = (key, delay) => {
  return new Promise((res) => {
    robot.keyTap(key);
    setTimeout(() => {
      res();
    }, delay ?? 100);
  });
};

export default waitTap;
