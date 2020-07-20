import cp from './print.js';

const strToNum = (str) => {
  const string = {
    base: str.substring(0, 4),
    exp: str.substring(4),
  };

  const b = Number(string.base);
  const e = Number(string.exp);

  const result = {
    num: BigInt((b / 1000) * 10 ** e),
    str: `${string.base[0]}.${string.base.substring(1, 4)}E+0${string.exp}`,
  };

  return str.length !== 6 ? cp('string conversion error', true) : result;
};

export default strToNum;
