import cp from './print.js';

const progress = (progress, total) => {
  // bar progress
  const l = 20;
  const p = (progress / total) * 20;

  let bar = '[';
  for (let i = 0; i < l; i++) bar += i < p ? '-' : ' ';
  const percent = Math.round((progress / total) * 100);
  bar += `] ${percent > 9 ? '' : ' '}${percent}%`;

  cp(bar);
  return progress + 1;
};

export default progress;
