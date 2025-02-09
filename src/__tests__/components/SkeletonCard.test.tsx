import { render, screen, cleanup } from '@testing-library/react';
import { SkeletonCard } from '../../components/SkeletonCard';

afterEach(() => {
  cleanup();
});

describe('SkeletonCard Component', () => {
  it('renders the SkeletonCard with the correct data', () => {
    render(<SkeletonCard />);

    expect(screen.getByTestId('skeleton-card')).toBeInTheDocument();
  });
});
