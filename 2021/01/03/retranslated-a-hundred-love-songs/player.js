var lrc_names = ['lrc0', 'lrc1', 'lrc2', 'lrc3', 'lrc4'];

var lrcContainers = document.getElementsByClassName('lrc');

var ap = new APlayer({
  container: document.getElementById('aplayer'),
  audio: [{
    name: '百恋歌',
    artist: '高杉さと美',
    url: 'https://www.debuggerx.com/raw_assets/music/百恋歌.mp3',
    cover: 'cover.webp'
  }]
});

function getMillSec(time) {
  var _times = time.split(/[:|.]/i);
  return 10 * _times[2] + 1000 * _times[1] + 60000 * _times[0];
}

var lrcs = [];

var loadedCount = 0;

function lrcLoaded(name) {
  console.info(name + ' loaded');
  loadedCount++;
  if (loadedCount === lrc_names.length) {
    lrcs.sort(function (a, b) {
      return a.time - b.time;
    });
    lrcCtrl.index = 0;
  }
}


function loadLrc(name) {
  $.getJSON(name + '.json', function (lrc) {
    Object.keys(lrc).forEach(function (time) {
      var _time = getMillSec(time);
      var _lrc = lrcs.find(function (ele) {
        return ele.time === _time;
      })
      if (_lrc) {
        _lrc[name] = lrc[time];
      } else {
        _lrc = {
          time: _time,
        };
        _lrc[name] = lrc[time];
        lrcs.push(_lrc);
      }
    });
    lrcLoaded(name);
  });
}

lrc_names.forEach(function (name) {
  loadLrc(name);
})

function updateLrc(index) {
  if (index < lrcs.length) {
    for (let i = 0; i < lrcContainers.length; i++) {
      if (lrcContainers[i].style.display !== 'none') {
        lrcContainers[i].children[0].innerHTML = index <= 0 ? '' : lrcs[index - 1][lrcContainers[i].id];
        lrcContainers[i].children[1].innerHTML = lrcs[index][lrcContainers[i].id];
        lrcContainers[i].children[2].innerHTML = index + 1 >= lrcs.length ? '' : lrcs[index + 1][lrcContainers[i].id];
      }
    }
  }
}


var lrcCtrl = {};

Object.defineProperty(lrcCtrl, 'index', {
  enumerable: true,
  configurable: true,
  get: function () {
    return index;
  },
  set: function (val) {
    updateLrc(val);
    index = val;
  }
});

lrcCtrl.index = 0;

function updateProcess(time, tryIndex) {
  var _index = tryIndex || lrcCtrl.index;
  var _currentLrcNode = lrcs[_index];
  var _nextLrcNode = lrcs[_index + 1];

  if (time >= _currentLrcNode.time && time < (_nextLrcNode ? _nextLrcNode.time : Number.MAX_VALUE)) {
    tryIndex = _index;
  } else if (time < _currentLrcNode.time) {
    tryIndex = _index - 1;
    if (tryIndex > 0) return updateProcess(time, tryIndex);
  } else {
    tryIndex = _index + 1;
    return updateProcess(time, tryIndex);
  }
  if (tryIndex !== lrcCtrl.index) lrcCtrl.index = tryIndex;
}

ap.audio.addEventListener('timeupdate', function () {
  updateProcess(this.currentTime * 1000);
});

function showOrHideLrc(cbId, checked) {
  document.getElementById('lrc' + cbId.substr(-1)).style.display = checked ? "flex" : "none";
}