import cp from './print.js';

const spinnerCP = async (text, spinner) => {
  // let spinner = ['|', '/', '-', '\\'];
  const str = `  ${spinner[0]} ${text}\r`;

  spinner.push(spinner[0]);
  spinner.shift();

  cp(str);
  return new Promise((resolve) => {
    setTimeout(resolve, 90);
  });
};

export default spinnerCP;
