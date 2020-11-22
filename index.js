import alignWindows from './host/align-windows.js';
import server from './host/http-server.js';

try {
  const wins = alignWindows();
  if (wins) server();
} catch (err) {
  console.log(err);
}
