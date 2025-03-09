'use client';

import React, { useState, ReactNode, StrictMode } from 'react';
import { Provider } from 'react-redux';
import { ErrorBoundary } from '../components/ErrorBoundary';
import ThemeContext from '../context/themeContext';
import { ThemeRadioButton } from '../components/ThemeRadioButton';
import { setupStore } from './store/store';
import '../index.css';
import '../App.css';

export function Providers({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light');

  const handleChangeTheme = (value: string) => {
    setTheme(value);
  };

  return (
    <StrictMode>
      <Provider store={setupStore()}>
        <ErrorBoundary>
          <ThemeContext.Provider value={theme}>
            <ThemeRadioButton value={theme} handleChange={handleChangeTheme} />
            {children}
          </ThemeContext.Provider>
        </ErrorBoundary>
      </Provider>
    </StrictMode>
  );
}
