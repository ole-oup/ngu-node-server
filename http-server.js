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

  let isActive = false;

  app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('received: %s', message);
    });

    ws.send('test');
  });

  app.get('/app/:mode/:rmode', async (req, res) => {
    const { mode, rmode } = req.params;

    const isRebirth = mode === 'rebirth';

    const appMode = isRebirth ? '1' : rmode;
    const appRMode = isRebirth ? rmode : null;

    let response = {
      status: 'Error',
      scode: 0,
      action: isRebirth ? `R${rmode}` : `M${rmode}`,
      msg: '',
      time: '',
    };

    try {
      if (isActive) throw 'Server currently active';
      isActive = true;
      cp(`Starting Mode ${response.action}`);
      const cfg = await readCfg();
      const time = await init(cfg, appMode, appRMode);
      response.status = 'Success';
      response.scode = 1;
      response.msg = isRebirth
        ? `Ended rebirth ${rmode}`
        : `Ended Mode ${rmode}`;
      response.time = time;
      cp(`Ended Mode ${response.action}`);
    } catch (err) {
      response.msg = err;
      cp(err, true);
    }
    isActive = false;
    res.send(JSON.stringify(response));
  });

  app.post('/app/config', (req, res) => {
    let response = {
      status: 'Error',
      scode: 0,
      action: 'cfg',
      msg: '',
    };

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
    res.send(response);
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
