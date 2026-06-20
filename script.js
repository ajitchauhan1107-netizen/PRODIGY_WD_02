let running = false;
let startTime = 0;
let elapsed = 0;
let timerId = null;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsEl = document.getElementById('laps');

function formatTime(ms) {
  const totalCentiseconds = Math.floor(ms / 10);
  const centiseconds = totalCentiseconds % 100;
  const totalSeconds = Math.floor(totalCentiseconds / 100);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);

  const pad = (num, len) => String(num).padStart(len, '0');
  return `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(centiseconds, 2)}`;
}

function tick() {
  const now = Date.now();
  display.textContent = formatTime(elapsed + (now - startTime));
  timerId = requestAnimationFrame(tick);
}

function toggleStart() {
  if (!running) {
    running = true;
    startTime = Date.now();
    startBtn.textContent = 'Pause';
    lapBtn.disabled = false;
    timerId = requestAnimationFrame(tick);
  } else {
    running = false;
    elapsed += Date.now() - startTime;
    cancelAnimationFrame(timerId);
    startBtn.textContent = 'Resume';
  }
}

function resetStopwatch() {
  running = false;
  cancelAnimationFrame(timerId);
  elapsed = 0;
  laps = [];
  display.textContent = '00:00.00';
  startBtn.textContent = 'Start';
  lapBtn.disabled = true;
  renderLaps();
}

function addLap() {
  const current = elapsed + (running ? (Date.now() - startTime) : 0);
  laps.unshift({ number: laps.length + 1, time: current });
  renderLaps();
}

function renderLaps() {
  lapsEl.innerHTML = laps
    .map(
      (lap) =>
        `<li><span>Lap ${lap.number}</span><span class="lap-time">${formatTime(lap.time)}</span></li>`
    )
    .join('');
}

startBtn.addEventListener('click', toggleStart);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', addLap);
