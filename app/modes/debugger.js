import robot from 'robotjs';

const db = async () => {
  const mp = robot.getMousePos();
  console.log(`${mp.x} ${mp.y}`);
  console.log(robot.getPixelColor(mp.x, mp.y));
};

export default db;
