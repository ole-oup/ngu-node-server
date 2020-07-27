import gd from './getDifference.js';

const displayTimer = (start) => {
  // timer data
  const td = { d: gd(start) };

  td.m = Math.floor(td.d / 1000 / 60);
  td.min = td.m < 10 ? `0${td.m}` : String(td.m);
  td.s = Math.floor((td.d / 1000) % 60);
  td.sec = td.s < 10 ? `0${td.s}` : String(td.s);

  return `${td.min}:${td.sec}`;
};

export default displayTimer;
