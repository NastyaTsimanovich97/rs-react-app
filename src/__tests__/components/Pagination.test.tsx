import React from 'react';
import { vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../../components/Pagination';

const mockPaginationData = {
  page: 1,
  nextPage: null,
  prevPage: null,
  onPageChange: vi.fn(),
  isLoading: false,
};

afterEach(() => {
  cleanup();
});

describe('Pagination Component', () => {
  it('renders the Pagination with the disabled prev button', () => {
    render(
      <Pagination
        page={mockPaginationData.page}
        nextPage={mockPaginationData.nextPage}
        prevPage={mockPaginationData.prevPage}
        isLoading={mockPaginationData.isLoading}
        onPageChange={mockPaginationData.onPageChange}
      />
    );

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('renders the Pagination with the active prev button and click on it', () => {
    render(
      <Pagination
        page={mockPaginationData.page}
        nextPage={mockPaginationData.nextPage}
        prevPage={'1'}
        isLoading={mockPaginationData.isLoading}
        onPageChange={mockPaginationData.onPageChange}
      />
    );

    const prevBtn = screen.getByTestId('prev-pagination-btn');
    fireEvent.click(prevBtn);

    expect(mockPaginationData.onPageChange).toHaveBeenCalledTimes(1);
  });

  it('renders the Pagination with the disabled next button', () => {
    render(
      <Pagination
        page={mockPaginationData.page}
        nextPage={mockPaginationData.nextPage}
        prevPage={mockPaginationData.prevPage}
        isLoading={mockPaginationData.isLoading}
        onPageChange={mockPaginationData.onPageChange}
      />
    );

    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('renders the Pagination with the active next button and click on it', () => {
    const handlePage = vi.fn();
    render(
      <Pagination
        page={mockPaginationData.page}
        nextPage={'3'}
        prevPage={mockPaginationData.prevPage}
        isLoading={mockPaginationData.isLoading}
        onPageChange={handlePage}
      />
    );

    const nextBtn = screen.getByTestId('next-pagination-btn');
    fireEvent.click(nextBtn);

    expect(handlePage).toHaveBeenCalledTimes(1);
  });

  it('renders the Pagination with loading state', () => {
    render(
      <Pagination
        page={mockPaginationData.page}
        nextPage={mockPaginationData.nextPage}
        prevPage={mockPaginationData.prevPage}
        isLoading={true}
        onPageChange={mockPaginationData.onPageChange}
      />
    );

    expect(screen.getByTestId('skeleton-line')).toBeInTheDocument();
  });
});
