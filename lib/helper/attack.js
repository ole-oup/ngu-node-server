import robot from 'robotjs';
import nvm from 'node-window-manager';

import cp from './print.js';
import gd from './getDifference.js';
import displayTimer from './displayTimer.js';

const { windowManager } = nvm;

robot.setKeyboardDelay(0);

const blob = ['|', '/', '-', '\\'];

const blub = (data, color) => {
  // 32m = green
  // 33m = yellow
  // 31m = red

  // 34m = blue
  // 35m = magenta
  // 36m = cyan

  const timer = displayTimer(data);

  data.lam = gd(data.lat); // set time since last action
  let c2 = data.lam > 100 ? '31m' : '32m';

  const str = `  \x1b[${color}${blob[0]}\x1b[0m ${timer} \x1b[${c2}${data.lam}\x1b[0m\r`;
  cp(str);
  // console.log(str);

  blob.push(blob[0]);
  blob.shift();
  data.lat = new Date(); // set time of last action to now
};

const findMove = async (data) => {
  let hex = robot.getPixelColor(data.crd.x + 736, data.crd.y + 415); // enemy spawn
  blub(data, '0m');
  while (hex === 'ffffff') {
    hex = robot.getPixelColor(data.crd.x + 736, data.crd.y + 415); // enemy spawn
    blub(data, '35m');

    // if game loses focus -> error
    const currWin = windowManager.getActiveWindow();
    if (currWin.getTitle() !== 'NGU Idle') {
      data.win.bringToTop();
      robot.keyTap('q');
      currWin.bringToTop();
      throw 'Game lost focus';
    }

    const g = robot.getPixelColor(data.crd.x + 757, data.crd.y + 139);
    if (g === '6687a3') robot.keyTap('g');
    blub(data, '33m');
  }

  const v = robot.getPixelColor(data.crd.x + 683, data.crd.y + 175);
  if (v === 'c39494') return robot.keyTap('v');
  blub(data, '36m');

  const y = robot.getPixelColor(data.crd.x + 893, data.crd.y + 93);
  if (y !== '7c4e4e') return robot.keyTap('y');
  blub(data, '36m');

  const t = robot.getPixelColor(data.crd.x + 787, data.crd.y + 93);
  if (t !== '7c4e4e') return robot.keyTap('t');
  blub(data, '36m');

  const e = robot.getPixelColor(data.crd.x + 578, data.crd.y + 93);
  if (e !== '7c4e4e') return robot.keyTap('e');
  blub(data, '36m');

  const w = robot.getPixelColor(data.crd.x + 474, data.crd.y + 93);
  if (w !== '7c4e4e') return robot.keyTap('w');
  blub(data, '36m');
};

const atkloop = async (data) => {
  await findMove(data);
  await atkloop(data);
};

const attack = async (data) => {
  try {
    data.start = new Date();
    await atkloop(data);
  } catch (err) {
    cp(err, true);
  }
};

export default attack;
