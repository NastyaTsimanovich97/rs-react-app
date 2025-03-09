import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';
import { CardDetails } from './components/CardDetails';
import ThemeContext from './context/themeContext';
import { ThemeRadioButton } from './components/ThemeRadioButton';

export function App() {
  const [theme, setTheme] = useState('light');

  const handleChangeTheme = (value: string) => {
    setTheme(value);
  };

  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={theme}>
        <ThemeRadioButton value={theme} handleChange={handleChangeTheme} />
        <Router>
          <Routes>
            <Route path="/" element={<SearchPage />}>
              <Route path="/details/:id" element={<CardDetails />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
