import robot from 'robotjs';

import { button, positions } from '../util/uxpos.js';

const lazyshifter = async (data, activeWindow, initWin) => {
  let currWin = activeWindow();

  data.win.bringToTop();
  while (currWin.getTitle() !== 'NGU Idle') {
    currWin = activeWindow();
  }
  await button(data, positions.Adventure.Menu);
  await button(data, positions.Adventure.EnterITOPOD.Button);

  const shifter = robot.getPixelColor(data.crd.x + 550, data.crd.y + 389);
  if (shifter !== '000000')
    await button(data, positions.Adventure.EnterITOPOD.Shifter);

  await button(data, positions.Adventure.EnterITOPOD.Enter);

  initWin.bringToTop();
};

export default lazyshifter;
