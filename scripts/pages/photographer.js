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
const UpdateGalleryBySort = (
  optionText,
  mediaPhotographer,
  firstName,
  price
) => {
  // mediaPhotographer by sort
  const sortMediaPhotographer = sortSelectForm(optionText, mediaPhotographer);

  // clear gallery
  const mediaModel = mediaFactory();
  mediaModel.clearGallerySection();

  // update type media
  typeMediaGallery(sortMediaPhotographer, firstName);

  // update lightbox
  displayLightBoxModal(sortMediaPhotographer);

  //update button
  buttonLikes(sortMediaPhotographer, price);
};

const UpdateDisplayDropdown = (mediaPhotographer, findPhotographWithID) => {
  const optValue = document.querySelectorAll('.option-value');
  const input = document.querySelector('.textBox');
  const firstName = findPhotographWithID.name.split(' ')[0];
  const dropdown = document.querySelector('.dropdown');
  const body = document.querySelector('body');

  optValue.forEach((value) => {
    // manipulation class select
    const isSelectedBySort = () => {
      input.value = value.innerText;
      let current = document.getElementsByClassName('selected')[0];
      current.classList.remove('selected');
      value.classList.add('selected');
    };

    // Event click
    value.addEventListener('click', () => {
      isSelectedBySort();
      UpdateGalleryBySort(
        value.innerText,
        mediaPhotographer,
        firstName,
        findPhotographWithID.price
      );
    });

    // Event keyboard update on keyboard
    value.addEventListener('keyup', (e) => {
      if (e.code === 'Enter') {
        input.value = e.target.innerText;
        isSelectedBySort();
        UpdateGalleryBySort(
          e.target.innerText,
          mediaPhotographer,
          firstName,
          findPhotographWithID.price
        );

        body.classList.remove('no-scroll');
        dropdown.focus();
      }
    });
  });
  // Event keyboard
  let index = 0;
  dropdown.addEventListener('keyup', (e) => {
    if (!dropdown.classList.contains('active')) {
      if (e.code === 'Enter') {
        body.classList.add('no-scroll');
      }
      if (e.code === 'ArrowDown') {
        body.classList.add('no-scroll');
        dropdown.classList.add('active');
      }
    } else {
      if (e.code === 'ArrowDown') {
        body.classList.add('no-scroll');
        const optValue = document.querySelectorAll(
          '.option-value:not(.selected)'
        );

        optValue[index++].focus();
        if (index === 2) {
          index = 0;
        }
      }
    }
  });

  // When Dropdown Open (active)
  onActiveDropdown();
};

// Gallery media photographer
// First render
const displayGalleryMedia = (mediaPhotographer, photographer) => {
  let current = document.getElementsByClassName('selected')[0];
  const firstName = photographer.name.split(' ')[0];
  const main = document.querySelector('main');
  createElement('section', ['gallery'], null, main);

  UpdateGalleryBySort(
    current.innerText,
    mediaPhotographer,
    firstName,
    photographer.price
  );
};

// Button icon heart
const buttonLikes = (mediaPhotographer, price) => {
  const btnLikes = document.querySelectorAll('.btn-likes');
  const likes = document.querySelector('.likes__total');

  btnLikes.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const data = incrementDecrement(btn, mediaPhotographer, index);

      const totalLikes = data.reduce(
        (prevValue, currentValue) => prevValue + currentValue.likes,
        0
      );
      likes.textContent = totalLikes;
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

  document.title = `Photographer ${findPhotographWithID.name}`;

  displayLikeAndPriceDOM(mediaPhotographer, findPhotographWithID.price);
  displayDropDownSelect();
  displayGalleryMedia(mediaPhotographer, findPhotographWithID);
  displayLightBoxModal(mediaPhotographer);
  UpdateDisplayDropdown(mediaPhotographer, findPhotographWithID);
};

init();
