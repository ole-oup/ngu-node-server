const readline = require('readline');

const clearPrint = (text, err) => {
  // clear line
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);

  // if error is true -> print error
  if (err) {
    console.error(new Error('\x1b[91m' + text + '\x1b[0m'));
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        process.stdout.write(text);
        resolve();
      }, 50);
    });
    // console.log(text);
  }
};

module.exports = (text, err) => {
  clearPrint(text, err);
};
