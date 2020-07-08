import readline from 'readline';

const clearPrint = (text, err) => {
  // clear line
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);

  const result = err
    ? console.error(new Error('\x1b[91m' + text + '\x1b[0m'))
    : process.stdout.write(text);

  return result;
};

export default clearPrint;
