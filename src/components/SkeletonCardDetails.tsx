import { SkeletonLine } from './SkeletonLine';

export function SkeletonCardDetails() {
  return (
    <div data-testid="skeleton-card-details" className="skeleton-card-details">
      <SkeletonLine width={300} height={20} />
      <SkeletonLine width={300} height={20} />
      <SkeletonLine width={300} height={20} />
      <SkeletonLine width={300} height={20} />
      <SkeletonLine width={300} height={20} />
    </div>
  );
}
