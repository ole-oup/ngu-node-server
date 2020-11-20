/* global fetch:false document:false WebSocket:false location:false */

const serverip = '192.168.178.35:3000';

const alert = document.querySelector('#alert');
const settingsContainer = document.querySelector('#settings-container');
const progressContainer = document.querySelector('#progress-container');
const settings = document.querySelector('#settings');
const timer = document.querySelector('#timer');
const kills = document.querySelector('#kills');
const kpm = document.querySelector('#kpm');

const toggleVisibility = (el) => {
  el.style.display === 'none'
    ? (el.style.display = 'block')
    : (el.style.display = 'none');
};

const getData = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    return response.json();
  } catch (err) {
    console.error(err);
    return { status: 0, msg: 'GET Error' };
  }
};

const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (err) {
    console.error(err);
    return { status: 0, msg: 'POST Error' };
  }
};

const setNotification = (res) => {
  alert.classList.add('fade');
  setTimeout(() => {
    alert.classList.remove('fade');
  }, 3500);
  alert.innerHTML = res.msg;
  if (res.status == 1) alert.style.color = 'var(--sec-color)';
  else alert.style.color = 'var(--err-color)';
};

const setProgress = (res) => {
  const start = new Date(res.start);
  const now = new Date();
  const diff = now.getTime() - start.getTime();

  progressContainer.style.display = 'block';
  if (timer.innerHTML === '') {
    const timerInterval = () => {
      const n = new Date();
      const d = n.getTime() - start.getTime();
      const td = { d };
      const addZero = (num) => {
        return num < 10 ? `0${num}` : String(num);
      };
      td.hrs = addZero(Math.floor(td.d / 1000 / 60 / 60));
      td.min = addZero(Math.floor((td.d / 1000 / 60) % 60));
      td.sec = addZero(Math.floor((td.d / 1000) % 60));

      const time = `${td.hrs}:${td.min}:${td.sec}`;
      timer.innerHTML = time;
    };
    setInterval(timerInterval, 1000);
  }

  const min = diff / 1000 / 60;
  const perMin = res.kills / min;

  kills.innerHTML = res.kills;
  kpm.innerHTML = perMin.toFixed(2);
};

const saveCfg = async (cfg) => {
  try {
    if (cfg.init !== true) throw 'cfg not initialized';
    const res = await postData('/app/config', cfg);
    setNotification(res);
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  let cfg = {};
  try {
    cfg = await getData('/config.json');
  } catch (err) {
    console.error(err);
    setNotification({ msg: 'Loading default config' });
    cfg = await getData('/default-config.json');
  }

  const socket = new WebSocket(`ws://${serverip}`);

  socket.onopen = () => socket.send(JSON.stringify({ req: 'status' }));

  socket.onmessage = (e) => {
    const response = JSON.parse(e.data);
    if (response.status == 2) setProgress(response.progress);
    else setNotification(response);
  };

  socket.onclose = () => {
    console.warn('Lost websocket connection, reloading in 3 seconds');
    setTimeout(() => {
      location.reload();
    }, 3000);
  };

  settings.addEventListener('click', () => {
    toggleVisibility(settingsContainer);
  });

  const { wishes } = cfg;

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
        );
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
    .querySelectorAll('input[type=number], input[type=text], select')
    .forEach((input) => {
      input.value = cfg[input.id];
      input.addEventListener('change', () => {
        cfg[input.id] = input.value;
        saveCfg(cfg);
      });
    });

  document.querySelectorAll('.mode').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        const isRebirth = button.id[0] === 'r' ? true : false;
        if (isRebirth) {
          const res = await getData(`/app/rebirth/${button.id[5]}`);
          setNotification(res);
        } else {
          const mode = button.id[4];
          socket.send(JSON.stringify({ req: 'mode', mode }));
        }
      } catch (err) {
        console.error(err);
      }
    });
  });
})();
