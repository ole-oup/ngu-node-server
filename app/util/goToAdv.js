import clipboardy from 'clipboardy';
import robot from 'robotjs';

import { button, positions } from './uxpos.js';
import checkIdleBorder from './checkIdleBorder.js';
import getColor from './getColor.js';

const goToAdv = async (data, zone) => {
  await button(data, positions.Adventure.Menu);

  checkIdleBorder(data);

  // todo check beastmode

  if (zone !== 'quest') {
    await button(data, positions.Adventure.EnterITOPOD.Button);
    await button(data, positions.Adventure.EnterITOPOD.Enter);
    await button(data, positions.Adventure.EnterITOPOD.Button);

    const shifter = getColor(data, 550, 389) !== 'ffffff';
    if (shifter) await button(data, positions.Adventure.EnterITOPOD.Shifter);

    await button(data, positions.Adventure.EnterITOPOD.Optimal);
    await button(data, positions.Adventure.EnterITOPOD.StartFloor);

    robot.keyTap('c', 'control');
    const clip = clipboardy.readSync();
    const newFloor = String(Number(clip) - 4);
    clipboardy.writeSync(newFloor);
    robot.keyTap('v', 'control');

    await button(data, positions.Adventure.EnterITOPOD.EndFloor);
    robot.keyTap('v', 'control');

    await button(data, positions.Adventure.EnterITOPOD.Enter);
  } else {
    await button(data, positions.Questing.Menu);
    await button(data, positions.Questing.GoToQuestZone);
  }

  checkIdleBorder(data, 'disable');
  robot.moveMouse(232 * data.res, 481 * data.res); // move to cards for chonk timer
};

export default goToAdv;
