import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorButton from '../../components/ErrorButton';

describe('ErrorButton', () => {
  it('renders the button correctly', () => {
    render(<ErrorButton />);

    expect(
      screen.getByRole('button', { name: 'Error Button' })
    ).toBeInTheDocument();
  });

  it('throws an error when the button is clicked', async () => {
    render(<ErrorButton />);

    const button = screen.getByRole('button', { name: 'Error Button' });

    try {
      await userEvent.click(button);
    } catch (error) {
      expect((error as Error).message).toBe('Error triggered by button click!');
    }
  });

  it('does not throw an error before the button is clicked', () => {
    render(<ErrorButton />);

    expect(
      screen.getByRole('button', { name: 'Error Button' })
    ).toBeInTheDocument();
  });
});
