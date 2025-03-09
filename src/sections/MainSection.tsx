import { Component } from 'react';
import { CardList } from '../components/CardList';

interface IMainSeactionProps {
  searchValue: string;
}

export class MainSeaction extends Component<IMainSeactionProps> {
  render() {
    return (
      <div>
        <h2>Results</h2>
        <CardList searchValue={this.props.searchValue} />
      </div>
    );
  }
}
