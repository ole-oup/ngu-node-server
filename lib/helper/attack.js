import robot from 'robotjs';
import nvm from 'node-window-manager';

import cp from './print.js';
import sp from './spinner.js';
import wt from './waitTap.js';
// todo button() statt click
import click from './click.js';
import gd from './getDifference.js';

const { windowManager } = nvm;

robot.setKeyboardDelay(0);

const fastcd = {
  v: 30 * 1000,
  y: 10 * 1000,
  t: 5 * 1000,
  e: 2 * 1000,
};

const slowcd = {
  v: 50 * 1000,
  y: 15 * 1000,
  t: 8 * 1000,
  e: 4 * 1000,
};

const atk = {
  v: '7c4e4e',
  y: '7c4e4e',
  t: '7c4e4e',
  e: '7c4e4e',
  tv: new Date(1999),
  ty: new Date(1999),
  tt: new Date(1999),
  te: new Date(1999),
};

const findMove = async (data, cd) => {
  // if game loses focus -> error
  const currWin = windowManager.getActiveWindow();
  if (currWin.getTitle() !== 'NGU Idle') {
    data.win.bringToTop();
    robot.keyTap('q');
    currWin.bringToTop();
    throw 'Game lost focus';
  }

  // enemy spawn (hp text in bar, only ffffff if no enemy)
  let hp = robot.getPixelColor(data.crd.x + 876, data.crd.y + 414);
  sp(data);
  while (hp === 'ffffff') {
    hp = robot.getPixelColor(data.crd.x + 876, data.crd.y + 414); // enemy spawn
    sp(data, 'magenta');

    const g = robot.getPixelColor(data.crd.x + 757, data.crd.y + 139);
    sp(data, 'magenta');
    if (g === '6687a3') robot.keyTap('g');

    // todo hier b
    const x = robot.getPixelColor(data.crd.x + 474, data.crd.y + 165);
    sp(data, 'magenta');
    if (x === 'c39494') robot.keyTap('x');
  }

  atk.lv = gd(atk.tv);
  atk.v = '7c4e4e';
  if (atk.lv > cd.v) {
    atk.v = robot.getPixelColor(data.crd.x + 683, data.crd.y + 165);
    sp(data);
  }
  if (atk.v === 'c39494') {
    atk.tv = new Date();
    return robot.keyTap('v');
  }

  atk.ly = gd(atk.ty);
  atk.y = '7c4e4e';
  if (atk.ly > cd.y) {
    atk.y = robot.getPixelColor(data.crd.x + 893, data.crd.y + 93);
    sp(data);
  }
  if (atk.y !== '7c4e4e') {
    atk.ty = new Date();
    return robot.keyTap('y');
  }

  atk.lt = gd(atk.tt);
  atk.t = '7c4e4e';
  if (atk.lt > cd.t) {
    atk.t = robot.getPixelColor(data.crd.x + 787, data.crd.y + 93);
    sp(data);
  }
  if (atk.t !== '7c4e4e') {
    atk.tt = new Date();
    return robot.keyTap('t');
  }

  atk.le = gd(atk.te);
  atk.e = '7c4e4e';
  if (atk.le > cd.e) {
    atk.e = robot.getPixelColor(data.crd.x + 578, data.crd.y + 93);
    sp(data);
  }
  if (atk.e !== '7c4e4e') {
    atk.te = new Date();
    return robot.keyTap('e');
  }

  return robot.keyTap('w');
};

const atkloop = async (data, cd) => {
  await findMove(data, cd);
  sp(data);
  await atkloop(data, cd);
};

const attack = async (data) => {
  try {
    const cd = data.cfg.attack.cd === '0' ? slowcd : fastcd;
    data.start = new Date();

    await click(data.crd, 233, 104); // adventure

    const idleBorder = robot.getPixelColor(data.crd.x + 315, data.crd.y + 87);
    if (idleBorder === 'ffeb04') await wt('q', 100);

    await atkloop(data, cd);
  } catch (err) {
    cp(err, true);
  }
};

export default attack;
