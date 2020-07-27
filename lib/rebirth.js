import robot from 'robotjs';

import toweridle from './toweridle.js';

import distributeRes from './helper/distribute.js';
import rl from './helper/question.js';
import cp from './helper/print.js';

const rebirth = async (data) => {
  try {
    await distributeRes(data);

    await rl('go to itopod (y/n)? ', true);
    toweridle(data);
  } catch (err) {
    cp(err, true);
  }
};

export default rebirth;
