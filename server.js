import express from 'express';
import fs from 'fs';
import cp from './lib/helper/print.js';

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
  const app = express();
  const port = 3662;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  console.clear();
  console.log('NGU script app local server');

  app.post('/app/:mode/:rmode', async (req, res) => {
    const { mode, rmode } = req.params;

    const isRebirth = mode === 'rebirth';

    const appMode = isRebirth ? '1' : rmode;
    const appRMode = isRebirth ? rmode : null;

    let response = {
      status: 'Error',
      action: isRebirth ? `R${rmode}` : `M${rmode}`,
      msg: '',
      time: '',
    };

    try {
      const cfg = await readCfg();
      const time = await init(cfg, appMode, appRMode);

      response.status = 'Success';
      response.msg = isRebirth
        ? `Completed rebirth ${rmode}`
        : `Completed Mode ${rmode}`;
      response.time = time;
      cp(`Completed Mode ${response.action}`);
    } catch (err) {
      response.msg = 'Mode failed';
      cp(err.message, true);
    }
    res.send(JSON.stringify(response));
  });

  app.post('/app/config', (req, res) => {
    let response = {
      status: 'Error',
      action: 'cfg',
      msg: '',
    };

    try {
      writeCfg(req.body);
      response.status = 'Success';
      response.msg = 'Data written to file';
      cp(response.msg);
    } catch (err) {
      response.msg = err;
      cp(err.message, true);
    }
    res.send(response);
  });

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
};

export default server;
