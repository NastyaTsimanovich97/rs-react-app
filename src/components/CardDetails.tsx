import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { getSearchItem } from '../services/getSearchItem';
import { SkeletonCardDetails } from './SkeletonCardDetails';

interface IDataItem {
  title: string;
  authors: { name: string }[];
  summaries: string[];
  bookshelves: string[];
  languages: string[];
  subjects: string[];
}

export function CardDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState<IDataItem>();

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getData = () => {
      if (params.id) {
        setIsLoading(true);

        getSearchItem(params.id)
          .then((data) => {
            setData(data);
          })
          .catch((error) => setErrorMessage(error.message))
          .finally(() => setIsLoading(false));
      }
    };

    getData();
  }, [params.id]);

  const handleClose = () => {
    navigate(`/${location.search}`);
  };

  return (
    <div data-testid="card-details">
      {errorMessage && <p>{errorMessage}</p>}
      <div className="card-details-container">
        {isLoading ? (
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
