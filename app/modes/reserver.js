import checkIdleBorder from '../util/checkIdleBorder.js';

const reserver = async (data) => {
  checkIdleBorder(data);
  process.exit();
};

export default reserver;
