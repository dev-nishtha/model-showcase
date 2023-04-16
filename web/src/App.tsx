import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShowcasePage from './pages/ShowcasePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/showcase" Component={ShowcasePage} />
      </Routes>
    </Router>
  );
}

export default App;
