import { Component } from 'react';
import { Card } from './Card';
import { getSearchResult } from '../service/getSearchResult';

interface IDataItem {
  id: string;
  title: string;
  authors: { name: string }[];
  summaries: string[];
}

interface ICardListProps {
  search?: string;
}

interface ICardListState {
  isLoading: boolean;
  data: IDataItem[];
}

export class CardList extends Component<ICardListProps, ICardListState> {
  constructor(props: ICardListProps) {
    super(props);
    this.state = { isLoading: false, data: [] };
  }

  componentDidMount(): void {
    this.setState({ isLoading: true });
    getSearchResult()
      .then((data) => this.setState({ data: data.results }))
      .catch()
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <h2>Results</h2>
        <div className="card-container">
          {data.map((item) => (
            <Card
              key={item.id}
              name={item.title}
              description={`Author: ${item.authors.map((i) => i.name).join(';')}. Summary: ${item.summaries.join('.')}.`}
            />
          ))}
        </div>
      </div>
    );
  }
}
