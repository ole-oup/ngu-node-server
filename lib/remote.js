import screenshot from 'screenshot-desktop';

import cp from './util/print.js';

const remote = () => {
  screenshot()
    .then((img) => {
      return img;
    })
    .catch((err) => {
      cp(err, true);
    });
};

export default remote;
