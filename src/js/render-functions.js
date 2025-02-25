import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Функция рендеринга галереи
export function renderGallery(images, galleryElement) {
  if (!images || images.length === 0) {
    showNotification('No images found!');
    return;
  }

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <a class="gallery-item" href="${largeImageURL}" data-title="${tags}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
        <div class="info">
          <p><b>Likes:</b> ${likes}</p>
          <p><b>Views:</b> ${views}</p>
          <p><b>Comments:</b> ${comments}</p>
          <p><b>Downloads:</b> ${downloads}</p>
        </div>
      </a>
    `
    )
    .join('');

  galleryElement.insertAdjacentHTML('beforeend', markup);
}

// Функция очистки галереи
export function clearGallery(galleryElement) {
  galleryElement.innerHTML = '';
}

// Функция отображения уведомлений
export function showNotification(message, position = 'topRight') {
  try {
    iziToast.show({
      message,
      position,
      timeout: 3000,
    });
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
}

// Функция плавного скролла
export function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (!card) return;

  const { height: cardHeight } = card.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// Функция показа лоадера
export function showLoader(loaderElement = document.querySelector('.loader')) {
  if (!loaderElement) {
    console.error("❌ Ошибка: элемент '.loader' не найден!");
    return;
  }
  loaderElement.style.display = 'block';
}

// Функция скрытия лоадера
export function hideLoader(loaderElement = document.querySelector('.loader')) {
  if (!loaderElement) {
    console.error("❌ Ошибка: элемент '.loader' не найден!");
    return;
  }
  loaderElement.style.display = 'none';
}
