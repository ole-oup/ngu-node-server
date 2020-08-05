import displayTimer from './displayTimer.js';
import cp from './print.js';
import gd from './getDifference.js';
import colors from './colors.js';

const sp = (data, color) => {
  const timer = displayTimer(data);

  data.lam = gd(data.lat); // set time since last action

  const c = color ?? 'yellow';

  let delay = `${colors.bold.green}≡`;
  if (data.lam > 75) delay += `${colors.bold.yellow}≡`;
  if (data.lam > 100) delay += `${colors.bold.red}≡`;

  const spinner = data.spin;

  const str = `  ${colors.bold[c]}${spinner[0]}${colors.reset} ${timer} ${delay}${colors.reset}\r`;
  cp(str);
  // console.log(str);

  spinner.push(spinner[0]);
  spinner.shift();

  data.spin = spinner;
  data.lat = new Date(); // set time of last action to now
};

export default sp;
