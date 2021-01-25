import click from './click.js';
import { button, positions } from './uxpos.js';

const ngu = async (data, ngumode) => {
  // ngu
  await button(data, positions.NGU.Menu);
  await button(
    data,
    ngumode === 'evil' ? positions.NGU.EvilCheck : positions.NGU.SadCheck
  );
  await button(data, positions.NGU.CapAll);

  // pp minus, todo weg wenn sad cap
  if (ngumode != 'evil') await click(data, 555, 520);

  await button(data, positions.NGU.SwitchMode);
  await button(data, positions.NGU.CapAll);

  // adv ß minus, todo weg wenn sad cap
  if (ngumode !== 'evil') await click(data, 555, 450);
};

export default ngu;
