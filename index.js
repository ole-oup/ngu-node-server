import server from './http-server.js';

try {
  server();
} catch (err) {
  console.error(err);
}
