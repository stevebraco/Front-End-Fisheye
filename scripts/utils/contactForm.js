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
