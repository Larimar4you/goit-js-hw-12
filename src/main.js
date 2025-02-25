
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showNotification,
  smoothScroll,
  showLoader,
  hideLoader,
} from './js/render-functions';

let query = '';
let page = 1;
let totalHits = 0;

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');
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

  resetSearch();
  searchImages();
}

function resetSearch() {
  page = 1;
  totalHits = 0;
  clearGallery(gallery);
  hideLoadMoreButton();
}

function loadMoreImages() {
  page++;
  searchImages();
}

async function searchImages() {
  showLoader();

  try {
    const { hits: images, totalHits: total } = await fetchImages(query, page);

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

  toggleLoadMoreButton(images);
  if (page > 1) smoothScroll();
}

function toggleLoadMoreButton(images) {
  const isMoreAvailable = images.length === 40 && page * 40 < totalHits;

  loadMoreBtn.style.display = isMoreAvailable ? 'block' : 'none';

  if (!isMoreAvailable && page * 40 >= totalHits) {
    showNotification(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}
