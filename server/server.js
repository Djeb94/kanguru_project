const axios = require('axios');
const querystring = require('querystring');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true })); // Middleware pour parser le corps des requêtes en x-www-form-urlencoded

const BASE_URL = 'https://kangurus.com/technical-interviews/api';

// Route pour obtenir le jeton d'accès
app.get('/access-token', async (req, res) => {
  const clientId = 'cl13nT';
  const clientSecret = '53c!r3t';
  const grantType = 'client_credentials';

  const tokenParams = new URLSearchParams();
  tokenParams.append('client_id', clientId);
  tokenParams.append('client_secret', clientSecret);
  tokenParams.append('grant_type', grantType);

  const tokenRequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: tokenParams,
  };

  try {
    const response = await fetch(`${BASE_URL}/access-token`, tokenRequestOptions);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    const accessToken = data.access_token;
    console.log('Access Token:', accessToken); // Log du jeton d'accès dans le terminal
    res.json({ access_token: accessToken });
  } catch (error) {
    console.error('Erreur lors de la récupération du jeton d\'accès:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du jeton d\'accès' });
  }
});

// Route pour la connexion de l'utilisateur
// Route pour la connexion de l'utilisateur
app.post('/player/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Récupération du token d'accès depuis l'en-tête Authorization
    const accessToken = req.headers.authorization.split('Bearer ')[1];

    // Envoi des données de connexion à l'API distante
    const response = await axios.post(
      'https://kangurus.com/technical-interviews/api/player/login',
      { username, password }, // Utilisation directe de l'objet
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accessToken}`,
        },
      }
      
    );
    // Vérification de la réponse de l'API distante
      console.log('succes');
      res.status(200).json(response.data);
      const userId = response.data.player.id;
      console.log(userId);
      
    
  } catch (error) {
    // Erreur lors de la connexion à l'API distante
    console.error('Erreur lors de la connexion du joueur:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion du joueur' });
  }
});

app.get('/player/:id', async (req, res) => {
  const playerId = req.params.id;

  try {
    // Get access token from header
    const authHeader = req.headers.authorization;
    const accessToken = authHeader.split('Bearer ')[1];
    
    // Fetch player data using player id and access token
    const response = await axios.get(`https://kangurus.com/technical-interviews/api/player/?id=${playerId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Check if player data was fetched successfully
    if (response.data.player) {
      res.json([response.data.player]); // Mettre les informations du joueur dans un tableau
      console.log(response.data)
    } else {
      res.status(404).json({ error: 'Player not found' });
    }
  } catch (error) {
    console.error('Error fetching player data:', error);
    res.status(500).json({ error: 'Error fetching player data' });
  }
});




app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur le port ${PORT}`);
});
