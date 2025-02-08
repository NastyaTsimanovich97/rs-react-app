import { useSearchParams } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage';
import ErrorButton from '../components/ErrorButton';
import { HeaderSection } from '../sections/HeaderSection';
import { MainSection } from '../sections/MainSection';
import { CardDetails } from '../components/CardDetails';

function SearchPage() {
  const [searchValue, setSearchValue] = useLocalStorage();

  const [searchParams, setSearchParams] = useSearchParams();

  const detailsId = searchParams.get('details');

  const onUpdateSearch = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  const handleCloseDetails = () => {
    if (detailsId) {
      searchParams.delete('details');
      setSearchParams(searchParams);
    }
  };

  return (
    <div className={detailsId ? 'search-page-wrapper' : ''}>
      <div>
        <HeaderSection onUpdateSearch={onUpdateSearch} />
        <MainSection
          searchValue={searchValue}
          handleClick={handleCloseDetails}
        />
        <ErrorButton />
      </div>
      {detailsId && <CardDetails id={detailsId} />}
    </div>
  );
}

export default SearchPage;
