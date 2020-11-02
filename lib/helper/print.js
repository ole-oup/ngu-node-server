import readline from 'readline';
import c from './colors.js';

const cp = (text, err) => {
  if (err === true) {
    const date = new Date();
    const datestr = ` (${date.toLocaleString()})`;
    console.log(''); // new line
    console.error(`${c.bold.red}${text}${c.bold.grey}${datestr}${c.reset}`);
  }

  // clear line
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);

  process.stdout.write(text);
};

export default cp;
