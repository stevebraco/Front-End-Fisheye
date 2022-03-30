import mediaFactory from '../factories/mediaFactory.js';
import { createElement } from './utils.js';

export const createLightboxModal = () => {
  const createLightBox = createElement(
    'section',
    ['modal-lightbox', 'modal-center'],
    null,
    null
  );
  createLightBox.setAttribute('aria-hidden', true);
  createLightBox.setAttribute('role', 'dialog');
  createLightBox.setAttribute('tabindex', '0');
  return createLightBox;
};

export const createContainerMedia = (modalLightbox) => {
  const containerMedia = createElement(
    'div',
    ['modal-lightbox__container'],
    null,
    modalLightbox
  );
  containerMedia.setAttribute('role', 'dialog');
  containerMedia.setAttribute('aria-label', 'image vue rapprochée');
  containerMedia.setAttribute('tab-index', '0');
  return containerMedia;
};

export const createBtnArrowRight = (modalLightbox) => {
  const btnArrowRight = createElement(
    'button',
    ['btn-arrow', 'btn-arrow-prev'],
    `<img src = 'assets/icons/arrowRight.svg' alt='arrow right'/>`,
    modalLightbox
  );
  btnArrowRight.setAttribute('aria-label', 'image suivante');
  btnArrowRight.setAttribute('tabindex', '0');

  return btnArrowRight;
};

export const createBtnArrowLeft = (modalLightbox) => {
  const btnArrowLeft = createElement(
    'button',
    ['btn-arrow', 'btn-arrow-next'],
    `<img src = 'assets/icons/arrowLeft.svg' alt='arrow left'/>`,
    modalLightbox
  );
  btnArrowLeft.setAttribute('aria-label', 'image précédente');
  btnArrowLeft.setAttribute('tabindex', '0');

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
