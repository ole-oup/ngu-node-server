import server from './server.js';

try {
  server();
} catch (err) {
  console.error(err);
}
