let startTime;
let elapsedTime = 0;
let timerId;
let isRunning = false;


// 時間
function updateTimer() {
  const now = Date.now();
  const diff = now - startTime + elapsedTime;

  const ms = diff % 1000;
  const s = Math.floor(diff / 1000) % 60;
  const m = Math.floor(diff / 60000) % 60;
  const h = Math.floor(diff / 3600000);

  $('#timer').text(
    `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(ms).padStart(3, '0')}`
  );
}


// スタート
$('#start').on('click', function () {
  if (isRunning) return;
  isRunning = true;

  startTime = Date.now();
  timerId = setInterval(updateTimer, 10);

  $('#start').prop('disabled', true);
  $('#stop').prop('disabled', false);
});


// ストップ
$('#stop').on('click', function () {
  if (!isRunning) return;
  isRunning = false;

  clearInterval(timerId);
  elapsedTime += Date.now() - startTime;

  $('#start').prop('disabled', false);
  $('#stop').prop('disabled', true);
});


// リセット
$('#reset').on('click', function () {
  clearInterval(timerId);
  startTime = null;
  elapsedTime = 0;
  isRunning = false;
  $('#timer').text('00:00:00:000');

  $('#start').prop('disabled', false);
  $('#stop').prop('disabled', true);
});
