import photographerFactory from '../factories/photographerFactory.js';
import { getPhotographers } from '../API/api.js';

async function displayData(photographers) {
  console.log('coucou');
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);

    // Fetch id Url
    let params = new URL(document.location).searchParams;
    let id = parseInt(params.get('id'));

    if (id && photographer.id == id) {
      const main = document.querySelector('#main');
      const userHeaderDOM = photographerModel.getUserHeaderDOM();
      main.appendChild(userHeaderDOM);
    } else {
      console.log('index.html');
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection?.appendChild(userCardDOM);
    }
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
