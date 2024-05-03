import React, { useState } from 'react'; // Importation de React et du hook useState depuis la bibliothèque react
import authenticate from '../services/auth.js';// Importation de la fonction authenticate depuis le fichier auth.js dans le répertoire services
import { Link } from 'react-router-dom';
import "./login.css"
import "./main.css"

function LoginForm() {
  // Déclaration des états locaux username, password et error avec useState
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire

    try {
      // Tentative d'authentification avec les informations d'utilisateur saisies
      const playerData = await authenticate(username, password);
      console.log('Authentication successful!'); // Affichage d'un message de succès dans la console
      console.log('Player Data:', playerData); // Affichage des données du joueur dans la console
    } catch (error) {
      setError('Authentication failed. Please check your credentials.'); // Stockage d'une erreur dans l'état error en cas d'échec de l'authentification
    }
  };

  // Retourne la structure HTML du composant
  return (
    <div className='containeur2'>
    <Link to="/"><p id='back'>&#x2190; back</p></Link>
    <div className='form'>
    
      <h2>Log-in</h2> {/* Titre du formulaire */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Affichage de l'erreur si présente */}
      <form onSubmit={handleSubmit}> {/* Formulaire avec gestion de la soumission */}
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/> {/* Champ pour le nom d'utilisateur avec gestion des changements */}
        <br />

          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/> {/* Champ pour le mot de passe avec gestion des changements */}
        <br />
        <button id='submit' type="submit">&#x2022; Submit &#x2022;</button> {/* Bouton de soumission du formulaire */}
      </form>
      </div>
      <div className="footer2">
        <div className="sous-menu">
          <p id="first-menu">HOME</p>
          <p>DISCOVER</p>
          <p>FEATURES</p>
          <p>SEASONS</p>
          <p id="logout">LOG OUT</p>
        </div>
        <div>
          <button id="steam2">&#x2022; Wish list on Steam &#x2022;</button>
        </div>
        <div className="footer-right">
          <p id="followus">FOLLOW US</p>
          <div id="reseau"></div>
          <p id="footer-text">Lorem ipsum dolor sit amet. Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor et</p>
        </div>
      </div>
    </div>
    
  );
}

export default LoginForm; // Exportation du composant LoginForm
