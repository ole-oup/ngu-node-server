import server from './server.js';
import fs from 'fs';

const writeCfg = (cfg) => {
  let data = JSON.stringify(cfg, null, 2);

  fs.writeFile('config.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
};

try {
  fs.readFile('config.json', (err, data) => {
    if (err) throw err;
    const cfg = JSON.parse(data);

    server(cfg, writeCfg);
  });
} catch (err) {
  console.error(err);
}
