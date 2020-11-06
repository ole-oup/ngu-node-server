import screenshot from 'screenshot-desktop';

import cp from './util/print';

const remote = (state) => {
  screenshot()
    .then((img) => {})
    .catch((err) => {
      cp(err, true);
    });
};

export default remote;
