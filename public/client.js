/* global fetch:false document:false*/

// const postData = async (url = '', data = {}) => {
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   return response.json();
// };

// postData('/rebirth', { rmode: 1 }).then((data) => {
//   console.log(data);
// });

const getData = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
  });
  return response.json();
};

// TIME MACHINE
document.getElementById('rmode1').addEventListener('click', () => {
  getData('/rebirth/1').then((data) => console.log(data));
});

// AUGS
document.getElementById('rmode2').addEventListener('click', () => {
  getData('/rebirth/2').then((data) => console.log(data));
});

// WISHES
document.getElementById('rmode3').addEventListener('click', () => {
  getData('/rebirth/3').then((data) => console.log(data));
}); // todo in einer form, checkboxes für wishes, 3 button ist submit post oder get?
