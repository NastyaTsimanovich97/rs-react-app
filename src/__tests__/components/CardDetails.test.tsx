import React from 'react';
import { vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as routerApi from 'next/navigation';
import CardDetails from '../../components/CardDetails';
import { useGetSearchItemQuery } from '../../services/getSearchResult';
import ThemeContext from '../../context/themeContext';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
    toString: () => '',
  }),
}));

vi.mock('../../services/getSearchResult', () => ({
  useGetSearchItemQuery: vi.fn(),
}));

const mockThemeContext = {
  theme: 'light',
  toggleTheme: vi.fn(),
};

const mockData = {
  id: '1',
  title: 'Test Title',
  authors: [{ name: 'Author 1' }],
  summaries: ['Summary 1'],
  bookshelves: ['Bookshelf 1'],
  languages: ['en'],
  subjects: ['Subject 1'],
};

const mockError = {
  message: 'Failed to fetch data',
};

describe('CardDetails Component', () => {
  it('renders the SkeletonCardDetails when loading', async () => {
    vi.mocked(useGetSearchItemQuery).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      isFetching: true,
      refetch: vi.fn(),
    });

    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <CardDetails params={{ id: '1' }} />
      </ThemeContext.Provider>
    );

    expect(screen.getByTestId('skeleton-card-details')).toBeInTheDocument();
  });

  it('renders the CardDetails with the correct data', async () => {
    vi.mocked(useGetSearchItemQuery).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <CardDetails params={{ id: '1' }} />
      </ThemeContext.Provider>
    );

    expect(await screen.findByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('Summary 1')).toBeInTheDocument();
    expect(screen.getByText('Bookshelf 1')).toBeInTheDocument();
    expect(screen.getByText('Subject 1')).toBeInTheDocument();
    expect(screen.getByText('en')).toBeInTheDocument();
  });

  it('renders the Error component when there is an error', async () => {
    vi.mocked(useGetSearchItemQuery).mockReturnValue({
      data: null,
      error: mockError,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <CardDetails params={{ id: '1' }} />
      </ThemeContext.Provider>
    );

    expect(await screen.findByText('Failed to fetch data')).toBeInTheDocument();
  });

  it('calls router.push when Close button is clicked', async () => {
    const mockPush = vi.fn();
    vi.mocked(useGetSearchItemQuery).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    vi.spyOn(routerApi, 'useRouter').mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });

    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <CardDetails params={{ id: '1' }} />
      </ThemeContext.Provider>
    );

    await userEvent.click(screen.getByTestId('close-btn'));

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
