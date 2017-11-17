const getStartTime = gpxArray => gpxArray[0].time;

const getEndTime = gpxArray => gpxArray[gpxArray.length - 1].time;

const getDuration = (end, start) => {
  return end.getTime() - start.getTime();
};

function msToTimestamp(duration) {
  const ms = parseInt((duration % 1000) / 100);
  let s = parseInt((duration / 1000) % 60);
  let m = parseInt((duration / (1000 * 60)) % 60);
  let h = parseInt((duration / (1000 * 60 * 60)) % 24);

  h = !h ? '' :
      (h < 10) ? '0' + h + ':' : h + ':';
  m = (m < 10) ? '0' + m : m;
  s = (s < 10) ? '0' + s : s;

  return h + m + ':' + s;
}

module.exports = { getStartTime, getEndTime, getDuration, msToTimestamp };
