import { CardList } from '../components/CardList';

interface IMainSectionProps {
  searchValue: string;
  handleClick: () => void;
}

export function MainSection(props: IMainSectionProps) {
  return (
    <div onClick={props.handleClick}>
      <h2>Results</h2>
      <CardList searchValue={props.searchValue} />
    </div>
  );
}
