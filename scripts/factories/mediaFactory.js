import {
  createBtnArrowLeft,
  createBtnArrowRight,
  createBtnClose,
  createContainerMedia,
  createLightboxModal,
} from '../utils/elementLightbox.js';
import {
  createElement,
  modalAriaClose,
  modalAriaOpen,
} from '../utils/utils.js';

const mediaFactory = (data) => {
  // Select Dropdown
  const getDropDownSelectDOM = () => {
    const filterForm = `
    <h3 class='dropdown__text'>Trier par</h3>
    <div role="listbox" class="dropdown" tabindex='0' aria-haspopup='listbox' role='button' aria-label='trier par' aria-expanded='false'>
    <input tabindex='-1' class="textBox" type="button" value='Popularité' placeholder="dropMenu" readonly />
    <div class="option" id='sort' role='listbox' >
    <div class="option-value selected" tabindex='0' role='option'>Popularité</div>
    <div class="option-value" tabindex='0' role='option'>Date</div>
    <div class="option-value" tabindex='0' role='option'>Titre</div>
    </div>
    </div>
    `;
    return createElement('div', ['dropdown-container'], filterForm, null);
  };

  // image gallery
  const getPhotosGalleriesDOM = (name) => {
    const model = `
    <figure class='gallery__figure'>
      <img tabindex='0' class='gallery__media' src='/assets/images/${name}/${data.image}' alt='${data.title}' />
    </figure>
    <div class='gallery__content'>
      <h3 class='gallery__title'>${data.title}</h3>
    <div>
    <span aria-label='likes' class='gallery__likes'>${data.likes}</span> <button label='like' class='btn-arrow btn-likes'><img src='assets/icons/heartBrown.svg' alt='likes' /></button>
    `;

    return createElement('article', ['gallery__container'], model, null);
  };

  // video gallery
  const getVideoGalleriesDOM = (name) => {
    return createElement(
      'article',
      ['gallery__container-video'],
      `
    <figure class='gallery__figure'>
    <video class='gallery__media' controls src='/assets/images/${name}/${data.video}'>
    </figure>
    </video>
    <div class='gallery__content'>
    <h3 class='gallery__title'>${data.title}</h3>
    <div>
    <span role='text' class='gallery__likes'>${data.likes} </span> <button label='like' class='btn-arrow btn-likes'><img src='assets/icons/heartBrown.svg' alt='likes' /></button>
      `,
      null
    );
  };

  // Like and Price
  const getLikeAndPriceDOM = (price) => {
    const totalLikes = data.reduce(
      (prevValue, currentValue) => prevValue + currentValue.likes,
      0
    );
    const model = `
    <div tabindex='0'>
    <span  class='likes__total'>${totalLikes} </span>
    <img src='assets/icons/heart.svg' alt='aime' /> 
    </div>
     <span tabindex='0' class='likes__price'>${price}€ /jour</span>
      `;

    return createElement('aside', ['likes'], model, null);
  };

  // Display Lightbox
  const getLightBoxModalDOM = () => {
    const galleries = document.querySelectorAll('.gallery__media');

    const lightboxModal = createLightboxModal();
    const containerMedia = createContainerMedia(lightboxModal);

    // Create button
    const btnClose = createBtnClose(lightboxModal);
    const btnArrowRight = createBtnArrowRight(lightboxModal);
    const btnArrowLeft = createBtnArrowLeft(lightboxModal);

    // index Media
    let indexGallery;

    // focus image clicked
    let imageFocus;

    // Event
    galleries.forEach((gallery, index) => {
      // Open Lightbox
      const openLightboxModal = () => {
        indexGallery = index;
        displayTypeGallery(indexGallery);
        modalAriaOpen(lightboxModal);
        imageFocus = galleries[index];
      };

      // Click Image
      gallery.addEventListener('click', openLightboxModal);

      // Tap Keyboard Image
      gallery.addEventListener('keyup', (event) => {
        if (event.code === 'Enter') {
          openLightboxModal();
          btnArrowRight.focus();
        }
        onSliderKeyUp(event);
      });
    });

    const buttonRight = () => {
      ++indexGallery;
      if (indexGallery == galleries.length) {
        indexGallery = 0;
      }
      displayTypeGallery(indexGallery);
    };

    const buttonLeft = () => {
      --indexGallery;
      if (indexGallery < 0) {
        indexGallery = galleries.length - 1;
      }
      displayTypeGallery(indexGallery);
    };

    const onSliderKeyUp = (event) => {
      switch (event.code) {
        case 'ArrowLeft':
          buttonLeft();
          break;

        case 'ArrowRight':
          buttonRight();
          break;

        case 'Escape':
          modalAriaClose(lightboxModal);
          imageFocus.focus();
          break;
      }
    };

    const displayTypeGallery = (indexGallery) => {
      // Find img
      if (galleries[indexGallery].tagName === 'IMG') {
        const model = `
        <img class='modal-lightbox__img' src=${galleries[indexGallery].src} alt='${data[indexGallery].title}' />
        <h3 class='modal-lightbox__title'>${data[indexGallery].title}</h3>
        `;
        containerMedia.innerHTML = model;
      } else {
        // find video
        const model = `
        <video class='modal-lightbox__img' controls = true src=${galleries[indexGallery]?.currentSrc}> </video>
        <h3 class='modal-lightbox__title'>${data[indexGallery].title}</h3>
        `;
        containerMedia.innerHTML = model;
      }
    };

    // Close Modal keyboard
    lightboxModal.addEventListener('keyup', (event) => {
      if (event.code === 'Escape') {
        modalAriaClose(lightboxModal);
        imageFocus.focus();
      }
      onSliderKeyUp(event);
    });

    // Button Close Modal
    btnClose.addEventListener('click', () => {
      modalAriaClose(lightboxModal);
      imageFocus.focus();
    });

    // Button direction
    btnArrowLeft.addEventListener('click', buttonLeft);
    btnArrowRight.addEventListener('click', buttonRight);

    return lightboxModal;
  };

  // Clear Gallery
  const clearGallerySection = () => {
    const gallerySection = document.querySelector('.gallery');
    gallerySection.innerHTML = '';
  };

  return {
    getDropDownSelectDOM,
    getPhotosGalleriesDOM,
    getVideoGalleriesDOM,
    getLikeAndPriceDOM,
    getLightBoxModalDOM,
    clearGallerySection,
  };
};

export default mediaFactory;
