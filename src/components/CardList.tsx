import { Component } from 'react';
import { Card } from './Card';

export class CardList extends Component {
  render() {
    return (
      <div>
        <h2>Results</h2>
        <Card />
      </div>
    );
  }
}
