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

  const fetchAccessToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/access-token');
      localStorage.setItem('token', response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      throw new Error('Erreur lors de la récupération du token d\'accès');
    }
  };

  const loginUser = async (username, password, access_token) => {
    try {
      const loginParams = new URLSearchParams();
      loginParams.append('username', username);
      loginParams.append('password', password);

      const response = await axios.post('http://localhost:5000/player/login', loginParams, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${access_token}`,
        },
      });
      localStorage.setItem('playerId', response.data.player.id);
      console.log(response.data.player.id);
      return response.data;
    } catch (error) {
      throw new Error('Échec de la connexion. Veuillez vérifier vos identifiants.');
    }
  };

  const userInfo = async (accessToken, playerId) => {
    try {
      const response = await axios.get(`http://localhost:5000/player/${playerId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('Informations du joueur :', response.data);
      localStorage.setItem('playerInfos', JSON.stringify(response.data));
    } catch (error) {
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
