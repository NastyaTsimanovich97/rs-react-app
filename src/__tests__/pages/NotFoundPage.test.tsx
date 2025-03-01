import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import NotFoundPage from '../../pages-old/NotFoundPage';

afterEach(() => {
  cleanup();
});

describe('NotFoundPage page', () => {
  it('renders the NotFoundPage with the correct data', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404: Page Not Found')).toBeInTheDocument();
  });
});
