import mediaFactory from '../factories/mediaFactory.js';
import { createElement } from './utils.js';

export const createLightboxModal = () => {
  const createGallery = createElement(
    'section',
    ['modal-lightbox', 'modal-center'],
    null,
    null
  );
  createGallery.setAttribute('aria-hidden', true);
  createGallery.setAttribute('role', 'dialog');
  createGallery.setAttribute('tabindex', '-1');
  return createGallery;
};

export const createContainerMedia = (modalLightbox) => {
  const containerMedia = createElement(
    'div',
    ['modal-lightbox__container'],
    null,
    modalLightbox
  );
  return containerMedia;
};

export const createBtnArrowRight = (modalLightbox) => {
  const btnArrowRight = createElement(
    'button',
    ['btn-arrow', 'btn-arrow-prev'],
    `<img src = 'assets/icons/arrowRight.svg' alt='arrow right'/>`,
    modalLightbox
  );
  btnArrowRight.setAttribute('aria-label', 'Next image');
  btnArrowRight.setAttribute('role', 'link');

  return btnArrowRight;
};

export const createBtnArrowLeft = (modalLightbox) => {
  const btnArrowLeft = createElement(
    'button',
    ['btn-arrow', 'btn-arrow-next'],
    `<img src = 'assets/icons/arrowLeft.svg' alt='arrow left'/>`,
    modalLightbox
  );
  btnArrowLeft.setAttribute('aria-label', 'Previous image');
  btnArrowLeft.setAttribute('role', 'link');
  return btnArrowLeft;
};

export const createBtnClose = (modalLightbox) => {
  const btnClose = createElement(
    'button',
    ['btn-arrow', 'btn-close'],
    `<img src = 'assets/icons/closeBrown.svg' alt='close'/>`,
    modalLightbox
  );
  btnClose.setAttribute('aria-label', 'Close dialog');

  return btnClose;
};

// Type media
export const typeMediaGallery = (mediaPhotographer, firstName) => {
  const gallerySection = document.querySelector('.gallery');

  mediaPhotographer.forEach((gallery) => {
    const mediaModel = mediaFactory(gallery);
    const typeMedia = gallery.image
      ? mediaModel.getPhotosGalleriesDOM(firstName)
      : mediaModel.getVideoGalleriesDOM(firstName);
    gallerySection.appendChild(typeMedia);
  });
};
