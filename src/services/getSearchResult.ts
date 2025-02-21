import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const searchAPIHeader = { 'content-type': 'application/json' };

const BASE_URL = 'https://gutendex.com/books';

interface IDataItem {
  id: string;
  title: string;
  authors: { name: string }[];
  summaries: string[];
  bookshelves: string[];
  languages: string[];
  subjects: string[];
}

const createRequest = (url: string) => ({ url, headers: searchAPIHeader });

export const searchAPI = createApi({
  reducerPath: 'cards',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getSearchResult: builder.query<
      {
        results: IDataItem[];
        next: string | null;
        previous: string | null;
      },
      { searchValue: string; page: number | null }
    >({
      query: (params) =>
        createRequest(
          params.searchValue
            ? `/?page=${params.page || 1}&search=${params.searchValue}`
            : `/?page=${params.page || 1}`
        ),
    }),
    getSearchItem: builder.query<IDataItem, { id?: string }>({
      query: (params) => createRequest(`/${params.id}`),
    }),
  }),
});

export const { useGetSearchItemQuery, useGetSearchResultQuery } = searchAPI;
