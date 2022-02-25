import { createElement } from '../utils/createElement.js';
import { compare } from '../utils/FunctionUtils.js';

const mediaFactory = (data) => {
  // display photographer image
  function getUserGalleryDOM() {
    const model = `
    <figure class='gallery__figure'>
    <img class='gallery__media' src='/assets/images/${data.firstName}/${data.gallery.image}' />
    </figure>
    <div class='gallery__content'>
    <h3 class='gallery__title'>${data.gallery.title}</h3>
    <span class='gallery__likes'>${data.gallery.likes} <img src='assets/icons/heartBrown.svg'/> </span>
    </div>
    `;

    return createElement('article', ['gallery__container'], model, null);
  }

  // display photographer video
  function getUserVideoDOM() {
    return createElement(
      'article',
      ['gallery__container-video'],
      `
    <figure class='gallery__figure'>
    <video class='gallery__media' controls src='/assets/images/${data.firstName}/${data.gallery.video}'>
    </figure>
    </video>
    <div class='gallery__content'>
    <h3 class='gallery__title'>${data.gallery.title}</h3>
    <span>${data.gallery.likes} <img src='assets/icons/heartBrown.svg' /> </span>
    </div>
      `,
      null
    );
  }

  // Filter media
  function getSortFormDOM() {
    const $wrapper = document.createElement('div');

    const main = document.querySelector('main');

    const render = () => {
      const filterForm = `
      <form class='sortForm__form' action="#" method="POST" class="sorter-form">
           <label class='sortForm__label' for="sorter-select">Triez par </label>
           <select class='sortForm__select' name="sorter-select" id="sorter-select">
               <option selected value="popularité">Popularité</option>
               <option value="date">Date</option>
               <option value="titre">Titre</option>
           </select>
       </form>
      `;

      $wrapper.innerHTML = filterForm;
      // onChangeFilter();

      main.appendChild($wrapper);
    };

    render();
  }

  const onChangeFilter = (e) => {
    // document.querySelector('form').addEventListener('change', (e) => {
    const gallerySection = document.querySelector('.gallery');
    let copyData = [...data];
    // sort by popularity
    if (e.target.value === 'popularité') {
      copyData = copyData.sort((a, b) => b.likes - a.likes);
      console.log(copyData);
    }
    // sort by date
    if (e.target.value === 'date') {
      copyData = copyData.sort((a, b) => new Date(b.date) - new Date(a.date));
      console.log(copyData);
    }
    // sort by title
    if (e.target.value === 'titre') {
      copyData = copyData.sort(compare);
    }
    gallerySection.innerHTML = '';
    // copyData.forEach((gallery) => {
    //   // const firstName = fullInfoPhotograph.findPhotographWithID?.name.split(' ')[0];
    //   const mediaModel = mediaFactory({ gallery, firstName: 'Mimi' });
    //   // display photographer image or display photographer video
    //   const typeMedia = gallery.image
    //     ? mediaModel.getUserGalleryDOM()
    //     : mediaModel.getUserVideoDOM();
    //   gallerySection.appendChild(typeMedia);
    // });
    return copyData;
    // });
  };

  // Display Lightbox
  const getLightBoxModalDOM = () => {
    const galleries = document.querySelectorAll('.gallery__media');

    const wrapperDiv = createElement('div', ['modal-lightbox'], null, null);
    wrapperDiv.setAttribute('aria-hidden', true);

    const figure = createElement(
      'figure',
      ['modal-lightbox__figure'],
      null,
      wrapperDiv
    );

    const media = createElement('img', ['modal-lightbox__img'], null, figure);

    const btnClose = createElement(
      'button',
      ['btn', 'btn-close'],
      `<img src = 'assets/icons/closeBrown.svg'/>`,
      wrapperDiv
    );
    btnClose.setAttribute('aria-label', 'Fermer');

    const btnArrowLeft = createElement(
      'button',
      ['btn', 'btn-arrow-prev'],
      `<img src = 'assets/icons/arrowRight.svg'/>`,
      wrapperDiv
    );
    btnArrowLeft.setAttribute('aria-label', 'Photo Précédente');

    const btnArrowRight = createElement(
      'button',
      ['btn', 'btn-arrow-next'],
      `<img src = 'assets/icons/arrowLeft.svg'/>`,
      wrapperDiv
    );
    btnArrowRight.setAttribute('aria-label', 'Photo Suivante');

    let indexGallery;

    galleries.forEach((gallery, index) => {
      gallery.addEventListener('click', () => {
        console.log(gallery);
        media.src = gallery.src;
        wrapperDiv.style.display = 'block';
        indexGallery = index;
      });
    });

    btnArrowLeft.addEventListener('click', () => {
      ++indexGallery;
      if (indexGallery == galleries.length) {
        indexGallery = 0;
      }
      media.src = galleries[indexGallery].src;
    });

    btnArrowRight.addEventListener('click', () => {
      --indexGallery;
      if (indexGallery < 0) {
        indexGallery = galleries.length - 1;
      }
      media.src = galleries[indexGallery].src;
    });

    btnClose.addEventListener('click', () => {
      wrapperDiv.style.display = 'none';
    });

    // onSliderKeyDown = (event) => {
    //   switch (event.code) {
    //     case 'ArrowLeft':
    //       ++indexGallery;
    //       if (indexGallery == galleries.length) {
    //         indexGallery = 0;
    //       }
    //       media.src = galleries[indexGallery].src;
    //       break;

    //     case 'ArrowRight':
    //       --indexGallery;
    //       if (indexGallery < 0) {
    //         indexGallery = galleries.length - 1;
    //       }
    //       media.src = galleries[indexGallery].src;
    //       break;

    //     case 'Escape':
    //       wrapperDiv.style.display = 'none';
    //       break;
    //   }
    // };

    // document.addEventListener('keydown', onSliderKeyDown);

    return wrapperDiv;
  };

  return {
    getUserGalleryDOM,
    getUserVideoDOM,
    getLightBoxModalDOM,
    getSortFormDOM,
    onChangeFilter,
  };
};

export default mediaFactory;
