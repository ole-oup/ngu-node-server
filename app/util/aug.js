const ga = (data) => {
  const result = {};

  const { aug } = data.cfg;
  switch (Number(aug)) {
    case 1:
      result.x = 538;
      result.y = 263;
      result.ux = 538;
      result.uy = 289;
      break;
    case 2:
      result.x = 538;
      result.y = 327;
      result.ux = 538;
      result.uy = 356;
      break;
    case 3:
      result.x = 538;
      result.y = 392;
      result.ux = 538;
      result.uy = 420;
      break;
    case 4:
      result.x = 538;
      result.y = 457;
      result.ux = 538;
      result.uy = 486;
      break;
    case 5:
      result.x = 538;
      result.y = 523;
      result.ux = 538;
      result.uy = 551;
      break;
    case 6:
      result.x = 538;
      result.y = 448;
      result.ux = 538;
      result.uy = 476;
      break;
    case 7:
      result.x = 538;
      result.y = 512;
      result.ux = 538;
      result.uy = 542;
      break;
  }

  return result;
};

export default ga;
