/* global fetch:false document:false */

const getData = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
  });
  return response.json();
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
    return err;
  }
};

getData('/config.json').then((config) => {
  const cfg = { ...config };
  const selectedWishes = cfg.rebirth.wishes;

  // add eventlisteners to wishes
  document.querySelectorAll('.wish').forEach((element) => {
    selectedWishes.forEach((wish) => {
      if (wish === element.innerHTML) element.classList.add('selected-wish');
    });

    element.addEventListener('click', () => {
      if (element.classList.contains('selected-wish')) {
        element.classList.remove('selected-wish');

        let i = selectedWishes.length;
        while (i--) {
          if (selectedWishes[i] === element.innerHTML)
            selectedWishes.splice(i, 1);
        }
      } else {
        element.classList.add('selected-wish');
        selectedWishes.push(element.innerHTML);
      }

      if (selectedWishes.length === 4) {
        document.documentElement.style.setProperty('--wish-bg', '#757575');
        cfg.rebirth.wishes = selectedWishes;
        postData('/app/config', cfg).then((data) => console.log(data));
      } else document.documentElement.style.setProperty('--wish-bg', '#a81f1f'); // red
    });
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
});
