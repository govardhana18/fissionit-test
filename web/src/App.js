import React from 'react';
import { Router } from 'react-router-dom';
import history from './components/History';
import Routes from './components/Routes';

function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}
export default App;