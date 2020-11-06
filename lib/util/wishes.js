import click from './click.js';
import { positions, button } from './uxpos.js';

const wishes = async (data) => {
  const wishes = {};

  await button(data, positions.Wishes.Menu);

  // format for wish pos: 'xx' (ex. 12 for row 1 column 2)

  wishes.one = data.cfg.wishes[0];
  wishes.two = data.cfg.wishes[1];
  wishes.tri = data.cfg.wishes[2];
  wishes.foa = data.cfg.wishes[3];

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
    tri: {
      x: 350 - 92 + wishes.tri[1] * 92,
      y: 350 - 106 + wishes.tri[0] * 106,
    },
    foa: {
      x: 350 - 92 + wishes.foa[1] * 92,
      y: 350 - 106 + wishes.foa[0] * 106,
    },
  };

  // set e
  await button(data, positions.Inputs.EIdleQuarter);

  await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
  await button(data, positions.Wishes.Eplus);

  await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
  await button(data, positions.Wishes.Eplus);

  await click(data.crd, wishes.crd.tri.x, wishes.crd.tri.y); // wish 3
  await button(data, positions.Wishes.Eplus);

  await button(data, positions.Inputs.InputCustom4);
  await click(data.crd, wishes.crd.foa.x, wishes.crd.foa.y); // wish 4
  await button(data, positions.Wishes.Eplus);

  // set m
  await button(data, positions.Inputs.MIdleQuarter);

  await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
  await button(data, positions.Wishes.Mplus);

  await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
  await button(data, positions.Wishes.Mplus);

  await click(data.crd, wishes.crd.tri.x, wishes.crd.tri.y); // wish 3
  await button(data, positions.Wishes.Mplus);

  await button(data, positions.Inputs.InputCustom4);
  await click(data.crd, wishes.crd.foa.x, wishes.crd.foa.y); // wish 4
  await button(data, positions.Wishes.Mplus);

  // r3
  await button(data, positions.Inputs.R3CapCustom1);

  await click(data.crd, wishes.crd.one.x, wishes.crd.one.y); // wish 1
  await button(data, positions.Wishes.Rplus);

  await click(data.crd, wishes.crd.two.x, wishes.crd.two.y); // wish 2
  await button(data, positions.Wishes.Rplus);

  await click(data.crd, wishes.crd.tri.x, wishes.crd.tri.y); // wish 3
  await button(data, positions.Wishes.Rplus);

  await click(data.crd, wishes.crd.foa.x, wishes.crd.foa.y); // wish 4
  await button(data, positions.Wishes.Rplus);
};

export default wishes;
