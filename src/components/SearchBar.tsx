import { Component } from 'react';

interface ISearchBarState {
  value: string;
}

interface ISearchBarProps {
  onUpdateSearch?: (value: string) => void;
}

export class SearchBar extends Component<ISearchBarProps, ISearchBarState> {
  constructor(props: ISearchBarProps) {
    super(props);

    this.state = { value: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount(): void {
    const searchValue = localStorage.getItem('searchValue');
    this.setState({ value: searchValue || '' });
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.setState({ value });
  }

  handleButtonClick() {
    const value = this.state.value.trim();
    localStorage.setItem('searchValue', value);
    this.setState({ value });
  }

  render() {
    return (
      <div className="search-container">
        <input
          placeholder="Input your search"
          type="text"
          value={this.state.value}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleButtonClick}>Search</button>
      </div>
    );
  }
}
