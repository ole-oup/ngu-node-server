const { screenReader } = require('./helper/readscreen.js');

const thirtyMin = (bounds) => {
  const sr = new screenReader(bounds);
  sr.readScreen();
};

module.exports = (bounds) => {
  thirtyMin(bounds);
};
