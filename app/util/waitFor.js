import gd from './getDifference.js';
import getColor from './getColor.js';

// setImmediate() to unblock the event loop and allow communication with clients
export const setImmediatePromise = () => {
  return new Promise((resolve) => {
    setImmediate(() => resolve());
  });
};

const wf = async (data, trigger, fullhp) => {
  const timer = { start: new Date(), end: 3000, timeout: false }; // 3 second timeout
  let x = null;
  let y = null;
  let color = 'ffffff';
  switch (trigger) {
    case 'cd':
      x = 472;
      y = 109;
      color = '7c4e4e';
      break;
    case 'enemy':
      x = 736;
      y = 415;
      break;
    case 'hp':
      x = 514;
      y = 411;
      break;
    default:
      throw 'WaitFor-Trigger Error';
  }

  let onoff = true;
  const end = fullhp === true ? 10000 : timer.end;

  while (onoff) {
    const hex = getColor(data, x, y);

    const diff = end - gd(timer.start);
    timer.timeout = diff < 0;

    if (hex !== color || timer.timeout) {
      onoff = false;
    }

    await setImmediatePromise();
  }

  return new Promise((resolve) => {
    resolve(timer.timeout);
  });
};

export default wf;
