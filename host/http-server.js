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

  const app = express();
  const port = 3000;

  let isActive = false;

  app.use(express.json());
  app.use(express.static('public'));

  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
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
            console.log('Starting script');
            broadcast(response);
            await startApp(readCfg(), data.mode, broadcast, createResponse);
            isActive = false;
            console.log('Server ready');
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
    const cfg = readCfg();
    startApp(cfg, 99);
  });

  const ser = app.listen(port, () => console.log(`Server ready`));

  ser.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (socket) => {
      wss.emit('connection', socket, request);
    });
  });
};

export default server;
