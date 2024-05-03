import React, { useState } from 'react'; // Importation de React et du hook useState depuis la bibliothèque react
import authenticate from '../services/auth.js'; // Importation de la fonction authenticate depuis le fichier auth.js dans le répertoire services

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
    <div>
      <h2>Login</h2> {/* Titre du formulaire */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Affichage de l'erreur si présente */}
      <form onSubmit={handleSubmit}> {/* Formulaire avec gestion de la soumission */}
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> {/* Champ pour le nom d'utilisateur avec gestion des changements */}
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> {/* Champ pour le mot de passe avec gestion des changements */}
        </label>
        <br />
        <button type="submit">Login</button> {/* Bouton de soumission du formulaire */}
      </form>
    </div>
  );
}

export default LoginForm; // Exportation du composant LoginForm
