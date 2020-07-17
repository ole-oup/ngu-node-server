import rl from './helper/question.js';
// import cp from './helper/print.js';

const splitString = (str) => {
  const n = {
    base: str.substring(0, 4),
    exp: Number(str.substring(4)),
  };

  const number = (Number(n.base) / 1000) * Math.pow(10, n.exp);
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

  const numbers = routeInput(input);

  console.clear();
  console.log('ecp = ' + numbers.e.cap.str);
  console.log('eps = ' + numbers.e.rps.str);
  console.log('mcp = ' + numbers.m.cap.str);
  console.log('mps = ' + numbers.m.rps.str);
};

const thirtyMin = async (bounds, config, gameWin, terminal) => {
  calibrate(config, terminal);

  /*
    fight boss > nuke
      warte in adventure bis 'killed bla' msg weg ist
    adventure > rechtsklick pfeil
    aug > 
    blood magic > cap all > cast > sleep kurz > gold
    TM: 10%e, 30%m
  */
};

export default thirtyMin;
