import { createElement } from '../utils/createElement.js';

const photographerFactory = (data) => {
  // Display photographers with location price etc... index.html
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
          <img class='photographer__img' src=${picture} alt='portrait ${name}' />
          <h2 class='photographer__name'>${name}</h2>
        </a>
        <span class='photographer__location'>${location}</span>
        <span class='photographer__description'>${description}</span>
        <span class='photographer__price'>${pricePerDay}</span>
        `;

    const article = createElement('article', ['photographer'], model, null);

    return article;
  }

  // display Price and likes for a photographer photographer.html
  function getLikeAndPriceDOM() {
    const model = `
     <span class='likes__total'>${data.totalLikes} <img src='assets/icons/heart.svg' /> </span>
     <span class='likes__price'>${data.price}€ /jour</span>
      `;

    return createElement('div', ['likes'], model, null);
  }

  // To do compléter la fonction avec le rendu de la page photographe
  function getUserHeaderDOM() {
    const model = `
    <div class='photograph__info'>
    <h2 class='photograph__name'>${data.name}</h2>
    <span class='photograph__location'>${data.city}, ${data.country}</span>
    <span class='photograph__tagline'>${data.tagline}</span>
    </div>
    <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
    <figure class='photograph__figure'>
    <img class='photograph__img' src='/assets/photographers/${data.portrait}' />
    </figure>
    
    `;
    return createElement('div', ['photograph'], model, null);
  }
  return { getUserCardDOM, getLikeAndPriceDOM, getUserHeaderDOM };
};

export default photographerFactory;
