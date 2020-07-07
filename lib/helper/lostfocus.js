const rl = require('readline');

const question = new Promise((resolve, reject) => {
  // rl.question('The game lost focus. Continue (y/n)? ', (answer) => {
  //   rl.close();
  //   if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
  //     resolve();
  //   } else {
  //     reject('Game lost focus');
  //   }
  // });
  if (true) resolve();
  else reject();
});

module.exports = { question };
