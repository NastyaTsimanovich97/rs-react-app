import React, { useState } from 'react';
import { Card } from './Card';
import { SkeletonCardList } from './SkeletonCardList';
import Pagination from './Pagination';
import { getURLParams } from '../utils/getURLParams.util';
import { useAppSelector } from '../app/store/hooks';
import { useGetSearchResultQuery } from '../services/getSearchResult';
import { Error } from './Error';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ICardListProps {
  searchValue: string;
}

export function CardList(props: ICardListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const onPageChange = (newPage: string | null) => {
    setPage(newPage ? Number(newPage) : null);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (newPage) {
      newSearchParams.set('page', newPage);
    } else {
      newSearchParams.delete('page');
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const onCardClick = (id: string) => {
    const newSearchParams = searchParams.toString();
    router.push(
      `/details/${id}${newSearchParams ? `?${newSearchParams}` : ''}`
    );
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
