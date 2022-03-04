import {
  createBtnArrowLeft,
  createBtnArrowRight,
  createBtnClose,
  createContainerMedia,
  createGallerySection,
} from '../utils/elementLightbox.js';
import {
  createElement,
  modalAriaClose,
  modalAriaOpen,
} from '../utils/utils.js';

const mediaFactory = (data) => {
  const getDropDownSelectDOM = () => {
    const filterForm = `
    <span>Trier par</span>
    <div class="dropdown" tabindex='0'>
    <input class="textBox" type="button" value='Popularité' placeholder="dropMenu" readonly aria-labelledby="sort by" />
    <div class="option" role='listbox' aria-label='select by sort'>
    <div class="option-value selected" tabindex='0' role='option'>Popularité</div>
    <div class="option-value" tabindex='0' role='option'>Date</div>
    <div class="option-value" tabindex='0' role='option'>Titre</div>
    </div>
    </div>
    `;
    return createElement('div', ['dropdown-container'], filterForm, null);
  };

  const getPhotosGalleriesDOM = (name) => {
    const model = `
    <figure class='gallery__figure'>
    <img tabindex='0' class='gallery__media' src='/assets/images/${name}/${data.image}' alt='${data.title}, closeup view' />
    </figure>
    <div class='gallery__content'>
    <h3 class='gallery__title'>${data.title}</h3>
    <div>
    <span aria-label='likes' class='gallery__likes'>${data.likes}</span> <button class='btn-arrow btn-likes'><img src='assets/icons/heartBrown.svg'/></button>  
    </div>
    </div>
    `;

    return createElement('article', ['gallery__container'], model, null);
  };

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
    <span role='text' class='gallery__likes'>${data.likes} </span> <button class='btn-arrow btn-likes'><img src='assets/icons/heartBrown.svg' alt='likes' /></button>  
    </div>
    </div>
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
     <span class='likes__total'>${totalLikes} <img src='assets/icons/heart.svg' /> </span>
     <span class='likes__price'>${price}€ /jour</span>
      `;

    return createElement('div', ['likes'], model, null);
  };

  // Display Lightbox
  const getLightBoxModalDOM = () => {
    const galleries = document.querySelectorAll('.gallery__media');

    const gallerySection = createGallerySection();
    const containerMedia = createContainerMedia(gallerySection);

    const btnArrowRight = createBtnArrowRight(gallerySection);
    const btnArrowLeft = createBtnArrowLeft(gallerySection);
    const btnClose = createBtnClose(gallerySection);

    const buttonRight = () => {
      ++indexGallery;
      if (indexGallery == galleries.length) {
        indexGallery = 0;
      }
      refreshGallery(indexGallery);
    };

    const buttonLeft = () => {
      --indexGallery;
      if (indexGallery < 0) {
        indexGallery = galleries.length - 1;
      }
      refreshGallery(indexGallery);
    };

    const onSliderKeyUp = (event) => {
      if (gallerySection.style.display) {
        switch (event.code) {
          case 'ArrowLeft':
            buttonLeft();
            break;

          case 'ArrowRight':
            buttonRight();
            break;

          case 'Escape':
            modalAriaClose(gallerySection);
            break;
        }
      }
    };

    // index Media
    let indexGallery;

    const refreshGallery = (indexGallery) => {
      if (galleries[indexGallery]?.tagName === 'IMG') {
        const model = `
        <img class='modal-lightbox__img' src=${galleries[indexGallery].src} alt='${data[indexGallery].title}' />
        <h3 class='modal-lightbox__title'>${data[indexGallery].title}</h3>
        `;
        containerMedia.innerHTML = model;
      } else {
        const model = `<video class='modal-lightbox__img' controls = true src=${galleries[indexGallery]?.currentSrc}>`;
        containerMedia.innerHTML = model;
      }
    };

    // Event
    galleries.forEach((gallery, index) => {
      const openMedia = () => {
        indexGallery = index;
        refreshGallery(indexGallery);
        modalAriaOpen(gallerySection);
      };
      // Click Image
      gallery.addEventListener('click', openMedia);

      // Tap Keyboard
      gallery.addEventListener('keyup', (event) => {
        if (event.code === 'Enter') openMedia();
        onSliderKeyUp(event);
      });
    });

    // Close Modal
    btnClose.addEventListener('click', () => modalAriaClose(gallerySection));

    btnArrowLeft.addEventListener('click', buttonLeft);
    btnArrowRight.addEventListener('click', buttonRight);

    return gallerySection;
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
