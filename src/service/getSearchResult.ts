const BASE_URL = 'https://gutendex.com/books?page=1';

export const getSearchResult = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    return response.json();
  } catch (error) {
    throw new Error(`Error to fetch response results. ${error}`);
  }
};
