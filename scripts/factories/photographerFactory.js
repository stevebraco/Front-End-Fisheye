import { createElement } from '../utils/utils.js';
function photographerFactory(data) {
  function getUserCardDOM() {
    const {
      id,
      name,
      portrait,
      city,
      country,
      tagline: description,
      price,
    } = data;

    const picture = `assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const pricePerDay = `${price}€/jour`;
    const model = `
        <a aria-label='En savoir plus sur ${name}' class='photographer__link' href='photographer.html?id=${id}'>
          <img class='photographer__img' src=${picture} alt='${name}' />
          <h2 class='photographer__name'>${name}</h2>
        </a>
        <p class='photographer__location'>${location}</p>
        <p class='photographer__description'>${description}</p>
        <p class='photographer__price'>${pricePerDay}</p>
        `;

    const article = createElement('article', ['photographer'], model, null);

    return article;
  }

  function getUserHeaderDOM() {
    const model = `
    <div tabindex='0' class='photograph__info'>
    <h2  class='photograph__name'>${data.name}</h2>
    <p class='photograph__location'>${data.city}, ${data.country}</p>
    <p class='photograph__tagline'>${data.tagline}</p>
    </div>
    <button class="btn contact_button" aria-label='contactez moi'>Contactez-moi</button>
    <figure tabindex='0' class='photograph__figure'>
    <img class='photograph__img' src='/assets/photographers/${data.portrait}' alt='photographer ${data.portrait}' />
    </figure>
    `;

    return model;
  }

  function getModalContactFormDOM() {
    const model = `<div class="modal">
    <header>
      <h2 id="dialog1_label" >Contactez-moi <p class='modal__line'> ${data.name}</p></h2>
      <button aria-label='Close Contact form' class='modal__close'>
      <img  src="assets/icons/close.svg" alt='close'/>
      </button>
    </header>
    <form>
      <div>
        <label class='modal__label' for='name'>Prénom</label>
        <input type='text' id='name' class='modal__value'/>
      </div>
      <div>
        <label class='modal__label' for='lastName'>Nom</label>
        <input type='text' id='lastName' class='modal__value'/>
      </div>
      <div>
        <label class='modal__label' for='email'>Email</label>
        <input type='text' id='email' class='modal__value'/>
      </div>
      <div>
        <label class='modal__label' for='message'>Votre message</label>
        <textarea id='message' class='modal__textarea modal__value'></textarea>
      </div>
      <button type='submit' id='btn-submit' class="btn" aria-label='Send'>Envoyer</button>
    </form>
  </div>`;

    return model;
  }

  return { getUserCardDOM, getUserHeaderDOM, getModalContactFormDOM };
}

export default photographerFactory;
