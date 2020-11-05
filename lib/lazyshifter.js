import robot from 'robotjs';

import { button, positions } from './helper/uxpos.js';

const lazyshifter = async (data, getActiveWindow) => {
  let currWin = getActiveWindow();
  let focusedWin = currWin;

  data.win.bringToTop();
  while (currWin.getTitle() !== 'NGU Idle') {
    currWin = getActiveWindow();
  }
  await button(data, positions.Adventure.Menu);
  await button(data, positions.Adventure.EnterITOPOD.Button);

  const shifter = robot.getPixelColor(data.crd.x + 550, data.crd.y + 389);
  if (shifter !== '000000')
    await button(data, positions.Adventure.EnterITOPOD.Shifter);

  await button(data, positions.Adventure.EnterITOPOD.Enter);

  focusedWin.bringToTop();
};

export default lazyshifter;
