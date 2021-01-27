import checkIdleBorder from '../util/checkIdleBorder.js';

const reserver = async (data) => {
  checkIdleBorder(data); // todo wenn das spiel nicht richtig ausgerichtet ist, dann kommt immer q
  process.exit();
};

export default reserver;
// re-server ...
