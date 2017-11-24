const getStartTime = gpxArray => gpxArray[0].time;

const getEndTime = gpxArray => gpxArray[gpxArray.length - 1].time;

const getDuration = (end, start) => {
  return (end.getTime() - start.getTime()) / 1000;
};

function sToTimestamp(duration) {
  let s = parseInt(duration % 60);
  let m = parseInt((duration / 60) % 60);
  let h = parseInt((duration / (60 * 60)) % 24);

  h = !h ? '' :
      (h < 10) ? '0' + h + ':' : h + ':';
  m = (m < 10) ? '0' + m : m;
  s = (s < 10) ? '0' + s : s;

  return h + m + ':' + s;
}

module.exports = { getStartTime, getEndTime, getDuration, sToTimestamp };
