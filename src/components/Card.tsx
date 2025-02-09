import { spliceDescription } from '../utils/spliceDescription.util';

interface ICardProps {
  id: string;
  onClick: (id: string) => void;
  name?: string;
  authors?: string;
  description?: string;
}

export function Card(props: ICardProps) {
  return (
    <div
      data-testid="card-item"
      className="card-item"
      onClick={() => props.onClick(props.id)}
    >
      <h2>{props.name || 'Card Name'}</h2>
      <p>
        <b>Authors: </b>
        {props.authors || 'Card Authors'}
      </p>
      <p>
        <b>Summary: </b>
        {spliceDescription(props.description || 'Card Description')}
      </p>
    </div>
  );
}
