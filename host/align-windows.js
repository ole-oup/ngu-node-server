import nwm from 'node-window-manager';
const { windowManager } = nwm;

const alignWindows = () => {
  let terminal = false;
  let gameWin = false;

  try {
    const windows = windowManager.getWindows();

    const terminalPath = 'C:\\Program Files\\PowerShell\\7\\pwsh.exe';
    const gamePath =
      'C:\\Program Files (x86)\\Steam\\steamapps\\common\\NGU IDLE\\NGUIdle.exe';

    const checkWindows = (path) => {
      let window = false;
      for (let i = 0; i < windows.length; i++) {
        window = windows[i].path === path ? windows[i] : false;
        if (window !== false) break;
      }
      return window;
    };

    terminal = checkWindows(terminalPath);
    if (terminal) {
      terminal.bringToTop();
      terminal.setBounds({ x: -5, y: 586, height: 460, width: 974 });
    }

    gameWin = checkWindows(gamePath);
    if (gameWin) {
      gameWin.bringToTop();
      gameWin.setBounds({ x: -3, y: -27 });
    }

    return gameWin;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default alignWindows;
