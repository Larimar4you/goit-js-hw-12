import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  showNotification,
  smoothScroll,
  showLoader,
  hideLoader,
  toggleLoadMoreButton,
} from './js/render-functions';

let query = '';
let page = 1;
let totalHits = 0;
const perPage = 40;

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

function handleFormSubmit(event) {
  event.preventDefault();
  query = event.currentTarget.elements.query.value.trim();

  if (!query) return;

  page = 1;
  totalHits = 0;

  resetSearch();
  loadMoreBtn.style.display = 'none';
  searchImages();
}

function resetSearch() {
  page = 1;
  totalHits = 0;
  gallery.innerHTML = '';
}

function loadMoreImages() {
  page++;
  searchImages();
  smoothScroll();
}

async function searchImages() {
  showLoader();
  toggleLoadMoreButton(false);

  try {
    const { hits: images, totalHits: total } = await fetchImages(
      query,
      page,
      perPage
    );
    handleSearchResults(images, total);
  } catch (error) {
    showNotification('Failed to load images. Please try again later.');
  } finally {
    hideLoader();
  }
}

function handleSearchResults(images, total) {
  if (page === 1) {
    totalHits = total;

    if (!totalHits) {
      showNotification(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }
  }

  renderGallery(images, gallery);
  lightbox.refresh();

  checkLoadMoreButton(images);
}

function checkLoadMoreButton(images) {
  const isMoreAvailable =
    images.length === perPage && page * perPage < totalHits;
  toggleLoadMoreButton(isMoreAvailable);

  if (!isMoreAvailable && page * perPage >= totalHits) {
    showNotification(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
