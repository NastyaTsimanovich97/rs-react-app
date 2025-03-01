import React from 'react';
import { vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as useLocalStorageHooks from '../../hooks/useLocalStorage';
import { SearchBar } from '../../components/SearchBar';

const useLocalStorageSpy = vi.spyOn(useLocalStorageHooks, 'useLocalStorage');

afterEach(() => {
  cleanup();
  useLocalStorageSpy.mockClear();
});

const mockData = {
  onUpdateSearch: vi.fn(),
};

describe('SearchBar Component', () => {
  it('renders the SearchBar with the correct data from Local Storage', () => {
    useLocalStorageSpy.mockReturnValue(['Test Search Value', () => {}]);

    render(<SearchBar onUpdateSearch={mockData.onUpdateSearch} />);

    expect(screen.getByDisplayValue('Test Search Value')).toBeInTheDocument();
  });

  it('on button click the SearchBar store data to the Local Storage', async () => {
    useLocalStorageSpy.mockReturnValue(['Test Search Value', () => {}]);

    render(<SearchBar onUpdateSearch={mockData.onUpdateSearch} />);

    await userEvent.click(screen.getByRole('button'));

    expect(mockData.onUpdateSearch).toHaveBeenCalledTimes(1);
  });

  it('on input change the SearchBar', async () => {
    const setSearchMock = vi.fn();
    useLocalStorageSpy.mockReturnValue(['Test Search Value', setSearchMock]);

    render(<SearchBar onUpdateSearch={mockData.onUpdateSearch} />);

    const inputField = screen.getByTestId('search-input-field');
    fireEvent.change(inputField, {
      target: { value: 'Test value' },
    });

    expect(setSearchMock).toHaveBeenCalledTimes(1);
  });
});
