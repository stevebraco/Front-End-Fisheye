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
export const incrementDecrement = (btn, mediaPhotographer, index) => {
  const likes = document.querySelectorAll('.gallery__likes');

  let copyData = mediaPhotographer;

  btn.classList.toggle('like');

  if (btn.classList.contains('like')) {
    // render
    likes[index].textContent = copyData[index].likes + 1;

    copyData[index] = {
      ...copyData[index],
      likes: copyData[index].likes + 1,
    };
  } else {
    copyData[index] = {
      ...copyData[index],
      likes: copyData[index].likes - 1,
    };
    // render
    likes[index].textContent = copyData[index].likes;
  }

  return copyData;
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

  dropdown.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
      dropdown.classList.toggle('active');
    }
  });

  dropdown.addEventListener('click', () => {
    dropdown.classList.toggle('active');
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
