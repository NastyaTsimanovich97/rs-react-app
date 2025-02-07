import { SkeletonCard } from './SkeletonCard';

export function SkeletonCardList() {
  return (
    <div className="card-container">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
