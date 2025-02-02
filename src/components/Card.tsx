import { PureComponent } from 'react';

interface ICard {
  name?: string;
  authors?: string;
  description?: string;
}

export class Card extends PureComponent<ICard, ICard> {
  constructor(props: ICard) {
    super(props);
    this.state = {
      name: this.props.name || 'Card Name',
      authors: this.props.authors || 'Card Authors',
      description: this.props.description || 'Card Description',
    };
  }

  render() {
    return (
      <div className="card-item">
        <h2>{this.state.name}</h2>
        <p>
          <b>Authors: </b>
          {this.state.authors}
        </p>
        <p>
          <b>Summary: </b>
          {this.state.description}
        </p>
      </div>
    );
  }
}
