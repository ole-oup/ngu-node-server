import dt from './displayTimer.js';
import cp from './print.js';
import gd from './getDifference.js';
import colors from './colors.js';

const sp = (data, color, stopwatch) => {
  const timer = dt(data);

  data.lam = gd(data.lat); // set time since last action

  const c = color ?? 'yellow';

  if (stopwatch === 'stop') {
    data.swd = gd(data.swt);
    data.swt = new Date(); // set stopwatch "round"
  }

  const sw = data.swd ?? '';

  const delay = {
    g: `${colors.bold.green}≡`,
    y: data.lam > 66 ? `${colors.bold.yellow}≡` : ' ',
    r: data.lam > 100 ? `${colors.bold.red}≡` : ' ',
  };

  delay.str = `${delay.g}${delay.y}${delay.r}${colors.reset}`;

  const spinner = data.spin;
  const spin = `${colors.bold[c]}${spinner[0]}${colors.reset}`;

  const swstr = `${colors.bold.grey}${sw}${colors.reset}`;

  const str = `  ${spin} ${timer} ${delay.str} ${swstr}\r`;
  cp(str);
  // console.log(str);

  spinner.push(spinner[0]);
  spinner.shift();

  data.spin = spinner;
  data.lat = new Date(); // set time of last action to now
};

export default sp;
