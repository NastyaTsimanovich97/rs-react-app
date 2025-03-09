const BASE_URL = 'https://gutendex.com/books';

export const getSearchItem = async (id: string) => {
  try {
    const URL = `${BASE_URL}/${id}`;

    const response = await fetch(URL);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Server is not available.');
    }
  } catch (error) {
    throw new Error(`Error to fetch response item. ${error}`);
  }
};
