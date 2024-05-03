// Import des fonctions fetchAccessToken et login depuis le module api
import { fetchAccessToken, login } from './api';

// Fonction asynchrone pour l'authentification de l'utilisateur
async function authenticate(username, password) {
  try {
    // Récupération du jeton d'accès
    const accessToken = await fetchAccessToken();
    // Connexion de l'utilisateur avec le nom d'utilisateur, le mot de passe et le jeton d'accès
    const playerData = await login(username, password, accessToken);
    // Retourne les données du joueur
    return playerData;
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    throw error; // Lance une nouvelle erreur
  }
}

// Export de la fonction authenticate pour la rendre accessible depuis d'autres fichiers
export default authenticate;
