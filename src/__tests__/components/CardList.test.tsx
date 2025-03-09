import React from 'react';
import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { CardList } from '../../components/CardList';
import * as services from '../../services/getSearchResult';
import { renderWithProviders } from '../store';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const mockSetSearchParams = vi.fn();
const mockGetSearchParams = vi.fn();

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: mockGetSearchParams,
    set: mockSetSearchParams,
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

describe('CardList Component', () => {
  const handlers = [
    http.get('https://gutendex.com/books', async () => {
      await delay(150);
      return HttpResponse.json(mockCardListData);
    }),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('renders the CardList with the correct data', async () => {
    renderWithProviders(<CardList searchValue="test" />);

    expect(await screen.findByTestId('card-list')).toBeInTheDocument();
    expect(await screen.findAllByTestId('card-item')).toHaveLength(2);
  });

  it('renders the CardList with no Result message', async () => {
    const getSearchResultSpy = vi.spyOn(services, 'useGetSearchResultQuery');
    getSearchResultSpy.mockImplementationOnce(() => ({
      data: { ...mockCardListData, results: [] },
      error: null,
      isLoading: false,
      refetch: vi.fn(),
    }));

    renderWithProviders(<CardList searchValue="test" />);

    expect(
      screen.getByText('Results are not found. Please, try with another query')
    ).toBeInTheDocument();
  });
});
