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

getData('/config.json').then((config) => {
  const selectedWishes = config.rebirth.wishes;

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
          if (selectedWishes[i] === element.innerHTML) {
            selectedWishes.splice(i, 1);
          }
        }
      } else {
        element.classList.add('selected-wish');
        selectedWishes.push(element.innerHTML);
      }

      if (selectedWishes.length === 4) {
        document.documentElement.style.setProperty('--wish-bg', '#757575');
        config.rebirth.wishes = selectedWishes;
        postData('/app/config', config).then((data) => console.log(data));
      } else document.documentElement.style.setProperty('--wish-bg', '#a81f1f');
    });
  });

  // TIME MACHINE (1)
  document.getElementById('rmode1').addEventListener('click', () => {
    getData('/app/1/1').then((data) => console.log(data));
  });

  // AUGS (1)
  document.getElementById('rmode2').addEventListener('click', () => {
    getData('/app/1/2').then((data) => console.log(data));
  });

  // WISHES (1)
  document.getElementById('rmode3').addEventListener('click', () => {
    getData('/app/1/3').then((data) => console.log(data));
  });

  // IDLE (2)
  document.getElementById('mode2').addEventListener('click', () => {
    getData('/app/2').then((data) => console.log(data));
  });

  // GUFFS (3)
  document.getElementById('mode3').addEventListener('click', () => {
    getData('/app/3').then((data) => console.log(data));
  });

  // SNIPE (4)
  document.getElementById('mode4').addEventListener('click', () => {
    getData('/app/4').then((data) => console.log(data));
  });

  // QUEST (5)
  document.getElementById('mode5').addEventListener('click', () => {
    getData('/app/5').then((data) => console.log(data));
  });

  // create table element in CONFIG
  const table = document.createElement('table');
  table.setAttribute('style', 'width: 100%');
  document.getElementById('config').appendChild(table);
});
