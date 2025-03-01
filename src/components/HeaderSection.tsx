import { SearchBar } from './SearchBar';

interface IHeaderSectionProps {
  onUpdateSearch: (value: string) => void;
}

export function HeaderSection(props: IHeaderSectionProps) {
  return <SearchBar onUpdateSearch={props.onUpdateSearch} />;
}
