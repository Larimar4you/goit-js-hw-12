import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48986485-6ea1696c08190fb3e366663c0';

export async function fetchImages(query, page = 1, perPage = 40) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page: perPage,
      },
    });

    return response.data; // Axios сразу парсит JSON
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
