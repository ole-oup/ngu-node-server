import express from 'express';

import rebirth from './lib/rebirth.js';

const server = (state) => {
  const app = express();
  const port = 3000;

  console.clear();

  app.get('/rebirth/:rmode', (req, res) => {
    const { rmode } = req.params;
    rebirth(state);
    res.send({ status: 'complete', rmode, time: 'x' });
  });

  app.post('/config', (req, res) => {
    console.dir(req.body);
    res.send({ status: 'complete', time: 'x' });
  });

  app.use(express.static('public'));

  app.listen(port, () => {
    console.log(`NGU app listening at http://localhost:${port}`);
  });
};

export default server;
