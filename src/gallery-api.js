import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/search/photos';
export const fetchImages = async (searchQuery, page = 1) => {
  const response = await axios.get(
    '/?client_id=6tIE8k2rBkR87RyjfFfcTPOV49ZRQSm7puuLjjSnRsw',
    {
      params: {
        page,
        query: searchQuery,
        per_page: 12,
      },
    }
  );

  return response.data.results;
};
