import robot from 'robotjs';

const wt = (key, delay) => {
  return new Promise((res) => {
    robot.keyTap(key);
    setTimeout(() => {
      res();
    }, delay ?? 50);
  });
};

export default wt;
