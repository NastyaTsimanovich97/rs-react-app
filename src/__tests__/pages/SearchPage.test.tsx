import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, act } from '@testing-library/react';
import SearchPage from '../../pages/SearchPage';

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
  Outlet: () => <div data-testid="mock-outlet">Outlet Content</div>,
}));

describe('SearchPage page', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the SearchPage with the correct data', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      );
    });
  });
});
