import { vi } from 'vitest';
import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import SearchPage from '../../pages-old/SearchPage';
import * as useLocalStorageHooks from '../../hooks/useLocalStorage';
import * as services from '../../services/getSearchResult';
import { renderWithProviders } from '../store';

const useLocalStorageSpy = vi.spyOn(useLocalStorageHooks, 'useLocalStorage');
const getSearchResultSpy = vi.spyOn(services, 'useGetSearchResultQuery');

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue(undefined),
    set: vi.fn(),
  }),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    pathname: '/search',
  }),
  usePathname: () => '/search',
}));

const mockCardListData = {
  results: [
    {
      id: '1',
      title: 'Title 1',
      authors: [{ name: 'Author 1' }],
      summaries: ['Summary 1'],
      bookshelves: [],
      languages: [],
      subjects: [],
    },
    {
      id: '2',
      title: 'Title 2',
      authors: [{ name: 'Author 2' }],
      summaries: ['Summary 2'],
      bookshelves: [],
      languages: [],
      subjects: [],
    },
  ],
  next: null,
  previous: null,
};

describe('SearchPage page', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the SearchPage with the correct data', async () => {
    useLocalStorageSpy.mockReturnValue(['Test Search Value', () => {}]);
    getSearchResultSpy.mockImplementationOnce(() => ({
      data: mockCardListData,
      error: null,
      isLoading: false,
      refetch: vi.fn(),
    }));

    renderWithProviders(<SearchPage />);

    expect(await screen.findByTestId('card-list')).toBeInTheDocument();
    expect(await screen.findAllByTestId('card-item')).toHaveLength(2);
  });
});
