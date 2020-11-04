import express from 'express';
import fs from 'fs';

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

const timestamp = () => {
  const time = new Date().toLocaleTimeString();
  const timestr = `[${time}]`;

  return `\x1b[90m${timestr}\x1b[0m`;
};

const server = () => {
  const app = express();
  const port = 3662;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  const errstr = '\x1b[91mError\x1b[0m';
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

      console.log(`${timestamp()} Completed Task ${response.action}`);
      response.status = 'Success';
      response.msg = isRebirth ? 'Completed rebirth' : 'Completed task';
      response.time = time;
    } catch (err) {
      console.error(errstr);
      console.log(err);
      response.msg = 'Task failed';
    }
    res.send(response);
  });

  app.post('/app/config', (req, res) => {
    let response = {
      status: 'Error',
      action: 'cfg',
      msg: '',
    };

    try {
      writeCfg(req.body);
      console.log(timestamp() + response.action);
      response.status = 'Success';
      response.msg = 'Data written to file';
    } catch (err) {
      console.error(errstr);
      console.log(err);
      response.msg = err;
    }
    res.send(response);
  });

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
};

export default server;
