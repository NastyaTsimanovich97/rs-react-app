import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeContext from '../../context/themeContext';
import { ThemeRadioButton } from '../../components/ThemeRadioButton';

describe('ThemeRadioButton', () => {
  const handleChange = vi.fn();

  const theme = 'light';
  const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );

  it('renders the radio buttons with correct labels', () => {
    render(
      <ThemeProvider>
        <ThemeRadioButton value="light" handleChange={handleChange} />
      </ThemeProvider>
    );

    expect(screen.getByLabelText('Light Theme')).toBeInTheDocument();
    expect(screen.getByLabelText('Dark Theme')).toBeInTheDocument();
  });

  it('sets the correct radio button as checked based on the value prop', () => {
    render(
      <ThemeProvider>
        <ThemeRadioButton value="light" handleChange={handleChange} />
      </ThemeProvider>
    );

    expect(screen.getByLabelText('Light Theme')).toBeChecked();
    expect(screen.getByLabelText('Dark Theme')).not.toBeChecked();
  });

  it('calls handleChange with the correct value when a radio button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeRadioButton value="light" handleChange={handleChange} />
      </ThemeProvider>
    );

    await user.click(screen.getByLabelText('Dark Theme'));

    expect(handleChange).toHaveBeenCalledWith('dark');
  });
});
