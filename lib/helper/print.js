import c from './colors.js';

const timestamp = () => {
  const time = new Date().toLocaleTimeString();
  const timestr = `[${time}]`;

  return c.bold.grey + timestr + c.reset;
};

const cp = (msg, err) => {
  const ts = timestamp();
  if (err === true) {
    console.log(`${ts} ${c.bold.red}Error${c.reset}: ${msg}`);
  } else console.log(`${ts} ${msg}`);
};

export default cp;
