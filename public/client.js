/* global fetch:false document:false*/

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

const getData = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
  });
  return response.json();
};

// TIME MACHINE (1)
document.getElementById('rmode1').addEventListener('click', () => {
  getData('/app/1/1').then((data) => console.log(data));
});

// AUGS (!)
document.getElementById('rmode2').addEventListener('click', () => {
  getData('/app/1/2').then((data) => console.log(data));
});

// WISHES (1)
document.getElementById('rmode3').addEventListener('click', () => {
  console.log(document.querySelectorAll('.wish'));
  // postData('/app/1/3', wishes).then((data) => console.log(data));
});

// IDLE (2)
document.getElementById('m2').addEventListener('click', () => {
  getData('/app/2').then((data) => console.log(data));
});
