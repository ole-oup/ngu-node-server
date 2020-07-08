import screenReader from './helper/readscreen.js';

const thirtyMin = (bounds) => {
  const sr = new screenReader(bounds);
  sr.readScreen();
};

export default thirtyMin;
