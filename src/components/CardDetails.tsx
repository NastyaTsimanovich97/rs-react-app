import React, { Usable, useContext } from 'react';
import classNames from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';
import { SkeletonCardDetails } from './SkeletonCardDetails';
import ThemeContext from '../context/themeContext';
import { useGetSearchItemQuery } from '../services/getSearchResult';
import { Error } from './Error';

interface CardDetailsProps {
  params: Usable<{ id: string }>;
}

export default function CardDetails({ params }: CardDetailsProps) {
  const theme = useContext(ThemeContext);
  const id = React.use(params).id;

  const searchParams = useSearchParams();
  const router = useRouter();

  const { data, isFetching, isLoading, error } = useGetSearchItemQuery({
    id,
  });

  const handleClose = () => {
    router.push(
      `/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    );
  };

  return (
    <div data-testid="card-details">
      {error && <Error error={error} />}
      <div className={classNames('card-details-container', theme)}>
        {isLoading || isFetching ? (
          <SkeletonCardDetails />
        ) : (
          <div>
            <button
              data-testid="close-btn"
              className="close-btn"
              onClick={handleClose}
            >
              Close
            </button>
            <div>
              <h2>{data?.title || 'Card Name'}</h2>
              <div>
                <b>Authors: </b>
                {data?.authors?.map((i, index) => (
                  <p key={`author-${index}`}>{i.name}</p>
                ))}
              </div>
              <div>
                <b>Summary: </b>
                {data?.summaries?.map((i, index) => (
                  <p key={`summary-${index}`}>{i}</p>
                ))}
              </div>
              <div>
                <b>Bookshelves: </b>
                {data?.bookshelves?.map((i, index) => (
                  <p key={`bookshelve-${index}`}>{i}</p>
                ))}
              </div>
              <div>
                <b>Subjects: </b>
                {data?.subjects?.map((i, index) => (
                  <p key={`subject-${index}`}>{i}</p>
                ))}
              </div>
              <div>
                <b>Languages: </b>
                {data?.languages?.map((i, index) => (
                  <p key={`language-${index}`}>{i}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
