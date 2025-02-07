import { spliceDescription } from '../utils/spliceDescription.util';

interface ICardProps {
  name?: string;
  authors?: string;
  description?: string;
}

export function Card(props: ICardProps) {
  return (
    <div className="card-item">
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
