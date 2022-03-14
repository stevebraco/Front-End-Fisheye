import photographerFactory from '../factories/photographerFactory.js';
import { photographers } from '../API/api.js';
import { onClickKeyboardModal } from '../utils/contactForm.js';

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
      onClickKeyboardModal();
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
