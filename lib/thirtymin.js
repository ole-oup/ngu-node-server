import screenReader from './helper/readscreen.js';

const thirtyMin = async (bounds, gameWin) => {
  const sr = new screenReader(bounds, gameWin);
  const e = await sr.readScreen('e');
  const m = await sr.readScreen('m');
  // const e = await sr.readEnergy();
  // const m = await sr.readMagic();

  console.log(e);
  console.log(m);
};

export default thirtyMin;
