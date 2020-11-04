/* global fetch:false document:false */

const displayTimer = (start) => {
  const now = new Date();
  const d = now.getTime() - start.getTime();

  const td = { d }; // timer data

  td.m = Math.floor(td.d / 1000 / 60);
  td.min = td.m < 10 ? `0${td.m}` : String(td.m);
  td.s = Math.floor((td.d / 1000) % 60);
  td.sec = td.s < 10 ? `0${td.s}` : String(td.s);

  return `${td.min}:${td.sec}`;
};

const getData = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
  });
  return response.json();
};

const postData = async (url, data) => {
  const start = new Date();
  const timer = document.getElementById('timer');

  const startTimer = setInterval(() => {
    timer.innerHTML = displayTimer(start);
  }, 1000);

  const stopTimer = () => {
    clearInterval(startTimer);
    timer.innerHTML = '';
  };

  const response = fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  stopTimer();
  return response.json();
};

const saveCfg = async (cfg) => {
  try {
    if (cfg.init !== true) throw 'cfg not initialized';
    const res = await postData('/app/config', cfg);
    console.log(res);
  } catch (err) {
    console.warn(err);
  }
};

(async () => {
  let cfg = {};

  try {
    cfg = await getData('/config.json');
  } catch (err) {
    console.warn(err.message);
    console.log('Loading default config');
    cfg = await getData('/default-config.json');
  }

  const { wishes } = cfg;

  // add eventlisteners to wishes
  document.querySelectorAll('.wish').forEach((element) => {
    wishes.forEach((wish) => {
      if (wish === element.innerHTML) element.classList.add('selected-wish');
    });

    element.addEventListener('click', () => {
      if (element.classList.contains('selected-wish')) {
        element.classList.remove('selected-wish');

        let i = wishes.length;
        while (i--) {
          if (wishes[i] === element.innerHTML) wishes.splice(i, 1);
        }
      } else {
        element.classList.add('selected-wish');
        wishes.push(element.innerHTML);
      }

      if (wishes.length === 4) {
        document.documentElement.style.setProperty(
          '--wish-bg',
          'var(--selected)'
        );
        cfg.wishes = wishes;
        saveCfg(cfg);
      } else
        document.documentElement.style.setProperty(
          '--wish-bg',
          'var(--err-color)'
        ); // red
    });
  });

  document.querySelectorAll('input[type=checkbox]').forEach((input) => {
    input.checked = cfg[input.id] === 1 ? true : false;
    input.addEventListener('change', () => {
      cfg[input.id] = input.checked === true ? 1 : 0;
      saveCfg(cfg);
    });
  });

  document
    .querySelectorAll('input[type=number], input[type=text]')
    .forEach((input) => {
      input.value = cfg[input.id];
      input.addEventListener('change', () => {
        cfg[input.id] = input.value;
        saveCfg(cfg);
      });
    });

  document.querySelectorAll('.mode').forEach((button) => {
    button.addEventListener('click', async () => {
      const isRebirth = button.id[0] === 'r' ? true : false;
      const uri = isRebirth
        ? `/app/rebirth/${button.id[5]}`
        : `/app/mode/${button.id[4]}`;

      console.log('start');
      const res = await postData(uri, {});
      console.log(res);
      return res.status === 'Success'
        ? console.log(res.msg)
        : console.warn(res.msg);
    });
  });
})();
