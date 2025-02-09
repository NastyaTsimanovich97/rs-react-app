import { render, screen, cleanup } from '@testing-library/react';
import { SkeletonCardList } from '../../components/SkeletonCardList';

afterEach(() => {
  cleanup();
});

describe('SkeletonCardList Component', () => {
  it('renders the SkeletonCardList with the correct data', () => {
    render(<SkeletonCardList />);

    expect(screen.getByTestId('skeleton-card-list').children.length).toBe(6);
  });
});
