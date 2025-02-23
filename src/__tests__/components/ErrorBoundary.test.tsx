import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../../components/ErrorBoundary';

const ErrorComponent = () => {
  throw new Error('Test Error');
};

describe('ErrorBoundary', () => {
  it('renders the fallback UI when an error is thrown', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    consoleErrorMock.mockRestore();
  });

  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div>No Error Here</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('No Error Here')).toBeInTheDocument();
  });
});
