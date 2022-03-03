import mediaFactory from '../factories/mediaFactory.js';
import { createElement } from './utils.js';

export const createGallerySection = () => {
  const createGallery = createElement(
    'section',
    ['modal-lightbox', 'modal-center'],
    null,
    null
  );
  createGallery.setAttribute('aria-hidden', true);
  createGallery.setAttribute('role', 'dialog');
  return createGallery;
};

export const createContainerMedia = (gallerySection) => {
  const containerMedia = createElement(
    'div',
    ['modal-lightbox__container'],
    null,
    gallerySection
  );
  return containerMedia;
};

export const createBtnArrowRight = (gallerySection) => {
  const btnArrowRight = createElement(
    'button',
    ['btn-arrow', 'btn-arrow-prev'],
    `<img src = 'assets/icons/arrowRight.svg'/>`,
    gallerySection
  );
  btnArrowRight.setAttribute('aria-label', 'Next image');
  btnArrowRight.setAttribute('role', 'link');

  return btnArrowRight;
};

export const createBtnArrowLeft = (gallerySection) => {
  const btnArrowLeft = createElement(
    'button',
    ['btn-arrow', 'btn-arrow-next'],
    `<img src = 'assets/icons/arrowLeft.svg'/>`,
    gallerySection
  );
  btnArrowLeft.setAttribute('aria-label', 'Previous image');
  btnArrowLeft.setAttribute('role', 'link');
  return btnArrowLeft;
};

export const createBtnClose = (gallerySection) => {
  const btnClose = createElement(
    'button',
    ['btn-arrow', 'btn-close'],
    `<img src = 'assets/icons/closeBrown.svg'/>`,
    gallerySection
  );
  btnClose.setAttribute('aria-label', 'Close dialog');

  return btnClose;
};

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
