import cp from './print.js';
import c from './colors.js';
import dt from './displayTimer.js';

const sp = (data) => {
  const spinner = data.spin;

  const timer =
    data.cfg.general.timer === '1'
      ? `${c.bold.yellow}${dt(data)}${c.reset}`
      : '';

  cp(`   ${spinner[0]} ${timer}\r`);

  spinner.push(spinner[0]);
  spinner.shift();

  data.spin = spinner;
};

export default sp;
