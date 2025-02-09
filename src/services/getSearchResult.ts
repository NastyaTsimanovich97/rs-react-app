const BASE_URL = 'https://gutendex.com/books';

export const getSearchResult = async (
  searchValue: string,
  page: number | null
) => {
  try {
    let URL = `${BASE_URL}?page=${page || 1}`;
    if (searchValue) {
      URL = URL + `&search=${searchValue}`;
    }

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
