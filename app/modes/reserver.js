import checkIdleBorder from '../util/checkIdleBorder.js';
import lazyshifter from './lazyshifter.js';

const reserver = async (data) => {
  if (data.cfg.lazystop == 1) await lazyshifter(data);
  else checkIdleBorder(data); // todo wenn das spiel nicht richtig ausgerichtet ist, dann kommt immer q
  process.exit();
};

export default reserver;
// re-server ...
