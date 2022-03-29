import { modalAriaClose, modalAriaOpen } from './utils.js';

const modal = document.getElementById('contact_modal');
const main = document.getElementById('main');
const body = document.querySelector('body');

// modal contact open
export const displayModal = () => {
  main.setAttribute('aria-hidden', true);
  modal.setAttribute('aria-hidden', false);
  body.classList.add('no-scroll');
  modal.style.display = 'block';
};

// modal contact close
export const closeModal = () => {
  main.setAttribute('aria-hidden', false);
  modal.setAttribute('aria-hidden', true);
  body.classList.remove('no-scroll');
  modal.style.display = 'none';
};

export const onClickKeyboardModal = () => {
  const btnOpenModal = document.querySelector('.contact_button');
  const btnCloseModal = document.querySelector('.modal__close');
  const form = document.querySelector('#btn-submit');
  const inputs = document.querySelectorAll('.modal__value');

  const modal = document.getElementById('contact_modal');

  // Open form modal Click
  btnOpenModal.addEventListener('click', () => {
    modalAriaOpen(modal);
  });

  // Open form modal keyboard
  btnOpenModal.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
      inputs[0].focus();
      modalAriaOpen(modal);
    }

    if (e.code === 'Escape') {
      modalAriaClose(modal);
      btnOpenModal.focus();
    }
  });

  // Close form modal Click
  btnCloseModal.addEventListener('click', () => {
    modalAriaClose(modal);
  });

  // Close form modal keyboard
  modal.addEventListener('keyup', (e) => {
    if (e.code === 'Escape') {
      modalAriaClose(modal);
      btnOpenModal.focus();
    }
  });

  // Form data user click
  form.addEventListener('click', (e) => {
    e.preventDefault();
    let error = 0;
    inputs.forEach((input) => {
      if (input.value === '') error += 1;
    });

    inputs.forEach((input) => {
      if (!error) {
        console.log(`${input.parentElement.innerText}: ${input.value}`);
        input.value = '';
      } else {
        e.preventDefault();
      }
    });
    modalAriaClose(modal);
  });

  // Form data user keyboard
  form.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
      modalAriaClose(modal);
      btnOpenModal.focus();
    }
  });
};
