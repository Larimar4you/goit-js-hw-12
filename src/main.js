import { fetchImages } from './pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
  showLoader,
  hideLoader,
} from './render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;
let query = '';
const perPage = 40;
let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = input.value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await fetchImages(query, page, perPage);
    if (data.hits.length === 0) {
      alert('No images found. Try another query!');
      hideLoader();
      return;
    }

    renderGallery(data.hits);
    lightbox.refresh();
    hideLoader();

    if (data.totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong. Please try again.');
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await fetchImages(query, page, perPage);
    renderGallery(data.hits);
    lightbox.refresh();
    hideLoader();

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (page >= totalPages) {
      hideLoadMoreButton();
      alert("We're sorry, but you've reached the end of search results.");
    } else {
      showLoadMoreButton();
    }

    scrollPage();
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong. Please try again.');
    hideLoader();
  }
});

function scrollPage() {
  const cardHeight = document
    .querySelector('.gallery_item')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
