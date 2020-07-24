// in ms
const getDiff = (start) => {
  const now = new Date();
  return now.getTime() - start.getTime();
};

export default getDiff;
