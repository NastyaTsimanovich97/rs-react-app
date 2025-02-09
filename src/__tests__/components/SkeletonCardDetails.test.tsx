import { render, screen, cleanup } from '@testing-library/react';
import { SkeletonCardDetails } from '../../components/SkeletonCardDetails';

afterEach(() => {
  cleanup();
});

describe('SkeletonCardDetails Component', () => {
  it('renders the SkeletonCardDetails with the correct data', () => {
    render(<SkeletonCardDetails />);

    expect(screen.getByTestId('skeleton-card-details').children.length).toBe(5);
  });
});
