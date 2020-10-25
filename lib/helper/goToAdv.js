import clipboardy from 'clipboardy';
import robot from 'robotjs';

import wt from './waitTap.js';
import { button, positions } from './uxpos.js';

const goToAdv = async (data) => {
  await button(data, positions.Adventure.Menu);

  const idleBorder = robot.getPixelColor(data.crd.x + 315, data.crd.y + 87);
  if (idleBorder !== 'ffeb04') await wt('q');

  // todo check beastmode

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

  robot.keyTap('q');

  await button(data, positions.Adventure.EnterITOPOD.Enter);
};

export default goToAdv;
