import { useLocalStorage } from '../hooks/useLocalStorage';
import ErrorButton from '../components/ErrorButton';
import { HeaderSection } from '../sections/HeaderSection';
import { MainSeaction } from '../sections/MainSection';

function SearchPage() {
  const [searchValue, setSearchValue] = useLocalStorage();

  const onUpdateSearch = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  return (
    <>
      <HeaderSection onUpdateSearch={onUpdateSearch} />
      <MainSeaction searchValue={searchValue} />
      <ErrorButton />
    </>
  );
}

export default SearchPage;
