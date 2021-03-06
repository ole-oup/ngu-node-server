import robot from 'robotjs';

import wf from './waitFor.js';
import gd from './getDifference.js';
import cp from './print.js';
import checkPit from './moneypit.js';
import getColor from './getColor.js';

robot.setKeyboardDelay(0);

const loop = async (data, killcount, start, duration, wfm, infinite) => {
  const diff = gd(start);

  if (!infinite && diff > duration) return;

  // for sniping
  if (wfm !== null) {
    await wf(data, 'cd');

    if (data.cfg.parry2x == 1) {
      const parry = getColor(data, 644, 100) !== '7c4e4e';
      const parryBorder = getColor(data, 631, 86) === 'ffeb04';
      if (parry && !parryBorder) robot.keyTap('r');
    }

    if (wfm == 1) {
      const charge = getColor(data, 757, 139) !== '334452';
      if (charge) {
        const ultimate = getColor(data, 858, 105) !== '7c4e4e';
        if (ultimate) return robot.keyTap('g'); // only return charge when ult is ready too
      }
    }

    if (wfm == 2) {
      const megabuff = getColor(data, 664, 175) !== '624a4a';
      if (megabuff) return;
    }
  }

  await wf(data, data.cfg.slowcd == 0 ? 'enemy' : 'cd');

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

  // wenn cd und res zu weit auseinander sind dann läuft das loop doppelt?
  // kommt ca jede stunde bei wenig cd und respawn? slowcd anpassen?
  let isDead = getColor(data, 736, 415) === 'ffffff';
  if (!isDead) console.log('enemy != ded');

  // await setImmediatePromise();
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
