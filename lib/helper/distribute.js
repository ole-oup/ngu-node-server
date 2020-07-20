import robot from 'robotjs';

import click from './click.js';
import wt from './waittap.js';
import wait from './wait.js';

const distributeRes = async (data) => {
  // fight boss
  await click(data.crd, 233, 50); // fight boss
  await click(data.crd, 626, 150); // nuke

  // reset resources after, can't be in adv menu (r and t hotkeys)
  await wt('r');
  await wt('t');

  // adventure
  await click(data.crd, 233, 104); // adventure
  await click(data.crd, 937, 210, true); // right arrow

  const idleBorder = robot.getPixelColor(data.crd.x + 315, data.crd.y + 87);
  if (idleBorder !== 'ffeb04') {
    await wt('q');
  }

  const zonesBack = Number(data.cfg.thirtym.zone);
  if (zonesBack !== 0) for (let i = 0; i < zonesBack; i++) await wt('left');

  // todo als array in funktion?

  // augment
  // todo config option für augment -> wieviel
  await click(data.crd, 233, 159); // augment

  await click(data.crd, 765, 20); //  e cap custom 1

  await click(data.crd, 538, 523); // buster +
  await click(data.crd, 538, 551); // charge +

  // tm
  // todo tm mit %, option in config
  await click(data.crd, 233, 211); // tm

  await click(data.crd, 357, 42); // custom input 1

  await click(data.crd, 533, 235); // tm e +
  await click(data.crd, 533, 331); // tm m +

  // gold diggers
  await click(data.crd, 233, 346); // gold diggers
  await click(data.crd, 798, 113); // cap saved

  await click(data.crd, 233, 238); // blood magic

  // wandoos
  await click(data.crd, 233, 266); // wandoos

  await click(data.crd, 625, 250); // e cap
  await click(data.crd, 625, 348); // m cap

  // blood magic
  await click(data.crd, 233, 238); // blood magic

  await click(data.crd, 824, 110); // cap all
  await click(data.crd, 395, 114); // spells

  await wait(2000);

  await click(data.crd, 735, 310); // gold spell

  // ngu
  await click(data.crd, 233, 293); // ngu

  await click(data.crd, 628, 160); // cap all
  await click(data.crd, 378, 110); // switch mode
  await click(data.crd, 628, 160); // cap all
};

export default distributeRes;
