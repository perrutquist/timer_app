/* mode switching */
const listBtn  = document.getElementById('list-btn');
const timerBtn = document.getElementById('timer-btn');
const listSec = document.getElementById('list-mode');
const timerSec = document.getElementById('timer-mode');

function setMode(mode) {
  if (mode === 'list') {
    listSec.classList.remove('hidden');
    timerSec.classList.add('hidden');
  } else {
    timerSec.classList.remove('hidden');
    listSec.classList.add('hidden');
  }
}
listBtn.addEventListener('click', () => setMode('list'));
timerBtn.addEventListener('click', () => {
  // Switch to timer mode; reset only if the list content changed
  setMode('timer');

  if (listModified()) {
    timers = parseTimers();   // re-parse only when list differs
    currentIndex = 0;
    pause();                  // stop any running timer
    if (timers.length) {
      loadTimer(0);           // load first timer of the new list
    } else {
      remaining = 0;
      render();
    }
  }
});

/* multi–timer logic */
const listInput = document.getElementById('list-input');

let lastListSnapshot = listInput.value; // track text last time we parsed
function listModified() {
  return listInput.value !== lastListSnapshot;
}

const display = document.getElementById('timer-display');
const headingEl = document.getElementById('timer-heading');
const subheadingEl = document.getElementById('timer-subheading');
const nextInfoEl   = document.getElementById('timer-next');
const remainingInfoEl = document.getElementById('timer-remaining');

const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn  = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const copyBtn  = document.getElementById('copy-btn');
const pasteBtn = document.getElementById('paste-btn');

let timers = [];
let currentIndex = 0;
let remaining = 0;
let timerId = null;

function parseTimers() {
  const lines = listInput.value.split('\n').map(l => l.trim()).filter(Boolean);
  lastListSnapshot = listInput.value; // remember current version
  return lines.map(line => {
    const [time, title = '', subtitle = '', color = ''] = line.split(';').map(s => s.trim());
    let sec = 0;
    if (time.includes(':')) {
      const [m, s = '0'] = time.split(':');
      sec = parseInt(m, 10) * 60 + parseInt(s, 10);
    } else {
      sec = parseInt(time, 10);
    }
    return { duration: sec, title, subtitle, color };
  });
}

function format(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function render() {
  display.textContent = format(remaining);

  // update total remaining time
  const totalRemaining =
    remaining +
    timers.slice(currentIndex + 1).reduce((sum, t) => sum + t.duration, 0);

  remainingInfoEl.textContent =
    timers.length ? `Remaining: ${format(totalRemaining)}` : '';
}

function showCurrentInfo() {
  const t = timers[currentIndex] || {};
  headingEl.textContent = t.title || '';
  subheadingEl.textContent = t.subtitle || '';
  prevBtn.classList.toggle('disabled', currentIndex === 0);
  nextBtn.classList.toggle('disabled', currentIndex >= timers.length - 1);

  const nxt = timers[currentIndex + 1];
  nextInfoEl.textContent = nxt ? `Next: ${format(nxt.duration)} ${nxt.title}` : '';
}

function loadTimer(index) {
  currentIndex = index;
  remaining = timers[currentIndex].duration;
  document.body.style.backgroundColor = timers[currentIndex].color || '';
  render();
  showCurrentInfo();
}

function tick() {
  if (remaining > 0) {
    remaining--;
    render();
    if (remaining === 0) {
      if (currentIndex < timers.length - 1) {
        loadTimer(currentIndex + 1);
      } else {
        pause(); // finished
      }
    }
  }
}

function start() {
  timers = parseTimers();
  if (timers.length === 0) return;
  if (timerId === null) {
    if (remaining === 0) loadTimer(currentIndex);
    timerId = setInterval(tick, 1000);
    startBtn.classList.add('disabled');
    pauseBtn.classList.remove('disabled');
  }
}

function pause() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
    startBtn.classList.remove('disabled');
    pauseBtn.classList.add('disabled');
  }
}

function reset() {
  pause();
  loadTimer(currentIndex);
}

function next() {
  if (currentIndex < timers.length - 1) {
    pause();
    loadTimer(currentIndex + 1);
  }
}

function prev() {
  if (currentIndex > 0) {
    pause();
    loadTimer(currentIndex - 1);
  }
}

function restartList() {
  timers = parseTimers();
  if (timers.length === 0) return;
  pause();
  loadTimer(0);
}

async function copyList() {
  try {
    await navigator.clipboard.writeText(listInput.value);
  } catch (err) {
    alert('Failed to copy: ' + err);
  }
}

async function pasteList() {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      listInput.value = text;
    }
  } catch (err) {
    alert('Failed to paste: ' + err);
  }
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);
restartBtn.addEventListener('click', restartList);
copyBtn?.addEventListener('click', copyList);
pasteBtn?.addEventListener('click', pasteList);

// show install tip only on mobile browsers not already running standalone
const installTip = document.getElementById('install-tip');
function shouldShowInstallTip() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  return !isStandalone && isMobile;
}
if (installTip && shouldShowInstallTip()) {
  installTip.classList.remove('hidden');
}

// initial state
timers = parseTimers();
loadTimer(0);
pause();

/* service-worker registration for offline use */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
}
