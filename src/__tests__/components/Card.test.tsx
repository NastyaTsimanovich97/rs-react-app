import { vi } from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../../components/Card';
import { renderWithProviders } from '../store';

const mockCardData = {
  id: '1',
  onClick: () => {},
  name: 'Test Card Component Name',
  authors: 'Test Card Component Author',
  description: 'Test Card Component Description',
};

const mockCardDefaultData = {
  id: '1',
  onClick: () => {},
  name: 'Card Name',
  authors: 'Card Authors',
  description: 'Card Description',
};

afterEach(() => {
  cleanup();
});

describe('Card Component', () => {
  it('renders the Card with the correct data', () => {
    renderWithProviders(
      <Card
        id={mockCardData.id}
        name={mockCardData.name}
        authors={mockCardData.authors}
        description={mockCardData.description}
        onClick={mockCardData.onClick}
        isChecked={false}
      />
    );

    expect(screen.getByText(mockCardData.name)).toBeInTheDocument();
    expect(screen.getByText(mockCardData.authors)).toBeInTheDocument();
    expect(screen.getByText(mockCardData.description)).toBeInTheDocument();
  });

  it('renders the Card with default data', () => {
    renderWithProviders(
      <Card
        id={mockCardData.id}
        name={undefined}
        authors={undefined}
        description={undefined}
        onClick={mockCardData.onClick}
        isChecked={false}
      />
    );

    expect(screen.getByText(mockCardDefaultData.name)).toBeInTheDocument();
    expect(screen.getByText(mockCardDefaultData.authors)).toBeInTheDocument();
    expect(
      screen.getByText(mockCardDefaultData.description)
    ).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    renderWithProviders(
      <Card
        id={mockCardData.id}
        name={mockCardData.name}
        authors={mockCardData.authors}
        description={mockCardData.description}
        onClick={handleClick}
        isChecked={false}
      />
    );

    await userEvent.click(screen.getByText(mockCardData.name));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
