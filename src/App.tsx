import { Component } from 'react';
import './App.css';
import { MainSeaction } from './sections/MainSection';
import { HeaderSection } from './sections/HeaderSection';

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
      <>
        <HeaderSection onUpdateSearch={this.onUpdateSearch} />
        <MainSeaction searchValue={this.state.searchValue} />
      </>
    );
  }
}

export default App;
