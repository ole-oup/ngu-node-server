import gd from './getDifference.js';

const displayTimer = (data) => {
  // timer data
  const td = { d: gd(data.start) };

  td.m = Math.floor(td.d / 1000 / 60);
  td.min = td.m < 10 ? `0${td.m}` : String(td.m);
  td.s = Math.floor((td.d / 1000) % 60);
  td.sec = td.s < 10 ? `0${td.s}` : String(td.s);

  data.tdd = td.d;

  return `${td.min}:${td.sec}`;
};

export default displayTimer;
