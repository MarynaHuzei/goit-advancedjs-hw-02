import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmitForm(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);

  for (let i = 1; i <= inputAmount; i += 1) {
    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        iziToast.success({
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
          position: 'topRight',
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          message: `❌ Rejected promise ${position} in ${delay}ms`,
          position: 'topRight',
        });
      });
    inputDelay += inputStep;
  }
  evt.currentTarget.reset();
}
