import { button, positions } from './uxpos.js';

const spells = async (data) => {
  await button(data, positions.BloodMagic.Menu);
  await button(data, positions.BloodMagic.InsideOutPlus);

  // switch (Number(data.cfg.spell)) {
  //   case 1:
  //     await button(data, positions.BloodMagic.TackPlus);
  //     break;
  //   case 2:
  //     await button(data, positions.BloodMagic.CutsPlus);
  //     break;
  //   case 3:
  //     await button(data, positions.BloodMagic.HickeyPlus);
  //     break;
  //   case 4:
  //     await button(data, positions.BloodMagic.BarbPlus);
  //     break;
  //   case 5:
  //     await button(data, positions.BloodMagic.BankPlus);
  //     break;
  //   case 6:
  //     await button(data, positions.BloodMagic.DecapPlus);
  //     break;
  //   case 7:
  //     await button(data, positions.BloodMagic.ChipperPlus);
  //     break;
  //   case 8:
  //     await button(data, positions.BloodMagic.InsideOutPlus);
  //     break;

  //   default:
  //     throw 'Invalid Spell';
  // }
};

export default spells;
