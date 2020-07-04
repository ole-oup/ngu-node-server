const readline = require('readline');
const { windowManager, Window } = require('node-window-manager');
// const robot = require('robotjs');
const lazyIdle = require('./lib/lazyidle.js');
const idle = require('./lib/idle.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getGameWindow = () => {
  const windows = windowManager.getWindows();
  let win = new Object(null);

  for (let i = 0; i < windows.length; i++) {
    if (
      windows[i].path ===
      'C:\\Program Files (x86)\\Steam\\steamapps\\common\\NGU IDLE\\NGUIdle.exe'
    ) {
      win = windows[i];
      break;
    }
  }

  return win;

  // return windowFound;
};

const activateFoundWindow = (window) => {
  window.bringToTop();
};

/*
node window manager
wenn answer -> focus ngu
wenn focus von ngu weg -> focus terminal (kann man erkennen welches?) -> script pausieren, console: abrrechen? -> input ja: terminal terminieren
bei nein script weitermachen
*/

console.log(`
  modes:
  d: debug
  1: idle
  2: lazyidle
`);

const inputPromise = new Promise((resolve) => {
  rl.question('Please choose a mode: ', (answer) => {
    resolve(answer);
    rl.close();
  });
});

inputPromise.then((successMessage) => {
  const gameWindow = getGameWindow();

  activateFoundWindow(gameWindow);

  switch (successMessage) {
    case '1':
      idle();
      break;
    case '2':
      lazyIdle();
      break;
    default:
      console.error(new Error('Invalid mode'));
  }
});
