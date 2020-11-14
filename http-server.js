import express from 'express';
import WebSocket from 'ws';
import fs from 'fs';
import cp from './lib/util/print.js';

import init from './script-app.js';

const readCfg = () => {
  const cfg = fs.readFileSync('public/config.json');
  return JSON.parse(cfg);
};

const writeCfg = (cfg) => {
  if (!cfg.init) throw 'Invalid data';
  const data = JSON.stringify(cfg, null, 2);
  fs.writeFile('public/config.json', data, (err) => {
    if (err) throw err;
  });
};

const server = () => {
  console.clear();
  console.log('NGU script app local server');

  const app = express();
  const port = 3000;

  let isActive = false; // todo raus?

  app.use(express.json());
  app.use(express.static('public'));

  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      const data = JSON.parse(message);
      console.log(data);
    });

    // ws.send('test');
  });

  app.get('/app/rebirth/:rmode', async (req, res) => {
    const { rmode } = req.params;

    const response = {
      status: 'Error',
      scode: 0,
      action: '',
      msg: '',
    };

    response.action = `Rebirth ${rmode}`;

    try {
      if (isActive) throw 'Server currently active';
      isActive = true;

      const cfg = await readCfg();
      const time = await init(cfg, 1, rmode);

      response.status = 'Success';
      response.scode = 1;
      response.msg = `Finished Rebirth ${rmode}`;
      response.time = time;

      cp(response.msg);
    } catch (err) {
      response.msg = err;
      cp(err, true);
    }
    isActive = false;
    res.send(JSON.stringify(response));
  });

  app.post('/app/config', (req, res) => {
    const response = {
      status: 'Error',
      scode: 0,
      action: '',
      msg: '',
    };

    response.action = 'cfg';

    try {
      if (isActive) throw 'Server currently active';
      isActive = true;

      writeCfg(req.body);

      response.status = 'Success';
      response.scode = 1;
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
