import nwm from 'node-window-manager';
const { windowManager } = nwm;

let terminal = false;

const windows = windowManager.getWindows();

const terminalPath = 'C:\\Program Files\\PowerShell\\7\\pwsh.exe';

for (let i = 0; i < windows.length; i++) {
  terminal = windows[i].path === terminalPath ? windows[i] : false;
  if (terminal) break;
}

terminal.setBounds({ x: -6, y: 626, height: 420, width: 972 });
