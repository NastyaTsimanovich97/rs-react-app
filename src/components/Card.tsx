import { PureComponent } from 'react';

interface ICard {
  name?: string;
  description?: string;
}

export class Card extends PureComponent<ICard, ICard> {
  constructor(props: ICard) {
    super(props);
    this.state = { name: 'Card Name', description: 'Card Description' };
  }

  render() {
    return (
      <div className="card-item">
        <h3>{this.state.name}</h3>
        <p>{this.state.description}</p>
      </div>
    );
  }
}
