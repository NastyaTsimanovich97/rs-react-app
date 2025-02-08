import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

export function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
