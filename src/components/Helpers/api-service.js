import axios from 'axios';

const API_KEY = '30553592-7f8cf46d4a7791408268d5968';
axios.defaults.baseURL = 'https://pixabay.com/api/';

axios.defaults.params = {
  API_KEY,
  orientation: 'horizontal',
  per_page: 12,
  image_type: 'photo',
};

export async function fetchImages(searchQuery, page) {
  const { data } = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${API_KEY}`
  );
  return data;
}
