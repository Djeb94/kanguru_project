import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./login.css";


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Récupération du token d'accès depuis l'API
      const access_token = await fetchAccessToken();
  
      // Envoi des données de connexion avec le token d'accès
      const playerData = await loginUser(username, password, access_token);
  
      console.log('Données du joueur :', playerData);

      // Récupération des informations du joueur avec le token d'accès et le playerId
      const playerInfos = await userInfo(access_token, playerData.player.id);


      // Redirection de l'utilisateur vers la page principale
      navigate('/');
    } catch (error) {
      setError('Échec de la connexion. Veuillez vérifier vos identifiants.');
    }
  };

  // Fonction pour récupérer le jeton d'accès
const fetchAccessToken = async () => {
  try {
    // Envoie d'une requête GET pour récupérer le jeton d'accès
    const response = await axios.get('http://localhost:5000/access-token');
    // Stockage du jeton d'accès dans le localStorage
    localStorage.setItem('token', response.data.access_token);
    return response.data.access_token;

  } catch (error) {
    // Gestion des erreurs
    throw new Error('Erreur lors de la récupération du token d\'accès');
  }
};

// Fonction pour connecter l'utilisateur
const loginUser = async (username, password, access_token) => {
  try {
    // Création des paramètres de connexion
    const loginParams = new URLSearchParams();
    loginParams.append('username', username);
    loginParams.append('password', password);

    // Envoie d'une requête POST pour la connexion
    const response = await axios.post('http://localhost:5000/player/login', loginParams, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${access_token}`, 
      },
    });
    // Stockage de l'ID du joueur dans le localStorage
    localStorage.setItem('playerId', response.data.player.id);
    // Affichage de l'ID du joueur dans la console
    console.log(response.data.player.id);

    return response.data;
  } catch (error) {
    // Gestion des erreurs
    throw new Error('Échec de la connexion. Veuillez vérifier vos identifiants.');
  }
};

// Fonction pour récupérer les informations du joueur
const userInfo = async (accessToken, playerId) => {
  try {
    // Envoie d'une requête GET pour récupérer les informations du joueur
    const response = await axios.get(`http://localhost:5000/player/${playerId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, 
      },
    });
    // Affichage des informations du joueur dans la console
    console.log('Informations du joueur :', response.data);
    // Stockage des informations du joueur dans le localStorage
    localStorage.setItem('playerInfos', JSON.stringify(response.data));
  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors de la récupération des informations du joueur :', error);
  }
};


  return (
    <div className='Alllog'>
      <Link to="/"><p id='back'>&#x2190; back</p></Link>
      <div className='form'>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
          <br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
          <br />
          <button id='submit' type="submit">&#x2022; Submit &#x2022;</button>
        </form>
    </div>
    <br></br>

    </div>
  );
}

export default LoginForm;
