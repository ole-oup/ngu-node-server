// in ms
const gd = (start) => {
  const now = new Date();
  return now.getTime() - start.getTime();
};

export default gd;
