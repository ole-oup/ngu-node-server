import robot from 'robotjs';

const waitTap = (key) => {
  return new Promise((res) => {
    robot.keyTap(key);
    setTimeout(() => {
      res();
    }, 100);
  });
};

export default waitTap;
