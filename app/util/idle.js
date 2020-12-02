import robot from 'robotjs';

import wf from './waitFor.js';
import gd from './getDifference.js';
import cp from './print.js';
import checkPit from '../modes/moneypit.js';

// setImmediate() to unblock the event loop and allow communication with clients
function setImmediatePromise() {
  return new Promise((resolve) => {
    setImmediate(() => resolve());
  });
}

robot.setKeyboardDelay(0);

const loop = async (data, killcount, start, duration, wfm, infinite) => {
  const diff = gd(start);

  if (!infinite && diff > duration) return;

  // for sniping
  if (wfm !== null) {
    await wf(data, 'cd');

    if (wfm == 1 || data.cfg.charge2x == 1) {
      const charge = robot.getPixelColor(data.crd.x + 757, data.crd.y + 139);
      if (charge !== '334452') {
        const ultimate = robot.getPixelColor(
          data.crd.x + 858,
          data.crd.y + 105
        );
        if (ultimate !== '7c4e4e') return robot.keyTap('g'); // only return charge when ult is ready too
      }
    }

    if (wfm == 2) {
      const megabuff = robot.getPixelColor(data.crd.x + 664, data.crd.y + 175);
      if (megabuff !== '624a4a') return;
    }
  }

  await wf(data, 'enemy');

  robot.keyTap('w');

  let kc = killcount;
  if (data.mode === 2) {
    kc++;
    const res = {
      ...data.response('idle', 2),
      progress: {
        kills: kc,
        start,
      },
    };
    data.broadcast(res);
  }

  if (data.cfg.moneypit == 1) await checkPit(data);

  await setImmediatePromise();
  if (infinite ?? duration > diff)
    return loop(data, kc, start, duration, wfm, infinite);
};

const idle = async (
  data,
  start = null,
  duration = 60,
  wfm = null,
  infinite = false
) => {
  try {
    await wf(data, 'enemy');

    const idleStart = start ?? new Date();
    await loop(data, 0, idleStart, duration, wfm, infinite);
  } catch (err) {
    cp(data, err, true);
  }
};

export default idle;
