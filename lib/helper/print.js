import readline from 'readline';

const cp = (text, err) => {
  if (err === true) {
    const date = new Date();
    const datestr = ` (${date.toLocaleString()})`;
    console.log(''); // new line
    console.error(new Error(`\x1b[91m${text}\x1b[90m${datestr}\x1b[0m`));
    process.kill(process.pid);
  }

  // clear line
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);

  process.stdout.write(text);
};

export default cp;
