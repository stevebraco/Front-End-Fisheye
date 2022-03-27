import photographerFactory from '../factories/photographerFactory.js';
import { photographers } from '../API/api.js';
import { onClickKeyboardModal } from '../utils/contactForm.js';
import { fetchIdUrl } from '../utils/utils.js';

async function displayData(photographers) {
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);

    // Fetch id Url
    let id = fetchIdUrl();

    // Info photographer on page photographer
    if (photographer.id === id) {
      const containerPhotograph = document.querySelector('.photograph');
      const contactModal = document.querySelector('#contact_modal');

      // Info user model
      const userHeaderDOM = photographerModel.getUserHeaderDOM();
      containerPhotograph.innerHTML = userHeaderDOM;

      // Form contact modal
      const modalContactFormDOM = photographerModel.getModalContactFormDOM();
      contactModal.innerHTML = modalContactFormDOM;
      onClickKeyboardModal();
    } else {
      // page html
      const photographersSection = document.querySelector(
        '.photographer_section'
      );

      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection?.appendChild(userCardDOM);
    }
  });
}

const init = async () => {
  displayData(photographers);
};

init();
