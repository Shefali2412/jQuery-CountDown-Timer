let hour = 0,
  minutes = 24,
  seconds = 0,
  workTime = 25,
  timerOn = false;

const timerLoop = () => {
  const wav = 'alarm.wav';
  const audio = new Audio(wav);

  if (timerOn) {
    if (hour < 10) {
      $('#hours').text('0' + hour);
    } else {
      $('#hours').text(hour);
    }
    if (minutes < 10) {
      $('#minutes').text('0' + minutes);
    } else {
      $('#minutes').text(minutes);
    }

    if (seconds > 0 || minutes > 0 || hour > 0) {
      if (seconds === 0) {
        seconds = 59;
        if (minutes > 0) {
          minutes -= 1;
        } else if (hour > 0) {
          hour -= 1;
          minutes = 59;
        }
      } else {
        seconds -= 1;
      }

      $('#seconds').text(seconds < 10 ? '0' + seconds : seconds);
      setTimeout(timerLoop, 1000);
    } else {
      audio.play();
      timerOn = false;
      $('#clockStatus').text('Click to start again!');
    }
  }
};

$('#workPlus').click(function () {
  workTime += 1;
  if (workTime > 60) {
    hour = parseInt(workTime / 60);
    minutes = parseInt(workTime % 60);
  } else {
    minutes = workTime;
  }
  seconds = 0;
  $('#workTime').text(workTime + ' min');
});

$('#reset').click(function () {
  timerOn = false;
  $('#clockStatus').text('Click to start again!');
  $('#hours').text('00');
  $('#minutes').text('25');
  $('#seconds').text('00');
  hour = 0;
  minutes = 24;
  seconds = 0;
  workTime = 25;
  $('#workTime').text(workTime + ' min');
});

$('#workMinus').click(function () {
  if (workTime > 0) {
    workTime -= 1;
    if (workTime > 60) {
      hour = parseInt(workTime / 60);
      minutes = parseInt(workTime % 60);
    } else {
      hour = 0;
      minutes = workTime;
    }
    seconds = 0;
    $('#workTime').text(workTime + ' min');
  }
});

$('#circleClock').click(function () {
  if (timerOn) {
    timerOn = false;
    $('#clockStatus').text('Click to start again!');
  } else {
    timerOn = true;
    timerLoop();
    $('#clockStatus').text('Timer is running...');
  }
});


