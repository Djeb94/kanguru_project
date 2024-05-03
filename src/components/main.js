import React, { useState } from "react"; // Importation de React et du hook useState depuis la bibliothèque react
import { Link } from "react-router-dom"; // Importation de la composante Link depuis la bibliothèque react-router-dom
import "./main.css"; // Importation des styles CSS du composant

function Main() {
  const [showSubMenu, setShowSubMenu] = useState(false); // Déclaration de l'état local showSubMenu avec useState, initialisé à false

  // Fonction pour basculer l'affichage du sous-menu
  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu); // Inversion de la valeur de showSubMenu
  };

  // Retourne la structure HTML du composant
  return (
    <div>
      {/* Barre de navigation */}
      <div className="navbar">
        <a>DISCOVER</a>
        <a>FEATURES</a>
        <a>SEASONS</a>
        <Link to="/login"> {/* Lien vers la page de connexion */}
          <button id="login">&#x2022; Log In &#x2022;</button>
        </Link>
        <button id="signup2">&#x2022; Sign Up &#x2022;</button>
        <span className="material-symbols-outlined" id="toggle-menu" onClick={toggleSubMenu}>
          menu
        </span>
        {/* Affichage du sous-menu s'il est activé */}
        {showSubMenu && (
          <div id="toogle-nav">
            <p>DISCOVER</p>
            <p>FEATURES</p>
            <p>SEASONS</p>
            <button>space</button>
            <div id="toogle-login">&#x2022; Log In &#x2022;</div>
            <div id="toogle-signup">&#x2022; Sign Up &#x2022;</div>
          </div>
        )}
      </div>

      {/* Contenu principal */}
      <div className="containeur">
        <div className="element1">
          <h2>SPACE <mark>KANGURUS</mark></h2>
          <p>Warp into a epic space adventure & defend the motherland against the cyber dingoes !</p>
          <button id="steam">&#x2022; Wish list on Steam &#x2022;</button>
          <button id="signup">&#x2022; Sign Up &#x2022;</button>
        </div>
        <div className="element2"></div>
      </div>
      
      {/* Pied de page */}
      <div className="footer">
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

export default Main; // Exportation du composant Main
