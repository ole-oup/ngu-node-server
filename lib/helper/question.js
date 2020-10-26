import readline from 'readline';

const rl = (query, yesno) => {
  const isCont = query === 'cont' ? true : false;

  const q = isCont ? 'continue (y/n)? ' : query;
  const yn = isCont ? true : yesno;

  const rli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // todo return true oder false bei y, yes, 1, n, no, 0

  return new Promise((resolve, reject) => {
    rli.question(q, (ans) => {
      rli.close();
      const a = ans.toLowerCase();
      const isYes = a === 'y' || a === 'yes' ? true : false;

      if (yn === true && isYes === false) reject('Answer not yes');

      if (isCont) {
        // clear line
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
      }
      resolve(ans);
    });
  });
};

export default rl;
