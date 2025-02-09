import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, act, screen } from '@testing-library/react';
import SearchPage from '../../pages/SearchPage';
import * as useLocalStorageHooks from '../../hooks/useLocalStorage';
import * as services from '../../services/getSearchResult';

const useLocalStorageSpy = vi.spyOn(useLocalStorageHooks, 'useLocalStorage');
const getSearchResultSpy = vi.spyOn(services, 'getSearchResult');

vi.mock('react-router', () => ({
  useSearchParams: () => [
    {
      get: vi.fn().mockReturnValue(undefined),
      set: () => vi.fn(),
    },
  ],
  useNavigate: () => vi.fn(),
  useLocation: () => vi.fn(),
  useParams: vi.fn().mockReturnValue({ id: '1' }),
  Outlet: () => <div data-testid="mock-outlet">Outlet Content</div>,
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
    getSearchResultSpy.mockResolvedValue(mockCardListData);

    await act(async () => {
      render(
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      );
    });

    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('card-item')).toHaveLength(2);
  });
});
