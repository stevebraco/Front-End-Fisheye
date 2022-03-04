import photographerFactory from '../factories/photographerFactory.js';
import { photographers } from '../API/api.js';
import { modalAriaClose, modalAriaOpen } from '../utils/utils.js';

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);

    // Fetch id Url
    let params = new URL(document.location).searchParams;
    let id = parseInt(params.get('id'));

    // Info photographer on page photographer
    if (id && photographer.id == id) {
      const containerPhotograph = document.querySelector('.photograph');
      const contactModal = document.querySelector('#contact_modal');

      // Info user model
      const userHeaderDOM = photographerModel.getUserHeaderDOM();
      containerPhotograph.innerHTML = userHeaderDOM;

      // Form contact modal
      const modalContactFormDOM = photographerModel.getModalContactFormDOM();
      contactModal.innerHTML = modalContactFormDOM;

      const btnOpenModal = document.querySelector('.contact_button');
      const btnCloseModal = document.querySelector('.modal__close');
      const form = document.querySelector('#btn-submit');
      const input = document.querySelectorAll('.modal__value');

      const modal = document.getElementById('contact_modal');

      // Open modal
      btnOpenModal.addEventListener('click', () => {
        // displayModal();
        modalAriaOpen(modal);
        btnCloseModal.focus();
      });

      // Close modal
      btnCloseModal.addEventListener('click', () => {
        modalAriaClose(modal);
      });

      //Tap keyboard
      btnCloseModal.addEventListener('keyup', (e) => {
        if (e.code === 'Escape') {
          modalAriaClose(modal);
          btnOpenModal.focus();
        }
      });

      // Form data user
      form.addEventListener('click', (e) => {
        e.preventDefault();
        input.forEach((element) => {
          console.log(`${element.parentElement.innerText}: ${element.value}`);
        });
        modalAriaClose(modal);
      });
    } else {
      // index.html
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection?.appendChild(userCardDOM);
    }
  });
}

const init = async () => {
  // Récupère les datas des photographes
  displayData(photographers);
};

init();
