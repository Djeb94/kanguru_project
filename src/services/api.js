// Définition de l'URL de base pour les requêtes API
const BASE_URL = 'https://kangurus.com/technical-interviews/api';

// Fonction asynchrone pour récupérer le jeton d'accès
async function fetchAccessToken() {
  const clientId = 'cl13nT'; // Identifiant client
  const clientSecret = '53c!r3t'; // Secret client
  const grantType = 'client_credentials'; // Type de subvention

  // Construction des paramètres pour la demande de jeton
  const tokenParams = new URLSearchParams();
  tokenParams.append('client_id', clientId);
  tokenParams.append('client_secret', clientSecret);
  tokenParams.append('grant_type', grantType);

  // Options de la requête pour obtenir le jeton
  const tokenRequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: tokenParams,
  };

  try {
    // Envoi de la requête pour obtenir le jeton d'accès
    const response = await fetch(`${BASE_URL}/access-token`, tokenRequestOptions);
    if (!response.ok) {
      // Gestion des erreurs HTTP
      throw new Error(`Erreur HTTP ${response.status} - ${response.statusText}`);
    }
    const data = await response.json(); // Extraction des données JSON de la réponse
    return data.access_token; // Retourne le jeton d'accès
  } catch (error) {
    console.error('Erreur lors de la récupération du jeton d\'accès:', error);
    throw error; // Lance une nouvelle erreur
  }
}

// Fonction asynchrone pour la connexion de l'utilisateur
async function login(username, password, accessToken) {
  const loginParams = {
    username,
    password,
  };

  // Options de la requête pour la connexion de l'utilisateur
  const loginOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`, // Utilisation du jeton d'accès pour l'authentification
    },
    body: JSON.stringify(loginParams), // Conversion des paramètres de connexion en JSON
  };

  try {
    // Envoi de la requête pour la connexion de l'utilisateur
    const response = await fetch(`${BASE_URL}/player/login`, loginOptions);
    if (!response.ok) {
      // Gestion des erreurs HTTP
      throw new Error(`Erreur HTTP ${response.status} - ${response.statusText}`);
    }
    const playerData = await response.json(); // Extraction des données JSON de la réponse
    return playerData; // Retourne les données du joueur
  } catch (error) {
    console.error('Erreur lors de la connexion du joueur:', error);
    throw error; // Lance une nouvelle erreur
  }
}

// Export des fonctions fetchAccessToken et login pour les rendre accessibles depuis d'autres fichiers
export { fetchAccessToken, login };
