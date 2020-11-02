import express from 'express';

import init from './script-app.js';

const server = (cfg, writeCfg) => {
  const app = express();
  const port = 3662;

  const config = cfg;

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

  app.post('/app/config', (req, res) => {
    let response = {
      status: '',
      action: 'cfg',
      msg: '',
    };

    try {
      response.cfg = req.body;

      console.dir(response); // da muss cfg sein

      writeCfg(response.cfg);
    } catch (err) {
      response.status = 'Error';
      response.msg = err;
    }
    res.send(response);
  });

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
};

export default server;
