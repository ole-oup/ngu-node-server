import readline from 'readline';

const rl = (query, yesno) => {
  const q = query === 'cont' ? 'continue (y/n)? ' : query;

  const rli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rli.question(q, (ans) => {
      rli.close();
      const a = ans.toLowerCase();
      const isYes = a === 'y' || a === 'yes' ? true : false;

      if (yesno === true && isYes === false) reject('Answer not yes');
      else resolve(ans);
    });
  });
};

export default rl;
