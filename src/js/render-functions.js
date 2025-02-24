export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');

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
      }) =>
        `
          <div class="gallery_item">
            <a href="${largeImageURL}" class="gallery_link">
              <img src="${webformatURL}" alt="${tags}" class="gallery_image" loading="lazy" />
            </a>
            <div class="info">
              <p class="info-item"><b>Likes:</b> ${likes}</p>
              <p class="info-item"><b>Views:</b> ${views}</p>
              <p class="info-item"><b>Comments:</b> ${comments}</p>
              <p class="info-item"><b>Downloads:</b> ${downloads}</p>
            </div>
          </div>
          `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showLoadMoreButton() {
  document.querySelector('.load-more').classList.remove('hidden');
}

export function hideLoadMoreButton() {
  document.querySelector('.load-more').classList.add('hidden');
}

export function showLoader() {
  document.querySelector('.loader').classList.add('visible');
}

export function hideLoader() {
  document.querySelector('.loader').classList.remove('visible');
}
