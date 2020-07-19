import calibrate from './helper/calibrate.js';
import click from './helper/click.js';
import cp from './helper/print.js';
import idle from './helper/idle.js';

const test = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const getDiff = (start) => {
  const now = new Date();
  return now.getTime() - start.getTime();
};

const selectPhase = (data, phase, msg) => {
  cp(msg);

  // duration in ms
  let dur = 0;

  // todo phase r3 voll? dann auch calibration
  switch (phase) {
    // first phase: e & m maxed
    case 0:
      dur = data.max;
      break;
    // second phase: until
    case 1:
      dur = Number(data.cfg.thirtym.mins) * 1000 * 60;
      break;
    default:
      throw 'no more phases';
  }

  // set the timer
  const timer = setInterval(() => {
    displayTimer(data.start);
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
  }, dur);

  const p = phase + 1;

  loop(data, dur, p);
};

const displayTimer = (start) => {
  const d = getDiff(start);

  const m = Math.floor(d / 1000 / 60);
  let min = m < 10 ? `0${m}` : String(m);
  const s = Math.floor((d / 1000) % 60);
  let sec = s < 10 ? `0${s}` : String(s);

  cp(`${min}:${sec}`);
};

const loop = async (data, dur, phase) => {
  const diff = getDiff(data.start);

  await test(250);

  // await click(data.crd, 233, 50, false, 2000); // fight boss
  // await click(data.crd, 626, 150); // nuke

  if (diff < dur) {
    loop(data, dur, phase);
  } else {
    const message = `Phase ${phase} done`;
    selectPhase(data, phase, message);
  }
};

const thirtyMin = async (data) => {
  try {
    data.max = await calibrate(data.cfg, data.terminal);

    console.clear();
    data.win.bringToTop();

    // first loop until e & m are maxed
    selectPhase(data, 0, 'starting rebirth');
  } catch (err) {
    cp(err, true);
  }
};

export default thirtyMin;

/*

  gameWin in itopod passen

  "if" für rechtsklick auf höchste zone, wenn max erreicht ist? wie unten?

  custom energy & magic idle % kaufen und einbauen für wishes?

  aug am anfang 1/2 e idle auf in config gesetzte zone
  switch mit nummern (1-7)
  einmal am anfang und dann je nach option später noch mal?

  blood magic & tm nur einmal, in p auf false und wenn es gemacht wurde auf true, if (!p.x) { machX(); p.x = true }

  option für ngu in config.ini

  itopod für 6 - cur minuten lang -> wandoos noch mal cappen -> e in aug und m wohin? -> itopod bis r3 max? -> itopod bis dur

  ganz am ende wenn dur vorbei -> rebirth -> loop mit neuem start?

  gucken was ich mit autonuke und adventure advance rausnehmen kann
  timer immer anzeigen in terminal

  fight boss: nuke
  adventure: rechtsklick pfeil
  aug: 1/2 idle > in laser
  TM: 10%e, 30%m (quest: 1% & 3%)
  blood magic: cap all > cast > sleep kurz > gold
  gold digger: cap
  wandoos: cap
  ngu: cap (option zum ausstellen?)
  option wish?
  hacks (option welcher hack?)

  mplayer aus downloads entpacken (exe in project dir)
  yarn add play-sound
  kurz vor rebirth alarm sound und 5 sec countdown
*/
