(function main() {
  const videoA = document.querySelector('#vidA')
  const videoB = document.querySelector('#vidB')
  const inputA = document.querySelector('#inA')
  const inputB = document.querySelector('#inB')
  const playBtn = document.querySelector('#play')
  const pauseBtn = document.querySelector('#pause')

  const chart = createChart((x) => {
    videoB.currentTime = x;
    videoA.currentTime = x;
  });

  playBtn.addEventListener('click', () => {
    videoB.currentTime = videoA.currentTime;
    videoA.play();
    videoB.play();
  });
  pauseBtn.addEventListener('click', () => {
    videoA.pause();
    videoB.pause();
    videoB.currentTime = videoA.currentTime;
  });

  addVideoLoad(videoA, inputA, () => onTick(chart, videoA));
  addVideoLoad(videoB, inputB, () => {});
})()

function onTick(chart, videoElem) {
  chart.xAxis[0].options.plotLines[0].value = videoElem.currentTime;
  chart.xAxis[0].update();
  setTimeout(() => onTick(chart, videoElem), 500)
}

function createChart(onClick) {
  return Highcharts.chart('chart-container', {
    title: { text: "" },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        point: {
          events: {
            click: function(e) {
              console.log(e)
              onClick(e.point.x)
            }
          }
        }
      }
    },
    yAxis: [
      { title: { text: 'Heart Rate'} },
      { title: { text: 'Action Units'} },
    ],
    xAxis: {
      plotLines: [{
        color: 'red',
        dashStyle: 'longdashdot',
        value: 0,
        width: 2,
      }],
    },
    series: [
      {
        name: 'Heart Rate',
        data: window.d_heartrate,
        yAxis: 0,
        color: 'red',
      },
      {
        name: 'AU06_r',
        data: window.d_AU06_r,
        yAxis: 1,
      },
      {
        name: 'AU12_r',
        data: window.d_AU12_r,
        yAxis: 1,
      },
      {
        name: 'AU15_r',
        data: window.d_AU15_r,
        yAxis: 1,
      },
      {
        name: 'AU04_r',
        data: window.d_AU04_r,
        yAxis: 1,
      },
      {
        name: 'AU01_r',
        data: window.d_AU01_r,
        yAxis: 1,
      },
    ],
  });
}

function addVideoLoad(videoNode, inputNode, cb) {
  const URL = window.URL || window.webkitURL
  const playSelectedFile = function (event) {
    const file = this.files[0]
    const fileURL = URL.createObjectURL(file)
    videoNode.src = fileURL
    cb()
  }

  inputNode.addEventListener('change', playSelectedFile, false)
}

