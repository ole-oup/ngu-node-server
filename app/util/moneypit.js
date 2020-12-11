import nwm from 'node-window-manager';

import checkIdleBorder from './checkIdleBorder.js';

import getColor from './getColor.js';
import goToAdv from './goToAdv.js';
import { button, positions } from './uxpos.js';

const { windowManager } = nwm;

const checkPit = async (data) => {
  const pitLight = getColor(data, 188, 76);
  if (pitLight !== 'ffffff') {
    let currWin = windowManager.getActiveWindow();
    if (currWin.getTitle() !== 'NGU Idle') {
      data.win.bringToTop();
      checkIdleBorder(data);
      currWin.bringToTop();
      throw 'Game lost focus';
    }

    await button(data, positions.MoneyPit.Menu);
    if (pitLight === 'ffd23b') {
      await button(data, positions.MoneyPit.DailySpin);
      await button(data, positions.MoneyPit.NoBS);
    } else {
      await button(data, positions.MoneyPit.FeedMe);
      await button(data, positions.MoneyPit.Yeah);
    }
    await goToAdv(data);
  }
};

export default checkPit;
