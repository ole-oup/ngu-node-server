import dt from './displayTimer.js';
import cp from './print.js';
import gd from './getDifference.js';
import c from './colors.js';

const latBar = (data) => {
  const d = {
    g: c.bold.green,
    y: data.lam > 66 ? c.bold.yellow : c.bold.grey,
    r: data.lam > 100 ? c.bold.red : c.bold.grey,
  };

  d.str = `${d.g}≡${d.y}≡${d.r}≡${c.reset}`;

  let string = '';

  const g = c.bold.green;
  const y = c.bold.yellow;
  const r = c.bold.red;
  const b = c.bold.grey;

  for (let i = 0; i < 19; i++) {
    if (i < 6) string += data.lam > i * 10 ? g : b;
    if (i >= 6 && i < 15) string += data.lam > i * 10 ? y : b;
    if (i >= 15) string += data.lam > i * 10 ? r : b;

    string += '≡';
  }

  string += c.reset;

  return string;
};

const sp = (data, color, stopwatch) => {
  const timer = dt(data);

  data.lam = gd(data.lat); // set time since last action

  const col = color ?? 'yellow';

  if (stopwatch === 'stop') {
    data.swd = gd(data.swt);
    data.swt = new Date(); // set stopwatch "round"
  }

  const sw = data.swd ?? '';

  const latency = latBar(data);

  const spinner = data.spin;
  const spin = `${c.bold[col]}${spinner[0]}${c.reset}`;

  const swstr = `${c.bold.grey}${sw}${c.reset}`;

  const str = `  ${spin} ${timer} ${latency} ${swstr}\r`;
  cp(str);
  // console.log(str);

  spinner.push(spinner[0]);
  spinner.shift();

  data.spin = spinner;
  data.lat = new Date(); // set time of last action to now
};

export default sp;
