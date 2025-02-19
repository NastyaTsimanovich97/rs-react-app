import { useContext } from 'react';
import classNames from 'classnames';
import { cardAdded, cardDeleted } from '../app/cardsSlice';
import { useAppDispatch } from '../app/hooks';
import { spliceDescription } from '../utils/spliceDescription.util';
import { Checkbox } from './Checkbox';
import ThemeContext from '../context/themeContext';

interface ICardProps {
  id: string;
  onClick: (id: string) => void;
  isChecked: boolean;
  name?: string;
  authors?: string;
  description?: string;
}

export function Card(props: ICardProps) {
  const dispatch = useAppDispatch();

  const theme = useContext(ThemeContext);

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    isChecked: boolean
  ) => {
    event.stopPropagation();

    const action = isChecked ? cardDeleted : cardAdded;
    dispatch(
      action({
        id: props.id,
        name: props.name,
        description: props.description,
        authors: props.authors,
      })
    );
  };

  return (
    <div
      data-testid="card-item"
      className={classNames('card-item', theme)}
      onClick={() => props.onClick(props.id)}
    >
      <Checkbox isChecked={props.isChecked} handleChange={handleCheck} />
      <div>
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
    </div>
  );
}
