export default {
  yAxesHelper(data) {
    let gv = -Infinity;
    let lv = Infinity;
    data.map(v => {
      gv = Math.max(v, gv);
      lv = Math.min(v, lv);
    });
    if (gv === -Infinity || lv === Infinity) {
      return false;
    }
    let mv = Math.round((gv - lv) / 2);
    gv = Math.round(gv + mv);
    lv = Math.round(lv - mv);
    const dis = (gv - lv) / 10;
    const step = 10000 * Math.round(dis / 10000) || 10000;
    return {
      gv,
      lv,
      dis,
      step,
      startValue: data[0],
      endValue: data[data.length - 1]
    };
  }
};
