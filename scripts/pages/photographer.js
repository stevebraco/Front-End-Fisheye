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

// Display dropdown
const displayDropDownSelect = () => {
  const wrapperForm = document.querySelector('.form');
  const mediaModel = mediaFactory();

  // Dropdown model
  const getDropDownSelectDOM = mediaModel.getDropDownSelectDOM();
  wrapperForm.appendChild(getDropDownSelectDOM);
};

// Update gallery with dropdown
const UpdateGalleryBySort = (value, mediaPhotographer, firstName, price) => {
  // Data by sort
  const copyData = sortSelectForm(value, mediaPhotographer);

  // clear gallery
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
    // to manage class select
    const isSelectedBySort = () => {
      textBox.value = value.innerText;
      let current = document.getElementsByClassName('selected')[0];
      current.classList.remove('selected');
      value.classList.add('selected');
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

    value.addEventListener('keyup', (e) => {
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

  dropdown.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowDown') {
      dropdown.classList.add('active');
    }
  });

  // When Dropdown Open (active)
  onActiveDropdown();
};

const displayGalleryMedia = (mediaPhotographer, photographer) => {
  const firstName = photographer.name.split(' ')[0];
  const main = document.querySelector('main');
  createElement('section', ['gallery'], null, main);

  typeMediaGallery(mediaPhotographer, firstName);

  buttonLikes(mediaPhotographer, photographer.price);
};

// Button icon heart
const buttonLikes = (mediaPhotographer, price) => {
  const btnLikes = document.querySelectorAll('.btn-likes');
  btnLikes.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const data = incrementDecrement(btn, mediaPhotographer, index);
      displayLikeAndPriceDOM(data, price);
    });
  });
};

// Diplay total likes / price
const displayLikeAndPriceDOM = (mediaPhotographer, pricePhotographer) => {
  const main = document.querySelector('main');

  const mediaModel = mediaFactory(mediaPhotographer);
  const getLikeAndPriceDOM = mediaModel.getLikeAndPriceDOM(pricePhotographer);

  main.appendChild(getLikeAndPriceDOM);
};

// Display Lightbox
const displayLightBoxModal = (mediaPhotographer) => {
  const main = document.querySelector('main');

  const mediaModel = mediaFactory(mediaPhotographer);
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
