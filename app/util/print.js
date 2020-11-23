const cp = (data, msg, err) => {
  console.log(msg);
  if (err === true) {
    const res = { ...data.response('error', 0, msg) };
    data.broadcast(res);
    process.exit();
  }
};

export default cp;
