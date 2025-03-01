import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../components/Button';

describe('Button', () => {
  const handleClick = vi.fn();

  it('renders the button with the correct label', () => {
    render(<Button label="Click Me" handleClick={handleClick} />);

    expect(
      screen.getByRole('button', { name: 'Click Me' })
    ).toBeInTheDocument();
  });

  it('calls handleClick when the button is clicked', async () => {
    render(<Button label="Click Me" handleClick={handleClick} />);

    await userEvent.click(screen.getByRole('button', { name: 'Click Me' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies the correct className to the button', () => {
    render(
      <Button
        label="Click Me"
        handleClick={handleClick}
        className="custom-class"
      />
    );

    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toHaveClass('custom-class');
  });

  it('renders the button without a className if none is provided', () => {
    render(<Button label="Click Me" handleClick={handleClick} />);

    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).not.toHaveClass();
  });
});
