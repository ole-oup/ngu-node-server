const fs = require('fs');
const ini = require('ini');

const init = require('./lib/helper/init.js');

console.clear();

const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

init(config);
