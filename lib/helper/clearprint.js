const readline = require('readline');

const clearPrint = (text, err) => {
  // clear line
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);

  // if error is true -> return error
  if (err) {
    return console.error(new Error('\x1b[91m' + text + '\x1b[0m'));
  }

  // else return output
  return process.stdout.write(text);
  // console.log(text);
};

module.exports = (text, err) => {
  clearPrint(text, err);
};
