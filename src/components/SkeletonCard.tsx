import { PureComponent } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export class SkeletonCard extends PureComponent {
  render() {
    return (
      <Skeleton
        height={250}
        width={300}
        borderRadius="10px"
        className="skeleton-card-item"
      />
    );
  }
}
