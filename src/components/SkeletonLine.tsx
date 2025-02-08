interface ISkeletonLineProps {
  height?: number;
  width?: number;
}

export function SkeletonLine({ height = 40, width = 250 }: ISkeletonLineProps) {
  return (
    <div
      style={{ height, width }}
      className="skeleton-line-item skeleton-content"
    />
  );
}
