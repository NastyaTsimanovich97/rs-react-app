import { Component } from 'react';
import { SearchBar } from '../components/SearchBar';

interface IHeaderSectionProps {
  onUpdateSearch: (value: string) => void;
}

export class HeaderSection extends Component<IHeaderSectionProps> {
  render() {
    return <SearchBar onUpdateSearch={this.props.onUpdateSearch} />;
  }
}
