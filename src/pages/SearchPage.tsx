import { useContext } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage';
import ErrorButton from '../components/ErrorButton';
import { HeaderSection } from '../sections/HeaderSection';
import { MainSection } from '../sections/MainSection';
import { DownloadSection } from '../sections/DowloadSection';
import ThemeContext from '../context/themeContext';

function SearchPage() {
  const theme = useContext(ThemeContext);

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
    <div className={theme}>
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
      <DownloadSection />
    </div>
  );
}

export default SearchPage;
