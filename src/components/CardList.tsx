import { useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router';
import { Card } from './Card';
import { SkeletonCardList } from './SkeletonCardList';
import Pagination from './Pagination';
import { getURLParams } from '../utils/getURLParams.util';
import { useAppSelector } from '../app/store/hooks';
import { useGetSearchResultQuery } from '../services/getSearchResult';
import { Error } from './Error';

interface ICardListProps {
  searchValue: string;
}

export function CardList(props: ICardListProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;

  const [page, setPage] = useState<number | null>(initPage);

  const selectedCards = useAppSelector((state) => state.selectedCards);

  const { data, isFetching, isLoading, error } = useGetSearchResultQuery({
    page,
    searchValue: props.searchValue,
  });

  const results = data?.results;
  const nextPage = data?.next ? getURLParams(data?.next, 'page') : null;
  const prev = data?.previous ? getURLParams(data?.previous, 'page') : null;
  const prevPage = data?.previous && !prev ? '1' : prev;

  const onPageChange = (page: string | null) => {
    setPage(page ? Number(page) : null);
    if (page) {
      searchParams.set('page', page);
      setSearchParams(searchParams);
    }
  };

  const onCardClick = (id: string) => {
    navigate(`details/${id}${location.search}`);
  };

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <Pagination
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        onPageChange={onPageChange}
        isLoading={isLoading || isFetching}
      />
      {isLoading || isFetching ? (
        <SkeletonCardList />
      ) : (
        <div className="card-container" data-testid="card-list">
          {results?.length ? (
            results.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                name={item.title}
                authors={item.authors.map((i) => i.name).join(';')}
                description={item.summaries.join('.')}
                onClick={onCardClick}
                isChecked={!!selectedCards.find((i) => i.id === item.id)}
              />
            ))
          ) : (
            <p>Results are not found. Please, try with another query</p>
          )}
        </div>
      )}
    </>
  );
}
