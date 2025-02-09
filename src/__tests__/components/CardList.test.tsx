import { vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CardList } from '../../components/CardList';
import * as services from '../../services/getSearchResult';

const getSearchResultSpy = vi.spyOn(services, 'getSearchResult');

const mockSetSearchParams = vi.fn();
const mockGetSearchParams = vi.fn();
vi.mock('react-router', () => ({
  useSearchParams: () => [
    {
      get: mockGetSearchParams,
      set: mockSetSearchParams,
    },
  ],
  useNavigate: () => vi.fn(),
  useLocation: () => vi.fn(),
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
  it('renders the CardList with the correct data', async () => {
    getSearchResultSpy.mockResolvedValue(mockCardListData);

    await act(async () => {
      render(
        <MemoryRouter>
          <CardList searchValue="test" />
        </MemoryRouter>
      );
    });

    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('card-item')).toHaveLength(2);
  });

  it('renders the CardList with no Result message', async () => {
    getSearchResultSpy.mockResolvedValue({ ...mockCardListData, results: [] });

    await act(async () => {
      render(
        <MemoryRouter>
          <CardList searchValue="test" />
        </MemoryRouter>
      );
    });

    expect(
      screen.getByText('Results are not found. Please, try with another query')
    ).toBeInTheDocument();
  });
});
