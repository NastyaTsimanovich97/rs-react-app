import { Component } from 'react';
import './App.css';
import { MainSeaction } from './sections/MainSection';
import { HeaderSection } from './sections/HeaderSection';
import { ErrorBoundary } from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';

interface IAppState {
  searchValue: string;
}

export class App extends Component<object, IAppState> {
  constructor(props: object) {
    super(props);

    this.state = { searchValue: localStorage.getItem('searchValue') || '' };

    this.onUpdateSearch = this.onUpdateSearch.bind(this);
  }

  onUpdateSearch(searchValue: string) {
    this.setState({ searchValue: searchValue || '' });
  }

  render() {
    return (
      <ErrorBoundary>
        <HeaderSection onUpdateSearch={this.onUpdateSearch} />
        <MainSeaction searchValue={this.state.searchValue} />
        <ErrorButton />
      </ErrorBoundary>
    );
  }
}

export default App;
