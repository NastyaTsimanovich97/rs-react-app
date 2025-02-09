import { SearchBar } from '../components/SearchBar';

interface IHeaderSectionProps {
  onUpdateSearch: (value: string) => void;
}

export function HeaderSection(props: IHeaderSectionProps) {
  return <SearchBar onUpdateSearch={props.onUpdateSearch} />;
}
