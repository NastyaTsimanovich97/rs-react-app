import { saveAs } from 'file-saver';

import { allSelectedCardsDeleted } from '../app/store/cardsSlice';
import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import { Button } from './Button';

export function DownloadSection() {
  const dispatch = useAppDispatch();
  const selectedCards = useAppSelector((state) => state.selectedCards);
  const selectedCardsLength = selectedCards.length;

  const text =
    selectedCardsLength > 1
      ? `${selectedCardsLength} items are selected`
      : `${selectedCardsLength} item is selected`;

  const handleUnselect = () => {
    dispatch(allSelectedCardsDeleted());
  };

  const handleDowloadCSV = () => {
    const csvString = [
      ['Name', 'Description', 'Authors'],
      ...selectedCards.map((item) => [
        item.name,
        item.description,
        item.authors,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });

    saveAs(blob, `${selectedCards.length}_books.csv`);
  };

  return !selectedCardsLength ? (
    <></>
  ) : (
    <div className="download-container">
      <h4>{text}</h4>
      <Button
        className="download-btn"
        label="Download"
        handleClick={handleDowloadCSV}
      />
      <Button
        className="unselect-btn"
        label="Unselect all"
        handleClick={handleUnselect}
      />
    </div>
  );
}
