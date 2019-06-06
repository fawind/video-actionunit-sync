(function main() {
  const videoA = document.querySelector('#vidA');
  const videoB = document.querySelector('#vidB');
  const inputA = document.querySelector('#inA');
  const inputB = document.querySelector('#inB');
  const playBtn = document.querySelector('#play');
  const pauseBtn = document.querySelector('#pause');
  const loadDataBtn = document.querySelector('#load-data');

  const chart = createChart(data_x => onChartClick(data_x, [videoA, videoB]));

  loadDataBtn.addEventListener('click', () => loadData(chart));
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

  addVideoEventListener(videoA, inputA, () => onTick(chart, videoA));
  addVideoEventListener(videoB, inputB, () => {});
})()

function onChartClick(data_x, videos) {
  videos.forEach(video => video.currentTime = data_x);
}

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
          connectorAllowed: false,
        },
        point: {
          events: {
            click: e => onClick(e.point.x),
          },
        },
      },
    },
    yAxis: [
      { title: { text: 'Heart Rate'} },
      { title: { text: 'Action Units'} },
    ],
    xAxis: {
      plotLines: [
        {
          color: 'red',
          dashStyle: 'longdashdot',
          value: 0,
          width: 2,
        },
      ],
    },
    series: [],
  });
}

function addVideoEventListener(video, inputBtn, cb) {
  inputBtn.addEventListener('change', () => {
    const URL = window.URL || window.webkitURL
    const file = inputBtn.files[0]
    const fileURL = URL.createObjectURL(file)
    video.src = fileURL
    cb()
  }, false)
}

function loadData(chart) {
  measurements = JSON.parse(prompt("Please enter the measurements JSON dump:"))
  console.log(measurements)
  chart.addSeries({
    name: 'Heart Rate',
    data: measurements.heartRate.data,
    yAxis: 0,
    color: 'red',
  }, true);
  measurements.actionUnits.forEach(unit => chart.addSeries({
      name: unit.name,
      data: unit.data,
      yAxis: 1,
  }));
}

