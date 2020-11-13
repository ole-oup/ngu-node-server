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
  console.log('Starting server...');

  const port = 3000;
  const wss = new WebSocket.Server({ port });

  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });

    ws.send('something');
  });

  console.clear();
  console.log('NGU script app local ws server');

  /*
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

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
  */
};

export default server;
