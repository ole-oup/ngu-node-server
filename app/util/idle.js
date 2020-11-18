import robot from 'robotjs';

import wf from './waitFor.js';
import gd from './getDifference.js';
import cp from './print.js';

// setImmediate() to unblock the event loop and allow communication with clients
function setImmediatePromise() {
  return new Promise((resolve) => {
    setImmediate(() => resolve());
  });
}

const loop = async (data, killcount) => {
  const diff = gd(data.start);

  if (!data.inf && diff > data.dur) return;

  // for sniping
  if (data.wfm) {
    await wf(data, 'cd');

    if (data.wfm === 1) {
      const charge = robot.getPixelColor(data.crd.x + 757, data.crd.y + 139);
      if (charge !== '334452') {
        const ultimate = robot.getPixelColor(
          data.crd.x + 858,
          data.crd.y + 105
        );
        if (ultimate !== '7c4e4e') return robot.keyTap('g'); // only return charge when ult is ready too
      }
    }

    if (data.wfm === 2) {
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
        start: data.start,
      },
    };
    data.broadcast(res);
  }

  await setImmediatePromise();
  if (data.inf ?? data.dur > diff) return loop(data, kc);
};

const idle = async (data, start = null) => {
  try {
    data.start = start ?? new Date();
    robot.setKeyboardDelay(0);
    await wf(data, 'enemy');

    await loop(data, 0);
  } catch (err) {
    cp(err, true);
  }
};

export default idle;
