export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');

  if (!gallery) return; // Проверяем, что элемент существует

  const markup = images
    .map(
      image => `
        <a class="gallery_item" href="${image.largeImageURL}">
          <img class="gallery_image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes:</b> ${image.likes}</p>
            <p class="info-item"><b>Views:</b> ${image.views}</p>
            <p class="info-item"><b>Comments:</b> ${image.comments}</p>
            <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
          </div>
        </a>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  if (gallery) gallery.innerHTML = '';
}

export function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = 'block';
  }
}

export function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = 'none';
  }
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('visible');
  }
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.remove('visible');
  }
}
