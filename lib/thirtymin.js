const { screenReader } = require('./helper/readscreen.js');

const thirtymin = (bounds) => {
  const sr = new screenReader(bounds);
  sr.readScreen();
};

module.exports = (bounds) => {
  thirtymin(bounds);
};
