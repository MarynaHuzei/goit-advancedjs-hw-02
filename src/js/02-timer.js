import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let timerId = null;
let timeDifference = 0;
let formatDate = null;

startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', onStartBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDifferenceDate(selectedDates[0]);
  },
};

flatpickr(input, options);

function onStartBtn() {
  timerId = setInterval(startTimer, 1000);
}

function startTimer() {
  startBtn.setAttribute('disabled', true);
  input.setAttribute('disabled', true);
  timeDifference -= 1000;
  if (minutes.textContent <= 0 && seconds.textContent <= 0) {
    iziToast.success({ message: 'Time end ⌛', position: 'topCenter' });
    clearInterval(timerId);
    input.removeAttribute('disabled');
  } else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);
  }
}

function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();
  if (selectedDates < currentDate) {
    startBtn.setAttribute('disabled', true);
    return iziToast.error({
      message: 'Please choose a date in the future',
      position: 'topCenter',
    });
  }
  timeDifference = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDifference);
  renderDate(formatDate);
  startBtn.removeAttribute('disabled');
}

function renderDate(formatDate) {
  seconds.textContent = formatDate.seconds;
  minutes.textContent = formatDate.minutes;
  hours.textContent = formatDate.hours;
  days.textContent = formatDate.days;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
