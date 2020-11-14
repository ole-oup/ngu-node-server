import alignWindows from './alignWindows.js';
import server from './http-server.js';

try {
  const wins = alignWindows();
  if (wins) server();
} catch (err) {
  console.error(err);
}
