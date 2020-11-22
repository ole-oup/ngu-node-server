import { spawn } from 'child_process';
import c from './colors.js';

const timestamp = () => {
  const time = new Date().toLocaleTimeString();
  const timestr = `[${time}]`;
  return c.bold.grey + timestr + c.reset;
};

export const restart = () => {
  setTimeout(() => {
    process.on('exit', function () {
      spawn(process.argv.shift(), process.argv, {
        cwd: process.cwd(),
        detached: true,
        stdio: 'inherit',
      });
    });
    process.exit();
  }, 2000);
};

const cp = (data, msg, err) => {
  const ts = timestamp();
  if (err === true) {
    console.log(`${ts} ${c.bold.red}Error${c.reset} ${msg}`);
    const res = { ...data.response('error', 0, msg) };
    data.broadcast(res);
    restart();
  } else console.log(`${ts} ${msg}`);
};

export default cp;
