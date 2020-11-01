import server from './server.js';
import fs from 'fs';

const cfg = fs.readFileSync('./config.json');
server(cfg);
