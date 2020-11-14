import nwm from 'node-window-manager';
const { windowManager } = nwm;

const alignWindows = () => {
  let terminal = false;
  let gameWin = false;
  let browser = false;

  try {
    const windows = windowManager.getWindows();

    const terminalPath = 'C:\\Program Files\\PowerShell\\7\\pwsh.exe';
    const gamePath =
      'C:\\Program Files (x86)\\Steam\\steamapps\\common\\NGU IDLE\\NGUIdle.exe';
    const browserPath =
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

    const checkWindows = (path) => {
      let window = false;
      for (let i = 0; i < windows.length; i++) {
        window = windows[i].path === path ? windows[i] : false;
        if (window !== false) break;
      }
      return window;
    };

    terminal = checkWindows(terminalPath);
    if (terminal === false) throw 'terminal not found';
    else {
      terminal.bringToTop();
      terminal.setBounds({ x: -6, y: 626, height: 420, width: 972 });
    }

    gameWin = checkWindows(gamePath);
    if (!gameWin) throw 'gameWin not found';
    else {
      gameWin.bringToTop();
      gameWin.setBounds({ x: 0, y: 0 });
    }

    browser = checkWindows(browserPath);
    if (!browser) throw 'browser not found';

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default alignWindows;
