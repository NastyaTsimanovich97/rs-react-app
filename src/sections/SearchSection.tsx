import { Component } from 'react';
import { SearchInput } from '../components/SearchIntup';
import { SearchButton } from '../components/SearchButton';

export class SearchSection extends Component {
  render() {
    return (
      <div className="search-container">
        <SearchInput />
        <SearchButton />
      </div>
    );
  }
}
