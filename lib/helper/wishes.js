import rl from './question.js';
import progress from './progress.js';
import click from './click.js';
import { positions, button } from './uxpos.js';

const wishes = async (data) => {
  const { wishrepeat } = data.cfg.rebirth;

  // steps and progress
  let s = (wishrepeat + 1) * 4 * 2 + 6;
  let p = 0;

  const wishes = {};

  await button(data, positions.Wishes.Menu);

  // format for wish pos: 'xx' (ex. 12 for row 1 column 2)
  if (data.cfg.rebirth.fixwish === '1') {
    wishes.one = data.cfg.rebirth.wishes.substring(1, 3);
    wishes.two = data.cfg.rebirth.wishes.substring(4, 6);
    wishes.thr = data.cfg.rebirth.wishes.substring(7, 9);
  } else {
    data.terminal.bringToTop();
    console.log(''); // new line

    // enter wish pos
    wishes.one = await rl('wish 1 position (row, column)? ');
    wishes.two = await rl('wish 2 position (row, column)? ');
    wishes.thr = await rl('wish 3 position (row, column)? ');
  }

  // 350 350 wish, 92 right, 106 down

  wishes.crd = {
    one: {
      x: 350 - 92 + wishes.one[1] * 92,
      y: 350 - 106 + wishes.one[0] * 106,
    },
    two: {
      x: 350 - 92 + wishes.two[1] * 92,
      y: 350 - 106 + wishes.two[0] * 106,
    },
    thr: {
      x: 350 - 92 + wishes.thr[1] * 92,
      y: 350 - 106 + wishes.thr[0] * 106,
    },
  };

  data.win.bringToTop();

  p = progress(p, s);

  // set e, repeat
  for (let i = 0; i <= wishrepeat; i++) {
    await button(data, positions.Inputs.EIdleCustom);
    p = progress(p, s);

    await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
    await button(data, positions.Wishes.Eplus);
    p = progress(p, s);

    await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
    await button(data, positions.Wishes.Eplus);
    p = progress(p, s);

    await click(data.crd, wishes.crd.thr.x, wishes.crd.thr.y); // wish 3
    await button(data, positions.Wishes.Eplus);
    p = progress(p, s);
  }

  await button(data, positions.Wishes.Eplus);
  p = progress(p, s);

  // set m, repeat
  for (let i = 0; i <= wishrepeat; i++) {
    await button(data, positions.Inputs.MIdleCustom);
    p = progress(p, s);

    await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
    await button(data, positions.Wishes.Mplus);
    p = progress(p, s);

    await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
    await button(data, positions.Wishes.Mplus);
    p = progress(p, s);

    await click(data.crd, wishes.crd.thr.x, wishes.crd.thr.y); // wish 3
    await button(data, positions.Wishes.Mplus);
    p = progress(p, s);
  }

  await button(data, positions.Wishes.Mplus);
  p = progress(p, s);

  // r3
  if (data.cfg.rebirth.hackday === '1')
    await button(data, positions.Inputs.R3CapCustom1);
  else await button(data, positions.Inputs.R3IdleQuarter);

  p = progress(p, s);

  await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
  await button(data, positions.Wishes.Rplus);
  p = progress(p, s);

  await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
  await button(data, positions.Wishes.Rplus);
  p = progress(p, s);

  await click(data.crd, wishes.crd.thr.x, wishes.crd.thr.y); // wish 3
  await button(data, positions.Wishes.Rplus);

  p = progress(p, s);
};

export default wishes;
