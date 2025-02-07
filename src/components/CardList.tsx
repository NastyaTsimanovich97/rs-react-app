import { useState, useEffect } from 'react';
import { Card } from './Card';
import { SkeletonCardList } from './SkeletonCardList';
import { getSearchResult } from '../service/getSearchResult';

interface IDataItem {
  id: string;
  title: string;
  authors: { name: string }[];
  summaries: string[];
}

interface ICardListProps {
  searchValue: string;
}

export function CardList(props: ICardListProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState<IDataItem[]>([]);

  useEffect(() => {
    const getData = () => {
      setIsLoading(true);
      setErrorMessage('');

      getSearchResult(props.searchValue)
        .then((data) => setData(data.results))
        .catch((error) => setErrorMessage(error.message))
        .finally(() => setIsLoading(false));
    };

    getData();
  }, [props.searchValue]);

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      {isLoading ? (
        <SkeletonCardList />
      ) : (
        <div className="card-container">
          {data.map((item) => (
            <Card
              key={item.id}
              name={item.title}
              authors={item.authors.map((i) => i.name).join(';')}
              description={item.summaries.join('.')}
            />
          ))}
        </div>
      )}
    </>
  );
}
