import checkIdleBorder from '../util/checkIdleBorder.js';
import lazyshifter from './lazyshifter.js';

const reserver = async (data) => {
  if (data.cfg.lazystop == 1) await lazyshifter(data);
  else checkIdleBorder(data);
  process.exit();
};

export default reserver;
// re-server ...
