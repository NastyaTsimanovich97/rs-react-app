import { SkeletonCard } from './SkeletonCard';

export function SkeletonCardList() {
  return (
    <div data-testid="skeleton-card-list" className="card-container">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
