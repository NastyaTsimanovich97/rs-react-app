import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Card } from './Card';
import { SkeletonCardList } from './SkeletonCardList';
import { getSearchResult } from '../services/getSearchResult';
import Pagination from './Pagination';
import { getURLParams } from '../utils/getURLParams.util';

interface IDataItem {
  id: string;
  title: string;
  authors: { name: string }[];
  summaries: string[];
  bookshelves: string[];
  languages: string[];
  subjects: string[];
}

interface ICardListProps {
  searchValue: string;
}

export function CardList(props: ICardListProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState<IDataItem[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const initPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;

  const [page, setPage] = useState<number | null>(initPage);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  useEffect(() => {
    const getData = () => {
      setIsLoading(true);
      setErrorMessage('');

      getSearchResult(props.searchValue, page)
        .then((data) => {
          setData(data.results);

          const next = data.next ? getURLParams(data.next, 'page') : null;
          setNextPage(next);

          const prev = data.previous
            ? getURLParams(data.previous, 'page')
            : null;
          setPrevPage(data.previous && !prev ? '1' : prev);
        })
        .catch((error) => setErrorMessage(error.message))
        .finally(() => setIsLoading(false));
    };

    getData();
  }, [props.searchValue, page]);

  const onPageChange = (page: string | null) => {
    setPage(page ? Number(page) : null);
    if (page) {
      searchParams.set('page', page);
      setSearchParams(searchParams);
    }
  };

  const onCardClick = (id: string) => {
    searchParams.set('details', id);
    setSearchParams(searchParams);
  };

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      <Pagination
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        onPageChange={onPageChange}
        isLoading={isLoading}
      />
      {isLoading ? (
        <SkeletonCardList />
      ) : (
        <div className="card-container">
          {data.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.title}
              authors={item.authors.map((i) => i.name).join(';')}
              description={item.summaries.join('.')}
              onClick={onCardClick}
            />
          ))}
        </div>
      )}
      {/* {detailsId && <CardDetails id={detailsId} />} */}
    </>
  );
}
