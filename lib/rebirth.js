import distributeRes from './helper/distribute.js';
import cp from './helper/print.js';

const rebirth = async (data) => {
  try {
    await distributeRes(data);
  } catch (err) {
    cp(err, true);
  }
};

export default rebirth;
