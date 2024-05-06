import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importation des composants nécessaires depuis react-router-dom
import { Fragment } from 'react'; // Importation du composant Fragment depuis React
import "./App.css"; // Importation des styles CSS de l'application
import LoginForm from './components/login'; // Importation du composant de formulaire de connexion
import "./fonts/Loomattic-Regular.woff2"; // Importation du fichier de police Loomattic-Regular
import "./fonts/Nunito-Regular.woff2"; // Importation du fichier de police Nunito-Regular
import Main from './components/main'; // Importation du composant principal de l'application
import User from './components/user';
import ProtectedRoute from './components/protectedRoute';

function App() {
  return (
    <Router> {/* Utilisation du composant Router pour définir le contexte de navigation */}
      <Fragment> {/* Utilisation du composant Fragment pour retourner plusieurs éléments sans nécessiter un conteneur supplémentaire */}
        <Routes> {/* Utilisation du composant Routes pour définir les routes de l'application */}
          <Route path="/" element={<Main />} /> {/* Définition de la route pour le composant Main */}
          <Route path='/login' element={<LoginForm/>}/> {/* Définition de la route pour le composant LoginForm */}
          <Route element={<ProtectedRoute/>}>
            <Route exact path='/user' element={<User/>}/>
          </Route>
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App; // Exportation du composant App pour l'utiliser dans d'autres parties de l'application
