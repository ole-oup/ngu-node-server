import fs from 'fs';
import ini from 'ini';
import rl from './question.js';
import screenReader from './readscreen.js';

const printSci = (num) => {
  const base = num.substring(0, 4);

  let c = 0;
  for (let char of num) {
    if (char === '0') c++;
  }

  return `${base[0]}.${base.substring(1)}E+0${c > 9 ? c : '0' + String(c)}`;
};

const calibrate = async (bounds, config, gameWin, terminal, numbers) => {
  terminal.bringToTop();
  const load = await rl('load from config (y/n)? ');
  const l = load.toLowerCase();
  if (l === 'y' || l === 'yes') {
    numbers.e.cap.num = config.calibration.ecp;
    numbers.e.rps.num = config.calibration.eps;
    numbers.m.cap.num = config.calibration.mcp;
    numbers.m.rps.num = config.calibration.mps;

    numbers.e.cap.str = `${printSci(numbers.e.cap.num)}`;
    numbers.e.rps.str = `${printSci(numbers.e.rps.num)}`;
    numbers.m.cap.str = `${printSci(numbers.m.cap.num)}`;
    numbers.m.rps.str = `${printSci(numbers.m.rps.num)}`;
  } else {
    const sr = new screenReader(bounds, gameWin);
    numbers.e = await sr.readScreen('e');
    numbers.m = await sr.readScreen('m');

    terminal.bringToTop();
    const save = await rl('save to config (y/n)? ');
    const s = save.toLowerCase();
    if (s === 'y' || s === 'yes') {
      config.calibration.ecp = numbers.e.cap.num;
      config.calibration.eps = numbers.e.rps.num;
      config.calibration.mcp = numbers.m.cap.num;
      config.calibration.mps = numbers.m.rps.num;
      fs.writeFileSync('../../config.ini', ini.stringify(config));
    }
  }
  return numbers;
};

export default calibrate;
