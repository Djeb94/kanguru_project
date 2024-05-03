const clientId = 'cl13nT';
const clientSecret = '53c!r3t';
const grantType = 'client_credentials';

// Créer les paramètres de la requête pour obtenir le jeton d'accès
const tokenParams = new URLSearchParams();
tokenParams.append('client_id', clientId);
tokenParams.append('client_secret', clientSecret);
tokenParams.append('grant_type', grantType);

// Configurer la requête pour obtenir le jeton d'accès
const tokenRequestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: tokenParams,
};

// Effectuer la requête pour obtenir le jeton d'accès
fetch('https://kangurus.com/technical-interviews/api/access-token', tokenRequestOptions)
  .then(response => response.json())
  .then(data => {
    const accessToken = data.access_token;
    console.log('Access Token:', accessToken);

    // Utiliser le jeton d'accès pour authentifier les requêtes ultérieures à l'API
    // Maintenant, effectuer une demande de connexion du joueur en incluant le jeton d'accès
    const playerLoginParams = {
      username: 'john.doe@example.com',
      password: 'p4s5W0rDL33t'
    };

    // Configurer la requête pour la connexion du joueur
    const playerLoginOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}` // Inclure le jeton d'accès dans l'en-tête d'autorisation
      },
      body: JSON.stringify(playerLoginParams), // Convertir les paramètres en JSON
    };

    // Effectuer la requête pour la connexion du joueur
    fetch('https://kangurus.com/technical-interviews/api/player/login', playerLoginOptions)
      .then(response => {
        // Vérifier si la réponse est un code d'état HTTP 200 OK
        if (!response.ok) {
          // Si la réponse n'est pas OK, générer une erreur avec les détails de la réponse
          throw new Error(`Erreur HTTP ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then(playerData => {
        console.log('Données du joueur:', playerData);
      })
      .catch(error => {
        // Capturer et afficher l'erreur
        console.error('Erreur lors de la requête de connexion du joueur:', error);
      });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération du jeton d\'accès:', error);
  });
