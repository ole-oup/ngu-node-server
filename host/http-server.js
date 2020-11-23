import express from 'express';
import WebSocket from 'ws';
import fs from 'fs';

import startApp from '../app/app-index.js';

const readCfg = () => {
  const cfg = fs.readFileSync('public/config.json');
  return JSON.parse(cfg);
};

const writeCfg = (cfg) => {
  if (!cfg.init) throw 'Invalid data';
  const data = JSON.stringify(cfg, null, 2);
  fs.writeFileSync('public/config.json', data, (err) => {
    if (err) throw err;
  });
};

const createResponse = (action = '', status = 0, msg = '') => {
  return {
    status,
    action,
    msg,
    progress: {
      kills: 0,
      start: null,
    },
  };
};

const server = () => {
  console.clear();

  console.log('Starting server');

  const app = express();
  const port = 3000;

  let isActive = false;

  app.use(express.json());
  app.use(express.static('public'));

  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        const response = createResponse();
        const broadcast = (msg) => {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN)
              client.send(JSON.stringify(msg));
          });
        };
        switch (data.req) {
          case 'mode':
            if (isActive) throw 'Server not ready';
            response.status = 1;
            response.action = `m${data.mode}`;
            response.msg = `Starting mode ${data.mode}`;
            isActive = true;
            broadcast(response);
            startApp(readCfg(), data.mode, 0, broadcast, createResponse);
            break;
          case 'status':
            response.status = 1;
            response.action = 'status';
            response.msg = isActive ? 'Server active' : 'Server ready';
            broadcast(response);
            break;
          default:
            response.action = '?';
            response.msg = 'Unknown action';
            broadcast(response);
        }
      } catch (err) {
        console.log(err);
      }
    });
  });

  app.get('/app/rebirth/:rmode', async (req, res) => {
    const { rmode } = req.params;
    const response = createResponse(`rebirth ${rmode}`);
    try {
      if (isActive) throw 'Server not ready';
      isActive = true;

      const cfg = readCfg();
      await startApp(cfg, 1, rmode);

      response.status = 1;
      response.msg = `Finished Rebirth ${rmode}`;
      isActive = false;
    } catch (err) {
      response.msg = err;
      console.log(err);
    }
    console.log(response.msg);
    res.send(JSON.stringify(response));
  });

  app.post('/app/config', (req, res) => {
    const response = createResponse('cfg');
    try {
      writeCfg(req.body);
      response.status = 1;
      response.msg = 'Data written to file';
    } catch (err) {
      response.msg = err;
      console.log(err);
    }
    console.log(response.msg);
    res.send(JSON.stringify(response));
  });

  app.get('/app/restart', async (req, res) => {
    const response = createResponse('restart', 0, 'Restarting server');
    console.log(response.msg);
    res.send(response);
    startApp({}, 7);
  });

  // const ser = app.listen(port, () =>
  //   console.log(`Listening at http://localhost:${port}`)
  // );

  const ser = app.listen(port);

  ser.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (socket) => {
      wss.emit('connection', socket, request);
    });
  });
};

export default server;
