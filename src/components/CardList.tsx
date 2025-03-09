import { Component } from 'react';
import { Card } from './Card';
import { SkeletonCardList } from './SkeletonCardList';
import { getSearchResult } from '../service/getSearchResult';

interface IDataItem {
  id: string;
  title: string;
  authors: { name: string }[];
  summaries: string[];
}

interface ICardListProps {
  searchValue: string;
}

interface ICardListState {
  isLoading: boolean;
  data: IDataItem[];
  errorMessage?: string;
}

export class CardList extends Component<ICardListProps, ICardListState> {
  constructor(props: ICardListProps) {
    super(props);
    this.state = { isLoading: false, data: [] };

    this.getData = this.getData.bind(this);
  }

  componentDidMount(): void {
    this.getData();
  }

  componentDidUpdate(prevProps: Readonly<ICardListProps>): void {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.getData();
    }
  }

  getData() {
    this.setState({ isLoading: true, errorMessage: '' });

    getSearchResult(this.props.searchValue)
      .then((data) => this.setState({ data: data.results }))
      .catch((error) => this.setState({ errorMessage: error.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { data } = this.state;

    return (
      <>
        {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
        {this.state.isLoading ? (
          <SkeletonCardList />
        ) : (
          <div className="card-container">
            {data.map((item) => (
              <Card
                key={item.id}
                name={item.title}
                authors={item.authors.map((i) => i.name).join(';')}
                description={item.summaries.join('.')}
              />
            ))}
          </div>
        )}
      </>
    );
  }
}
