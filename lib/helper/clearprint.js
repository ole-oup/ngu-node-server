module.exports = (text, err) => {
  // clear screen
  process.stdout.write('\033c');

  // if error is true -> print error
  if (err) {
    console.error(new Error('\x1b[91m' + text + '\x1b[0m'));
  } else console.log(text);
};
