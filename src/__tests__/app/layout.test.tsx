import React from 'react';
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import RootLayout from '../../app/layout';

vi.mock('./providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="providers">{children}</div>
  ),
}));

describe('RootLayout Component', () => {
  it('renders the RootLayout with children', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Children</div>
      </RootLayout>
    );

    expect(getByText('Test Children')).toBeInTheDocument();
  });
});
