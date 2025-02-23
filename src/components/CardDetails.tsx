import { useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import classNames from 'classnames';
import { SkeletonCardDetails } from './SkeletonCardDetails';
import ThemeContext from '../context/themeContext';
import { useGetSearchItemQuery } from '../services/getSearchResult';
import { Error } from './Error';

export function CardDetails() {
  const theme = useContext(ThemeContext);

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const { data, isFetching, isLoading, error } = useGetSearchItemQuery({
    id: params.id,
  });

  const handleClose = () => {
    navigate(`/${location.search}`);
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
