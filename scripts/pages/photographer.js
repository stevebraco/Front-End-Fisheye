import getPhotographers from '../api/API.js';
import mediaFactory from '../factories/mediaFactory.js';
import photographerFactory from '../factories/photographerFactory.js';
import { createElement } from '../utils/createElement.js';

const displayDataGalleryPhotographer = async (fullInfoPhotograph) => {
  const main = document.querySelector('main');
  const gallerySection = createElement('section', ['gallery'], null, main);

  const sortByPopularity = fullInfoPhotograph.mediaPhotographer.sort(
    (a, b) => b.likes - a.likes
  );

  // DISPLAY GALLERIES PHOTOGRAPHER
  sortByPopularity.forEach((gallery) => {
    const firstName =
      fullInfoPhotograph.findPhotographWithID?.name.split(' ')[0];
    const mediaModel = mediaFactory({ gallery, firstName });

    // display photographer image or display photographer video
    const typeMedia = gallery.image
      ? mediaModel.getUserGalleryDOM()
      : mediaModel.getUserVideoDOM();
    gallerySection.appendChild(typeMedia);
  });
};

const displayDataLikesAndPrice = async (fullInfoPhotograph) => {
  const main = document.querySelector('main');

  const totalLikes = fullInfoPhotograph.mediaPhotographer.reduce(
    (prevValue, currentValue) => prevValue + currentValue.likes,
    0
  );
  const price = fullInfoPhotograph.findPhotographWithID.price;
  const photographerModel = photographerFactory({ totalLikes, price });
  // display Price and likes for a photographer photographer.html
  const likeAndPriceDom = photographerModel.getLikeAndPriceDOM();
  main.appendChild(likeAndPriceDom);
};

async function displayLightBox() {
  const main = document.querySelector('main');

  const mediaModel = mediaFactory();

  // Display Lightbox
  const lightBoxDOM = mediaModel.getLightBoxModalDOM();

  main.appendChild(lightBoxDOM);
}

async function displaySortForm(mediaPhotographer) {
  const mediaModel = mediaFactory(mediaPhotographer);
  // Filter media
  mediaModel.getSortFormDOM();
}

async function displayChangeSort(mediaPhotographer) {
  const mediaModel = mediaFactory(mediaPhotographer);
  const gallerySection = document.querySelector('.gallery');

  document.querySelector('form').addEventListener('change', (e) => {
    const dataFilter = mediaModel.onChangeFilter(e);

    dataFilter.forEach((gallery) => {
      // const firstName = fullInfoPhotograph.findPhotographWithID?.name.split(' ')[0];
      const mediaModel = mediaFactory({ gallery, firstName: 'Mimi' });
      // display photographer image or display photographer video
      const typeMedia = gallery.image
        ? mediaModel.getUserGalleryDOM()
        : mediaModel.getUserVideoDOM();
      gallerySection.appendChild(typeMedia);
    });
  });
}

async function init() {
  // Fetch id Url
  const id = window.location.href.split('?id=')[1];

  // Récupère les datas des photographes et media
  const { photographers, media } = await getPhotographers();

  // photograph's media
  const mediaPhotographer = media.filter((media) => media.photographerId == id);

  // find photographer
  const findPhotographWithID = photographers.find(
    (photographer) => photographer.id == id
  );

  const fullInfoPhotograph = { mediaPhotographer, findPhotographWithID };

  displaySortForm(mediaPhotographer);
  displayDataGalleryPhotographer(fullInfoPhotograph);
  displayChangeSort(mediaPhotographer);
  displayDataLikesAndPrice(fullInfoPhotograph);
  displayLightBox();
}

init();
