import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Viewer from './pages/Viewer';
import HomePage from './pages/HomePage';
// import ShowcasePage from './pages/ShowcasePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/showcase" Component={Viewer} />
      </Routes>
    </Router>
  );
}

export default App;
