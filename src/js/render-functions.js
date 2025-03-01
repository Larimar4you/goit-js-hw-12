import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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

export function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (!card) return;

  const { height: cardHeight } = card.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.style.display = 'block';
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.style.display = 'none';
}

export function toggleLoadMoreButton(isVisible) {
  const loadMoreBtn = document.querySelector('.load-more');
  if (!loadMoreBtn) return;
}
