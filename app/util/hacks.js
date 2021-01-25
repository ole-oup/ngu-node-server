import { button, positions } from './uxpos.js';

const hacks = async (data) => {
  const { hack } = data.cfg;

  // max resources in input
  await button(data, positions.Inputs.InputCustom4);

  await button(data, positions.Hacks.Menu);

  switch (Number(hack)) {
    case 0:
      await button(data, positions.Hacks.Page1.Menu);
      await button(data, positions.Hacks.Page1.ADPlus);
      break;
    case 1:
      await button(data, positions.Hacks.Page1.Menu);
      await button(data, positions.Hacks.Page1.AdvPlus);
      break;
    case 2:
      await button(data, positions.Hacks.Page1.Menu);
      await button(data, positions.Hacks.Page1.TMPlus);
      break;
    case 3:
      await button(data, positions.Hacks.Page1.Menu);
      await button(data, positions.Hacks.Page1.DCPlus);
      break;
    case 4:
      await button(data, positions.Hacks.Page1.Menu);
      await button(data, positions.Hacks.Page1.AugPlus);
      break;
    case 5:
      await button(data, positions.Hacks.Page1.Menu);
      await button(data, positions.Hacks.Page1.ENGUPlus);
      break;
    case 6:
      await button(data, positions.Hacks.Page1.Menu);
      await button(data, positions.Hacks.Page1.MNGUPlus);
      break;
    case 7:
      await button(data, positions.Hacks.Page1.Menu);
      await button(data, positions.Hacks.Page1.BloodPlus);
      break;
    case 8:
      await button(data, positions.Hacks.Page2.Menu);
      await button(data, positions.Hacks.Page2.QPPlus);
      break;
    case 9:
      await button(data, positions.Hacks.Page2.Menu);
      await button(data, positions.Hacks.Page2.DaycarePlus);
      break;
    case 10:
      await button(data, positions.Hacks.Page2.Menu);
      await button(data, positions.Hacks.Page2.EXPPlus);
      break;
    case 11:
      await button(data, positions.Hacks.Page2.Menu);
      await button(data, positions.Hacks.Page2.NumberPlus);
      break;
    case 12:
      await button(data, positions.Hacks.Page2.Menu);
      await button(data, positions.Hacks.Page2.PPPlus);
      break;
    case 13:
      await button(data, positions.Hacks.Page2.Menu);
      await button(data, positions.Hacks.Page2.HackPlus);
      break;
    case 14:
      await button(data, positions.Hacks.Page2.Menu);
      await button(data, positions.Hacks.Page2.WishPlus);
      break;
    default:
      throw 'invalid hack';
  }
};

export default hacks;
