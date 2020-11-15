import robot from 'robotjs';

const db = async (data) => {
  setTimeout(() => {
    const mp = robot.getMousePos();
    const xxx = mp.x - data.crd.x;
    const yyy = mp.y - data.crd.y;
    console.log(mp);
    console.log(`${xxx}, ${yyy}`);
    console.log(robot.getPixelColor(mp.x, mp.y));
  }, 3000);
};

export default db;
