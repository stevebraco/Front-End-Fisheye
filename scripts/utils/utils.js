export const fetchIdUrl = () => {
  // Fetch id Url
  let params = new URL(document.location).searchParams;
  return parseInt(params.get('id'));
};

export const createElement = (
  tagName,
  className,
  contentHTML,
  parentContainer
) => {
  const element = document.createElement(tagName);
  element.classList.add(...className);
  element.innerHTML = contentHTML;
  parentContainer?.appendChild(element);

  return element;
};

// Increment Decrement gallery heart
let idClicked = []; // save id clicked
export const incrementDecrement = (mediaPhotographer, index) => {
  const likes = document.querySelectorAll('.gallery__likes');
  const btnLikes = document.querySelectorAll('.btn-likes');

  // Verify if id
  let isCheckedId = idClicked.includes(mediaPhotographer[index].id);

  let valueContent = likes[index].textContent;

  // if clicked
  if (isCheckedId) {
    // find id clicked
    let findIndex = idClicked.indexOf(mediaPhotographer[index].id);
    // remove id
    idClicked.splice(findIndex, 1);

    likes[index].textContent = parseInt(valueContent) - 1;
    btnLikes[index].setAttribute('aria-label', 'like');

    mediaPhotographer[index] = {
      ...mediaPhotographer[index],
      likes: parseInt(valueContent) - 1,
    };
  } else {
    mediaPhotographer[index] = {
      ...mediaPhotographer[index],
      likes: mediaPhotographer[index].likes + 1,
    };

    idClicked.push(mediaPhotographer[index].id);

    likes[index].textContent = parseInt(valueContent) + 1;
    btnLikes[index].setAttribute('aria-label', 'unlike');
  }

  return mediaPhotographer;
};

// Dropdown sort
export const sortSelectForm = (optionText, mediaPhotographer) => {
  // sort by popularity
  if (optionText === 'Popularité')
    mediaPhotographer.sort((a, b) => b.likes - a.likes);

  // sort by date
  if (optionText === 'Date')
    mediaPhotographer.sort((a, b) => new Date(b.date) - new Date(a.date));

  // sort by title
  if (optionText === 'Titre') {
    mediaPhotographer.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }

  return mediaPhotographer;
};

// Dropdown Open (active)
export const onActiveDropdown = () => {
  const dropdown = document.querySelector('.dropdown');
  const textBox = document.querySelector('.textBox');
  dropdown.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
      dropdown.classList.toggle('active');
      if (dropdown.classList.contains('active')) {
        textBox.setAttribute('aria-expanded', 'true');
      } else {
        textBox.setAttribute('aria-expanded', 'false');
      }
    }
  });

  dropdown.addEventListener('click', () => {
    dropdown.classList.toggle('active');
    if (dropdown.classList.contains('active')) {
      textBox.setAttribute('aria-expanded', 'true');
    } else {
      textBox.setAttribute('aria-expanded', 'false');
    }
  });
};

// modal open
export const modalAriaOpen = (modal) => {
  const main = document.getElementById('main');
  const body = document.querySelector('body');

  main.setAttribute('aria-hidden', true);
  modal.setAttribute('aria-hidden', false);
  body.classList.add('no-scroll');
  modal.style.display = 'block';
};

// modal close
export const modalAriaClose = (modal) => {
  const main = document.getElementById('main');
  const body = document.querySelector('body');

  main.setAttribute('aria-hidden', false);
  modal.setAttribute('aria-hidden', true);
  body.classList.remove('no-scroll');

  modal.style.display = 'none';
};
