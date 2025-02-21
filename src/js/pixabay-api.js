const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48986485-6ea1696c08190fb3e366663c0';

export async function fetchImages(query, page = 1, perPage = 12) {
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page,
      per_page: perPage,
    });

    const response = await fetch(`${BASE_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error; // Передаём ошибку дальше
  }
}
