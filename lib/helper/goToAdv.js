import clipboardy from 'clipboardy';
import robot from 'robotjs';

import { button, positions } from './uxpos.js';
import checkIdleBorder from './checkIdleBorder.js';

const goToAdv = async (data) => {
  await button(data, positions.Adventure.Menu);

  await checkIdleBorder(data);

  // todo check beastmode

  if (data.cfg.general.quest !== '1') {
    await button(data, positions.Adventure.EnterITOPOD.Button);

    const shifter = robot.getPixelColor(data.crd.x + 550, data.crd.y + 389);
    if (shifter === '000000')
      await button(data, positions.Adventure.EnterITOPOD.Shifter);

    await button(data, positions.Adventure.EnterITOPOD.Optimal);
    await button(data, positions.Adventure.EnterITOPOD.StartFloor);

    robot.keyTap('c', 'control');
    const clip = clipboardy.readSync();
    const newFloor = String(Number(clip) - 4);
    clipboardy.writeSync(newFloor);
    robot.keyTap('v', 'control');

    await button(data, positions.Adventure.EnterITOPOD.EndFloor);
    robot.keyTap('v', 'control');

    await checkIdleBorder(data, 'disable');

    await button(data, positions.Adventure.EnterITOPOD.Enter);
  } else {
    await button(data, positions.Questing.Menu);
    await button(data, positions.Questing.GoToQuestZone);

    await checkIdleBorder(data, 'disable');
  }
};

export default goToAdv;
