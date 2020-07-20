import readline from 'readline';

const question = (query, yesno) => {
  const q = query === 'cont' ? 'continue (y/n)? ' : query;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question(q, (ans) => {
      rl.close();
      const a = ans.toLowerCase();
      const isYes = a === 'y' || a === 'yes' ? true : false;

      if (yesno === true && isYes === false) reject('Answer not yes');
      else resolve(ans);
    });
  });
};

export default question;
