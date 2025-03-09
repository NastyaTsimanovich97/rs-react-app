const BASE_URL = 'https://gutendex.com/books?page=1';

export const getSearchResult = async (searchValue: string) => {
  try {
    const URL = searchValue ? `${BASE_URL}&search=${searchValue}` : BASE_URL;
    const response = await fetch(URL);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Server is not available.');
    }
  } catch (error) {
    throw new Error(`Error to fetch response results. ${error}`);
  }
};
