import getColor from '../util/getColor.js';

import { button, positions } from '../util/uxpos.js';
import { setImmediatePromise } from '../util/waitFor.js';

const lazyshifter = async (data, activeWindow, initWin) => {
  let currWin = activeWindow();

  data.win.bringToTop();
  while (currWin.getTitle() !== 'NGU Idle') {
    currWin = activeWindow();
    await setImmediatePromise();
  }
  await button(data, positions.Adventure.Menu);
  await button(data, positions.Adventure.EnterITOPOD.Button);

  const shifter = getColor(data, 550, 389);
  if (shifter !== '000000')
    await button(data, positions.Adventure.EnterITOPOD.Shifter);

  await button(data, positions.Adventure.EnterITOPOD.Enter);

  initWin.bringToTop();
};

export default lazyshifter;
