import { PureComponent } from 'react';
import { SkeletonCard } from './SkeletonCard';

export class SkeletonCardList extends PureComponent {
  render() {
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
}
