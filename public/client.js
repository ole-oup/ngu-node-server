/* global fetch:false document:false */

const getData = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
  });
  return response.json();
};

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
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

const client = async () => {
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
        document.documentElement.style.setProperty('--wish-bg', '#757575');
        cfg.wishes = wishes;
        saveCfg(cfg);
      } else document.documentElement.style.setProperty('--wish-bg', '#a81f1f'); // red
    });
  });

  document.querySelectorAll('input[type=checkbox]').forEach((input) => {
    input.value = cfg[input.id];
    input.addEventListener('change', () => {
      cfg[input.id] = input.checked === true ? 1 : 0;
      saveCfg(cfg);
    });
  });

  document
    .querySelectorAll('input[type=number], input[type=text]')
    .forEach((input) => {
      input.value = cfg[input.id];
    });

  // TIME MACHINE (1)
  document.getElementById('rmode1').addEventListener('click', () => {
    postData('/app/rebirth/1').then((data) => console.log(data));
  });

  // AUGS (1)
  document.getElementById('rmode2').addEventListener('click', () => {
    postData('/app/rebirth/2').then((data) => console.log(data));
  });

  // WISHES (1)
  document.getElementById('rmode3').addEventListener('click', () => {
    postData('/app/rebirth/3').then((data) => console.log(data));
  });

  // IDLE (2)
  document.getElementById('mode2').addEventListener('click', () => {
    postData('/app/mode/2').then((data) => console.log(data));
  });

  // GUFFS (3)
  document.getElementById('mode3').addEventListener('click', () => {
    postData('/app/mode/3').then((data) => console.log(data));
  });

  // SNIPE (4)
  document.getElementById('mode4').addEventListener('click', () => {
    postData('/app/mode/4').then((data) => console.log(data));
  });

  // QUEST (5)
  document.getElementById('mode5').addEventListener('click', () => {
    postData('/app/mode/5').then((data) => console.log(data));
  });
};

client(); // start function
