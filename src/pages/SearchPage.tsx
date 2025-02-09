import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage';
import ErrorButton from '../components/ErrorButton';
import { HeaderSection } from '../sections/HeaderSection';
import { MainSection } from '../sections/MainSection';

function SearchPage() {
  const [searchValue, setSearchValue] = useLocalStorage();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const detailsId = params.id;

  const onUpdateSearch = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  const handleCloseDetails = () => {
    if (detailsId) {
      navigate(`/${location.search}`);
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
      <Outlet />
    </div>
  );
}

export default SearchPage;
