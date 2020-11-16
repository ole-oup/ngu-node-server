import express from 'express';
import WebSocket from 'ws';
import fs from 'fs';
import cp from '../app/util/print.js';

import init from '../app/app-index.js';

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

const server = () => {
  console.clear();
  console.log('NGU script app local server');

  const app = express();
  const port = 3000;

  let isActive = false;

  app.use(express.json());
  app.use(express.static('public'));

  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      const response = {
        status: 0,
        action: '',
        msg: '',
      };
      try {
        const data = JSON.parse(message);

        switch (data.req) {
          case 'mode':
            if (isActive) throw 'Server currently active';
            response.status = 2;
            response.action = `m${data.mode}`;
            response.msg = `starting mode ${data.mode}`;
            cp(response.msg);
            init(readCfg(), data.mode);
            break;
          case 'status':
            response.status = 1;
            response.action = 'status';
            response.msg = isActive ? 'Server active' : 'Server idle';
            break;
          default:
            response.action = '?';
            response.msg = 'Unknown action';
        }
      } catch (err) {
        response.msg = err;
        cp(err, true);
      }
      isActive = false;
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN)
          client.send(JSON.stringify(response));
      });
    });
  });

  app.get('/app/rebirth/:rmode', async (req, res) => {
    const { rmode } = req.params;
    const response = {
      status: 0,
      action: `rebirth ${rmode}`,
      msg: '',
    };
    try {
      if (isActive) throw 'Server currently active';
      isActive = true;

      const cfg = readCfg();
      await init(cfg, 1, rmode);

      response.status = 1;
      response.msg = `Finished Rebirth ${rmode}`;
    } catch (err) {
      response.msg = err;
      cp(err, true);
    }
    isActive = false;
    res.send(JSON.stringify(response));
  });

  app.post('/app/config', (req, res) => {
    const response = {
      status: 0,
      action: 'cfg',
      msg: '',
    };
    try {
      if (isActive) throw 'Server currently active';
      isActive = true;

      writeCfg(req.body);

      response.status = 1;
      response.msg = 'Data written to file';
      cp(response.msg);
    } catch (err) {
      response.msg = err;
      cp(err, true);
    }
    isActive = false;
    res.send(JSON.stringify(response));
  });

  const ser = app.listen(port, () =>
    console.log(`Listening at http://localhost:${port}`)
  );

  ser.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (socket) => {
      wss.emit('connection', socket, request);
    });
  });
};

export default server;
