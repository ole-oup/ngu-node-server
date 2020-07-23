import robot from 'robotjs';

import toweridle from './toweridle.js';

import distributeRes from './helper/distribute.js';
import rl from './helper/question.js';
import stn from './helper/strToNum.js';
import cp from './helper/print.js';
import click from './helper/click.js';

const makeWishStr = (str) => {
  const bnum = Number(str.substring(0, 4));
  const subk = bnum / 3 > 999 ? true : false;
  const base = subk ? Math.floor(bnum / 3) : Math.floor(bnum / 0.3);
  const expo = subk ? Number(str.substring(4)) : Number(str.substring(4)) - 1;

  return `${base}${expo}`;
};

const calcRest = async () => {
  const rest = {};

  rest.e = await rl('rest e: ');
  rest.m = await rl('rest m: ');

  rest.estr = makeWishStr(rest.e);
  rest.mstr = makeWishStr(rest.m);

  rest.ewish = stn(rest.estr);
  rest.mwish = stn(rest.mstr);

  return rest;
};

const rebirth = async (data) => {
  try {
    await distributeRes(data);

    if (data.cfg.rebirth.wish === '1') {
      await click(data.crd, 233, 455); // wishes

      data.terminal.bringToTop();
      // todo % idle kaufen und 33%  machen....
      const r = await calcRest();

      await rl('set e (y/n)? ', true);
      data.win.bringToTop();
      await click(data.crd, 443, 20); // num input
      robot.typeString(r.ewish.str);

      await rl('set m (y/n)? ', true);
      data.win.bringToTop();
      await click(data.crd, 443, 20); // num input
      robot.typeString(r.mwish.str);
    }

    // todo rest von wish in time machine

    await rl('go to itopod (y/n)? ', true);
    toweridle(data);
  } catch (err) {
    cp(err, true);
  }
};

export default rebirth;
