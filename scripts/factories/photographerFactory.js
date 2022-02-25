import { createElement } from '../utils/utils.js';
function photographerFactory(data) {
  const { name, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

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
  return { name, picture, getUserCardDOM };
}

export default photographerFactory;
