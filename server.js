import express from 'express';
import init from './script-app.js';

const server = () => {
  const app = express();
  const port = 3000;

  console.clear();

  app.get('/app/:mode', (req, res) => {
    const { mode } = req.params;
    init(mode).then((data) => {
      res.send({ status: 'complete', time: data });
    });
  });

  app.get('/app/:mode/:rmode', (req, res) => {
    const { mode, rmode } = req.params;
    init(mode, rmode).then((data) => {
      res.send({ status: 'complete', rmode, time: data });
    });
  });

  app.post('/app/:mode/:rmode', (req, res) => {
    const { mode, rmode } = req.params;
    console.log(req.body);
    init(mode, rmode).then((data) => {
      res.send({ status: 'complete', rmode, time: data });
    });
  });

  app.post('/config', (req, res) => {
    console.dir(req.body);
    res.send({ status: 'complete', time: 'x' });
  });

  app.use(express.static('public'));

  app.listen(port, () => {
    console.log(`Started app, listening at http://localhost:${port}`);
  });
};

export default server;
