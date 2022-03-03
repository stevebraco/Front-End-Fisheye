//Mettre le code JavaScript lié à la page photographer.html
import mediaFactory from '../factories/mediaFactory.js';
import { photographers, media } from '../API/api.js';
import {
  createElement,
  incrementDecrement,
  onActiveDropdown,
  sortSelectForm,
} from '../utils/utils.js';
import { typeMediaGallery } from '../utils/elementLightbox.js';

const displayDropDownSelect = () => {
  const wrapperForm = document.querySelector('.form');
  const mediaModel = mediaFactory();
  // Sort Gallery
  const getDropDownSelectDOM = mediaModel.getDropDownSelectDOM();
  wrapperForm.appendChild(getDropDownSelectDOM);
};

const UpdateGalleryBySort = (value, mediaPhotographer, firstName, price) => {
  const copyData = sortSelectForm(value, mediaPhotographer);

  const mediaModel = mediaFactory();
  mediaModel.clearGallerySection();

  typeMediaGallery(copyData, firstName);
  displayLightBoxModal(copyData);
  buttonLikes(copyData, price);
};

const UpdateDisplaySortDOM = (mediaPhotographer, findPhotographWithID) => {
  const optValue = document.querySelectorAll('.option-value');
  const textBox = document.querySelector('.textBox');
  const firstName = findPhotographWithID.name.split(' ')[0];
  const dropdown = document.querySelector('.dropdown');
  const body = document.querySelector('body');

  optValue.forEach((value) => {
    const isSelectedBySort = () => {
      textBox.value = value.innerText;
      let current = document.getElementsByClassName('selected');
      current[0].className = current[0].className.replace(' selected', '');
      value.className += ' selected';
    };

    // Event
    value.addEventListener('click', () => {
      isSelectedBySort();
      UpdateGalleryBySort(
        value.innerText,
        mediaPhotographer,
        firstName,
        findPhotographWithID.price
      );
    });

    value.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        textBox.value = e.target.innerText;
        isSelectedBySort();
        UpdateGalleryBySort(
          e.target.innerText,
          mediaPhotographer,
          firstName,
          findPhotographWithID.price
        );
      }
    });
  });

  dropdown.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowDown') {
      dropdown.classList.add('active');
    }
  });

  onActiveDropdown();
};

const displayGalleryMedia = (mediaPhotographer, photographer) => {
  const firstName = photographer.name.split(' ')[0];
  const main = document.querySelector('main');
  createElement('section', ['gallery'], null, main);

  typeMediaGallery(mediaPhotographer, firstName);

  buttonLikes(mediaPhotographer, photographer.price);
};

const buttonLikes = (mediaPhotographer, price) => {
  const btnLikes = document.querySelectorAll('.btn-likes');
  btnLikes.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const data = incrementDecrement(btn, mediaPhotographer, index);
      displayLikeAndPriceDOM(data, price);
    });
  });
};

const displayLikeAndPriceDOM = (mediaPhotographer, pricePhotographer) => {
  const main = document.querySelector('main');

  const mediaModel = mediaFactory(mediaPhotographer);
  const getLikeAndPriceDOM = mediaModel.getLikeAndPriceDOM(pricePhotographer);

  main.appendChild(getLikeAndPriceDOM);
};

const displayLightBoxModal = (mediaPhotographer) => {
  const main = document.querySelector('main');

  const mediaModel = mediaFactory(mediaPhotographer);

  // Display Lightbox
  const lightBoxDOM = mediaModel.getLightBoxModalDOM();

  main.appendChild(lightBoxDOM);
};

const init = async () => {
  // Fetch id Url
  let params = new URL(document.location).searchParams;
  let id = parseInt(params.get('id'));

  // find photographer with ID
  const findPhotographWithID = photographers.find(
    (photographer) => photographer.id == id
  );

  // photograph's media
  const mediaPhotographer = media.filter((media) => media.photographerId == id);

  displayDropDownSelect();
  displayGalleryMedia(mediaPhotographer, findPhotographWithID);
  displayLikeAndPriceDOM(mediaPhotographer, findPhotographWithID.price);
  displayLightBoxModal(mediaPhotographer);
  UpdateDisplaySortDOM(mediaPhotographer, findPhotographWithID);
};

init();
