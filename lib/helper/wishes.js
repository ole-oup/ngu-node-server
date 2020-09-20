import rl from './question.js';
import click from './click.js';
import { positions, button } from './uxpos.js';

const wishes = async (data) => {
  const wishes = {};

  await button(data, positions.Wishes.Menu);

  // format for wish pos: 'xx' (ex. 12 for row 1 column 2)
  if (data.cfg.rebirth.fixwish === '1') {
    wishes.one = data.cfg.rebirth.wishes.substring(1, 3);
    wishes.two = data.cfg.rebirth.wishes.substring(4, 6);
    wishes.thr = data.cfg.rebirth.wishes.substring(7, 9);
    wishes.fou = data.cfg.rebirth.wishes.substring(10, 12);
  } else {
    data.terminal.bringToTop();
    console.log(''); // new line

    // enter wish pos
    wishes.one = await rl('wish 1? ');
    wishes.two = await rl('wish 2? ');
    wishes.thr = await rl('wish 3? ');
    wishes.fou = await rl('wish 4? ');
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
    fou: {
      x: 350 - 92 + wishes.fou[1] * 92,
      y: 350 - 106 + wishes.fou[0] * 106,
    },
  };

  data.win.bringToTop();

  // set e
  await button(data, positions.Inputs.EIdleQuarter);

  await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
  await button(data, positions.Wishes.Eplus);

  await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
  await button(data, positions.Wishes.Eplus);

  await click(data.crd, wishes.crd.thr.x, wishes.crd.thr.y); // wish 3
  await button(data, positions.Wishes.Eplus);

  await click(data.crd, wishes.crd.fou.x, wishes.crd.fou.y); // wish 4
  await button(data, positions.Wishes.Eplus);

  // set m
  await button(data, positions.Inputs.MIdleQuarter);

  await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
  await button(data, positions.Wishes.Mplus);

  await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
  await button(data, positions.Wishes.Mplus);

  await click(data.crd, wishes.crd.thr.x, wishes.crd.thr.y); // wish 3
  await button(data, positions.Wishes.Mplus);

  await click(data.crd, wishes.crd.fou.x, wishes.crd.fou.y); // wish 4
  await button(data, positions.Wishes.Mplus);

  // r3
  await button(data, positions.Inputs.R3CapCustom1);

  await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
  await button(data, positions.Wishes.Rplus);

  await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
  await button(data, positions.Wishes.Rplus);

  await click(data.crd, wishes.crd.thr.x, wishes.crd.thr.y); // wish 3
  await button(data, positions.Wishes.Rplus);

  await click(data.crd, wishes.crd.fou.x, wishes.crd.fou.y); // wish 4
  await button(data, positions.Wishes.Rplus);
};

export default wishes;
