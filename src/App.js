import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importez Routes au lieu de Switch
import {Fragment} from 'react';
import "./App.css";
import "./fonts/Loomattic-Regular.woff2";
import "./fonts/Nunito-Regular.woff2";
import Main from './components/main';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes> {/* Utilisez Routes au lieu de Switch */}
          <Route path="/" element={<Main />} /> {/* Utilisez element au lieu de component */}
        </Routes>
        </Fragment>
    </Router>
  );
}

export default App;
