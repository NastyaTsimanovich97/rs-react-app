import { vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import * as reactRouterApi from 'react-router';
import * as services from '../../services/getSearchItem';
import { CardDetails } from '../../components/CardDetails';

const getSearchItemSpy = vi.spyOn(services, 'getSearchItem');

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

describe('CardDetails Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the CardDetails with the Loading state', async () => {
    getSearchItemSpy.mockImplementation(() => new Promise(() => {}));

    await waitFor(() =>
      render(
        <MemoryRouter>
          <CardDetails />
        </MemoryRouter>
      )
    );

    expect(screen.getByTestId('skeleton-card-details')).toBeInTheDocument();
  });

  it('renders the CardDetails with the correct data', async () => {
    getSearchItemSpy.mockResolvedValue(mockCardListData.results[0]);

    await act(() =>
      render(
        <MemoryRouter>
          <CardDetails />
        </MemoryRouter>
      )
    );

    expect(
      screen.getByText(mockCardListData.results[0].title)
    ).toBeInTheDocument();
  });

  it('renders the CardDetails with the correct data and click Close btn', async () => {
    getSearchItemSpy.mockResolvedValue(mockCardListData.results[0]);

    const handleUseNavigationSpy = vi.fn();
    useNavigateSpy.mockImplementation(() => handleUseNavigationSpy);

    await act(() =>
      render(
        <MemoryRouter>
          <CardDetails />
        </MemoryRouter>
      )
    );

    await userEvent.click(screen.getByTestId('close-btn'));

    expect(handleUseNavigationSpy).toHaveBeenCalledTimes(1);
  });

  it('renders the CardDetails with Error message', async () => {
    const errorMessage = 'Failed to fetch data';
    getSearchItemSpy.mockRejectedValue(new Error(errorMessage));

    await act(() =>
      render(
        <MemoryRouter>
          <CardDetails />
        </MemoryRouter>
      )
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
