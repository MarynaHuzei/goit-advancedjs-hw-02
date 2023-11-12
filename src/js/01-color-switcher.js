const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onStart() {
  timerId = setInterval(getBodyColor, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function onStop() {
  clearInterval(timerId);
  stopBtn.disabled = true;
  startBtn.disabled = false;
}

function getBodyColor() {
  body.style.backgroundColor = getRandomHexColor();
}
