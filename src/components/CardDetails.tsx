import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
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

interface ICardProps {
  id: string;
}

export function CardDetails(props: ICardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState<IDataItem>();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getData = () => {
      setIsLoading(true);

      getSearchItem(props.id)
        .then((data) => {
          setData(data);
        })
        .catch((error) => setErrorMessage(error.message))
        .finally(() => setIsLoading(false));
    };

    getData();
  }, [props.id]);

  const handleClose = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="card-details-container">
        {isLoading ? (
          <SkeletonCardDetails />
        ) : (
          <div>
            <button className="close-btn" onClick={handleClose}>
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
