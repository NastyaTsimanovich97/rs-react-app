import React, { useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocalStorage } from '../hooks/useLocalStorage';
import ErrorButton from '../components/ErrorButton';
import { HeaderSection } from '../components/HeaderSection';
import { MainSection } from '../components/MainSection';
import { DownloadSection } from '../components/DownloadSection';
import ThemeContext from '../context/themeContext';

function SearchPage({ children }: { children?: React.ReactNode }) {
  const theme = useContext(ThemeContext);

  const [searchValue, setSearchValue] = useLocalStorage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const detailsId = searchParams.get('id');

  const onUpdateSearch = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  const handleCloseDetails = () => {
    if (detailsId) {
      router.push(`/${searchParams.toString()}`);
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
        <div>{children}</div>
      </div>
      <DownloadSection />
    </div>
  );
}

export default SearchPage;
