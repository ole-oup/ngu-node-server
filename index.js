import express from 'express';
import path from 'path';

const rebirthserver = () => {
  const app = express();
  const port = 3000;

  const dir = path.resolve();

  console.log(dir);

  app.get('/', (req, res) => {
    res.sendFile(path.join(dir + '/lib/index.html'));
  });

  app.listen(port, () => {
    console.log(`NGU rebirth app listening at http://localhost:${port}`);
  });
};

export default rebirthserver;
