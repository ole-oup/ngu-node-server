/* global fetch:false document:false WebSocket:false location:false */

const serverip = 'localhost:3000';

const alert = document.querySelector('#alert');
const restart = document.querySelector('#restart');
const progressContainer = document.querySelector('#progress-container');
const timer = document.querySelector('#timer');
const kills = document.querySelector('#kills');
const kpm = document.querySelector('#kpm');
const spk = document.querySelector('#spk');

// const toggleVisibility = (el) => {
//   el.style.display === 'none'
//     ? (el.style.display = 'block')
//     : (el.style.display = 'none');
// };

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
  console.log(res);
  alert.classList.add('fade');
  setTimeout(() => {
    alert.classList.remove('fade');
  }, 3500);
  alert.innerHTML = res.msg;
  if (res.status == 0) {
    alert.classList.add('error');
    // reset progress
    progressContainer.style.display = 'none';
    timer.innerHTML = '';
    kills.innerHTML = '';
    kpm.innerHTML = '';
  } else alert.classList.remove('error');
};

const setProgress = (res = { start: null, kills: null }) => {
  const start = new Date(res.start ?? '');
  const now = new Date();
  const diff = now.getTime() - start.getTime();

  progressContainer.style.display = 'block';

  if (timer.innerHTML === '') {
    const timerTick = () => {
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
    setInterval(timerTick, 1000);
  }

  const sec = diff / 1000;
  const min = sec / 60;
  const perMin = res.kills / min;
  const secPerKill = sec / res.kills;

  kills.innerHTML = res.kills;
  kpm.innerHTML = perMin.toFixed(2);
  spk.innerHTML = secPerKill.toFixed(2);
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

  socket.onclose = () => location.reload();

  restart.addEventListener('click', async () => {
    const resres = await getData('/app/restart');
    setNotification(resres);
  });

  const { wishes } = cfg;

  document.querySelectorAll('.wish').forEach((el) => {
    wishes.forEach((wish) => {
      if (wish == el.id) el.classList.add('selected-wish');
    });
    el.addEventListener('click', () => {
      if (el.classList.contains('selected-wish')) {
        el.classList.remove('selected-wish');
        let i = wishes.length;
        while (i--) {
          if (wishes[i] == el.id) wishes.splice(i, 1);
        }
      } else {
        el.classList.add('selected-wish');
        wishes.push(el.id);
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
        cfg[input.id] =
          input.type == 'text' ? input.value : Number(input.value);
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
