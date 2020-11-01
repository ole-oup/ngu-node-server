import express from 'express';

import init from './script-app.js';

const server = (cfg, writeCfg) => {
  const app = express();
  const port = 3662;

  console.clear();
  console.log('NGU script app local server');

  app.use(express.static('public'));

  app.get('/app/:mode', (req, res) => {
    const { mode } = req.params;
    init(cfg, mode).then((data) => {
      res.send({ status: 'complete', action: mode, time: data });
    });
  });

  app.get('/app/:mode/:rmode', (req, res) => {
    const { mode, rmode } = req.params;
    init(cfg, mode, rmode).then((data) => {
      res.send({
        status: 'complete',
        action: `${mode} => ${rmode}`,
        time: data,
      });
    });
  });

  app.post('/app/:mode/:rmode', (req, res) => {
    const { mode, rmode } = req.params;
    console.log(req.body);
    init(cfg, mode, rmode).then((data) => {
      res.send({
        status: 'complete',
        action: `${mode} => ${rmode}`,
        time: data,
      });
    });
  });

  app.post('/config', (req, res) => {
    console.dir(req.body); // das muss cfg sein
    writeCfg(req.body);
    res.send({ status: 'complete', action: 'cfg' });
  });

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
};

export default server;
