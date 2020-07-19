import rl from './question.js';
import cp from './print.js';
// import fs from 'fs';
// import ini from 'ini';

const splitString = (str) => {
  const n = {
    base: str.substring(0, 4),
    exp: Number(str.substring(4)),
  };

  const number = BigInt((Number(n.base) / 1000) * 10 ** n.exp);
  const string = `${n.base[0]}.${n.base.substring(1, 4)}E+0${n.exp}`;

  return { num: number, str: string };
};

const routeInput = (a) => {
  const strings = {
    ecp: splitString(a[0]),
    eps: splitString(a[1]),
    mcp: splitString(a[2]),
    mps: splitString(a[3]),
  };

  const n = {
    e: { cap: strings.ecp, rps: strings.eps },
    m: { cap: strings.mcp, rps: strings.mps },
  };

  return n;
};

const calibrate = async (config, terminal) => {
  try {
    console.clear();
    terminal.bringToTop();

    const load = await rl('load from config (y/n)? ');
    const loadstr = load.toLowerCase();
    const cfg = loadstr === 'y' || loadstr === 'yes' ? true : false;

    let input = new Array(4);

    // on input only enter 6 digits (just the numbers, no '.', 'E', or '+')
    input[0] = cfg ? config.cal.ecp : await rl('enter e cap: ');
    input[1] = cfg ? config.cal.eps : await rl('enter e rps: ');
    input[2] = cfg ? config.cal.mcp : await rl('enter m cap: ');
    input[3] = cfg ? config.cal.mps : await rl('enter m rps: ');

    input.forEach((e) => {
      if (e.length !== 6) throw "Calibration input-string isn't 6 chars";
    });

    const numbers = routeInput(input);

    console.clear();
    console.log('ecp = ' + numbers.e.cap.str);
    console.log('eps = ' + numbers.e.rps.str);
    console.log('mcp = ' + numbers.m.cap.str);
    console.log('mps = ' + numbers.m.rps.str);

    // const save = await rl('save to config (y/n)? ');

    // if (save.toLowerCase() === 'y' || save.toLowerCase() === 'yes') {
    //   config.cal.ecp = input[0];
    //   config.cal.eps = input[1];
    //   config.cal.mcp = input[2];
    //   config.cal.mps = input[3];

    // erst file deleten, dann in config.ini schreiben?

    //   fs.writeFileSync('../../config.ini', ini.stringify(config), {
    //     section: 'test',
    //   });
    // }

    // calculate time to max resources
    const toMax = {
      e: Number(numbers.e.cap.num / numbers.e.rps.num) * 1000,
      m: Number(numbers.m.cap.num / numbers.m.rps.num) * 1000,
    };

    const result = toMax.e < toMax.m ? toMax.m : toMax.e;

    const cont = await rl('continue (y/n)? ');

    // return time until resources are max in ms
    return cont.toLowerCase() === 'y' || cont.toLowerCase() === 'yes'
      ? result
      : calibrate(config, terminal);
  } catch (err) {
    cp(err, true);
  }
};

export default calibrate;
