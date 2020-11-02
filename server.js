import express from 'express';
import fs from 'fs';

import init from './script-app.js';

const readCfg = () => {
  const cfg = fs.readFileSync('public/config.json');
  return JSON.parse(cfg);
};

const writeCfg = (cfg) => {
  if (!cfg) throw 'Invalid data';
  const data = JSON.stringify(cfg, null, 2);
  fs.writeFile('public/config.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
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
      action: `R${rmode}`,
      msg: '',
      time: '',
    };

    try {
      const cfg = await readCfg();
      const time = await init(cfg, appMode, appRMode);

      response.status = 'Success';
      response.msg = isRebirth ? 'Completed rebirth' : 'Task ended';
      response.time = time;
    } catch (err) {
      console.error('\x1b[91mError\x1b[0m');
      console.log(err);
      response.msg = 'Task failed';
    }
    res.send(response);
  });

  // app.post('/app/mode/:mode', async (req, res) => {
  //   const { mode } = req.params;

  //   let response = {
  //     status: 'Error',
  //     action: mode,
  //     msg: '',
  //     time: '',
  //   };

  //   try {
  //     const cfg = await readCfg();
  //     // const time = await init(cfg, mode);

  //     console.log(cfg);

  //     response.status = 'Success';
  //     response.msg = `Completed Mode ${mode}`;
  //     response.time = time;
  //   } catch (err) {
  //     console.error(`\x1b[91m${err}\x1b[0m`);
  //   }
  //   res.send(response);
  // });

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
    } catch (err) {
      response.msg = err;
    }
    res.send(response);
  });

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
};

export default server;
