import { activeWindow } from '../app-index.js';
import checkIdleBorder from '../util/checkIdleBorder.js';
import getColor from '../util/getColor.js';

import { button, positions } from '../util/uxpos.js';
import { setImmediatePromise } from '../util/waitFor.js';

const lazyshifter = async (data, initWin = null) => {
  let currWin = activeWindow();

  data.win.bringToTop();
  while (currWin.getTitle() !== 'NGU Idle') {
    currWin = activeWindow();
    await setImmediatePromise();
  }
  await button(data, positions.Adventure.Menu);
  await button(data, positions.Adventure.EnterITOPOD.Button);

  checkIdleBorder(data);

  const shifter = getColor(data, 550, 389) !== '000000';
  if (shifter) await button(data, positions.Adventure.EnterITOPOD.Shifter);

  await button(data, positions.Adventure.EnterITOPOD.Enter);

  if (initWin != null) initWin.bringToTop();
};

export default lazyshifter;
