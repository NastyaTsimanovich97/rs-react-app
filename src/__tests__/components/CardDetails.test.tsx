import React from 'react';
import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import * as reactRouterApi from 'react-router';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { CardDetails } from '../../components/CardDetails';
import { renderWithProviders } from '../store';
import * as services from '../../services/getSearchResult';

const mockCardListData = {
  results: [
    {
      id: '1',
      title: 'Title 1',
      authors: [{ name: 'Author 1' }],
      summaries: ['Summary 1'],
      bookshelves: ['Summary 1'],
      languages: ['en'],
      subjects: ['Summary 1'],
    },
  ],
  next: null,
  previous: null,
};

vi.mock('react-router', () => ({
  useSearchParams: () => [
    {
      get: () => vi.fn(),
      set: () => vi.fn(),
    },
  ],
  useNavigate: () => vi.fn(),
  useLocation: () => vi.fn(),
  useParams: vi.fn().mockReturnValue({ id: '1' }),
}));

const useNavigateSpy = vi.spyOn(reactRouterApi, 'useNavigate');

describe('CardDetails Component', () => {
  const handlers = [
    http.get('https://gutendex.com/books/1', async () => {
      await delay(150);
      return HttpResponse.json(mockCardListData.results[0]);
    }),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('renders the CardDetails with the Loading state', async () => {
    await waitFor(() =>
      renderWithProviders(
        <MemoryRouter>
          <CardDetails />
        </MemoryRouter>
      )
    );

    expect(screen.getByTestId('skeleton-card-details')).toBeInTheDocument();
  });

  it('renders the CardDetails with the correct data', async () => {
    renderWithProviders(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );

    expect(
      await screen.findByText(mockCardListData.results[0].title)
    ).toBeInTheDocument();
  });

  it('renders the CardDetails with the correct data and click Close btn', async () => {
    const handleUseNavigationSpy = vi.fn();
    useNavigateSpy.mockImplementation(() => handleUseNavigationSpy);

    renderWithProviders(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );

    await userEvent.click(await screen.findByTestId('close-btn'));

    expect(handleUseNavigationSpy).toHaveBeenCalledTimes(1);
  });
});

describe('CardDetails Component Errors', () => {
  const errorMessage = 'Failed to fetch data';

  const getSearchResultSpy = vi.spyOn(services, 'useGetSearchItemQuery');

  it('renders the CardDetails with Error message', async () => {
    getSearchResultSpy.mockImplementationOnce(() => ({
      data: null,
      error: { message: errorMessage },
      isLoading: false,
      refetch: vi.fn(),
    }));

    renderWithProviders(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('renders the CardDetails with Error message from error object', async () => {
    getSearchResultSpy.mockImplementationOnce(() => ({
      data: null,
      error: { status: 500, error: errorMessage },
      isLoading: false,
      refetch: vi.fn(),
    }));

    renderWithProviders(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });
});
