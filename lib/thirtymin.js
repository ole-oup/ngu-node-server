import cal from './helper/calibrate.js';

const thirtyMin = async (bounds, config, gameWin, terminal) => {
  /* todo auflösung anpassen
  let numbers = {
    e: { cap: { num: null, str: null }, rps: { num: null, str: null } },
    m: { cap: { num: null, str: null }, rps: { num: null, str: null } },
  };

  const num = await cal(bounds, config, gameWin, terminal, numbers);

  const pn = {
    ecp: num.e.cap.str,
    eps: num.e.rps.str,
    mcp: num.m.cap.str,
    mps: num.m.rps.str,
  };
  
  */

  console.log('\n' + 'e cap ' + pn.ecp);
  console.log('e rps ' + pn.eps);
  console.log('m cap ' + pn.mcp);
  console.log('m rps ' + pn.mps);
  /*
    fight boss > nuke
    adventure > rechtsklick pfeil
    aug > 
    blood magic > cap all > cast > sleep kurz > gold
    TM: 10%e, 20%m
  */
};

export default thirtyMin;
