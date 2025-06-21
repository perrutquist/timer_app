/* mode switching */
const listBtn   = document.getElementById('btn-list');
const timerBtn  = document.getElementById('btn-timer');
const listSec   = document.getElementById('list-mode');
const timerSec  = document.getElementById('timer-mode');

function setMode(mode){
    if(mode==='list'){
        listSec.classList.remove('hidden');
        timerSec.classList.add('hidden');
        listBtn.classList.add('active');
        timerBtn.classList.remove('active');
    }else{
        timerSec.classList.remove('hidden');
        listSec.classList.add('hidden');
        timerBtn.classList.add('active');
        listBtn.classList.remove('active');
    }
}
listBtn.addEventListener('click', () => setMode('list'));
timerBtn.addEventListener('click',()=>setMode('timer'));

/* simple 1-minute countdown */
let remaining = 60;          // seconds
let timerId   = null;

const display   = document.getElementById('timer-display');
const startBtn  = document.getElementById('start-btn');
const pauseBtn  = document.getElementById('pause-btn');
const resetBtn  = document.getElementById('reset-btn');

function render(){
    const m = String(Math.floor(remaining/60)).padStart(2,'0');
    const s = String(remaining%60).padStart(2,'0');
    display.textContent = `${m}:${s}`;
}

function tick(){
    if(remaining>0){
        remaining--;
        render();
        if(remaining===0) pause(); // auto-stop
    }
}

function start(){
    if(timerId===null){
        timerId = setInterval(tick,1000);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    }
}

function pause(){
    if(timerId!==null){
        clearInterval(timerId);
        timerId = null;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

function reset(){
    pause();
    remaining = 60;
    render();
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
render();

/* service-worker registration for offline use */
if('serviceWorker' in navigator){
    window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js'));
}
