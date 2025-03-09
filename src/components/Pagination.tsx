import React, { useState } from 'react';
import { SkeletonLine } from './SkeletonLine';

interface IPaginationProps {
  page: number | null;
  nextPage: string | null;
  prevPage: string | null;
  onPageChange: (page: string | null) => void;
  isLoading: boolean;
}

function Pagination({
  page,
  nextPage,
  prevPage,
  onPageChange,
  isLoading,
}: IPaginationProps) {
  const [isPaginationClick, setIsPaginationClick] = useState(false);

  return (
    <div className="pagination-wrapper">
      {isLoading && !isPaginationClick ? (
        <SkeletonLine />
      ) : (
        <div className="pagination-container">
          <button
            data-testid="prev-pagination-btn"
            disabled={!prevPage || isLoading}
            onClick={() => {
              setIsPaginationClick(true);
              onPageChange(prevPage);
            }}
          >
            Previous
          </button>
          <p>{page}</p>
          <button
            data-testid="next-pagination-btn"
            disabled={!nextPage || isLoading}
            onClick={() => {
              setIsPaginationClick(true);
              onPageChange(nextPage);
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Pagination;
