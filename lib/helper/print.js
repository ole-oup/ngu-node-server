import readline from 'readline';

const clearPrint = (text, err) => {
  // clear line
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);

  if (err === true) {
    const date = new Date();
    const datestr = ` (${date.toLocaleString()})`;
    console.error(
      new Error('\x1b[91m' + text + '\x1b[90m' + datestr + '\x1b[0m')
    );
    process.kill(process.pid);
  }

  process.stdout.write(text);
};

export default clearPrint;
