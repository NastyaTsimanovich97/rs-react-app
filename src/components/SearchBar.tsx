import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ISearchBarProps {
  onUpdateSearch: (value: string) => void;
}

export function SearchBar(props: ISearchBarProps) {
  const [searchValue, setSearchValue] = useLocalStorage();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const handleButtonClick = () => {
    const value = searchValue.trim();

    setSearchValue(value);
    props.onUpdateSearch(value);
  };

  return (
    <div className="search-container">
      <input
        data-testid="search-input-field"
        placeholder="Input your search"
        type="text"
        value={searchValue}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>Search</button>
    </div>
  );
}
