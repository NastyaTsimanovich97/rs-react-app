import './App.css';
import { MainSeaction } from './sections/MainSection';
import { HeaderSection } from './sections/HeaderSection';
import { ErrorBoundary } from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';
import { useLocalStorage } from './hooks/useLocalStorage';

export function App() {
  const [searchValue, setSearchValue] = useLocalStorage();

  const onUpdateSearch = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  return (
    <ErrorBoundary>
      <HeaderSection onUpdateSearch={onUpdateSearch} />
      <MainSeaction searchValue={searchValue} />
      <ErrorButton />
    </ErrorBoundary>
  );
}

export default App;
