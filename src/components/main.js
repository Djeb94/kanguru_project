import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import de navigate
import "./main.css";

function Main() {
  // Déclaration des états
  const [showSubMenu, setShowSubMenu] = useState(false); // État pour afficher ou masquer le sous-menu
  // Récupération des données du joueur depuis le localStorage
  const playerId = localStorage.getItem('playerId'); // ID du joueur
  const playerInfos = JSON.parse(localStorage.getItem('playerInfos')); // Informations du joueur
  // Utilisation du hook de navigation pour la redirection
  const navigate = useNavigate();

  // Fonction pour basculer l'affichage du sous-menu
  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
    // Modification des classes CSS pour l'icône du menu
    const toggleMenu = document.getElementById("toggle-menu");
    const icon = document.getElementById("toggle-icon");
    toggleMenu.classList.toggle("active"); // Ajout ou suppression de la classe "active" pour le menu
    // Modification du texte de l'icône en fonction de l'état showSubMenu
    if (showSubMenu) {
      icon.textContent = "menu"; // Si le sous-menu est affiché, l'icône devient "menu"
    } else {
      icon.textContent = "close"; // Sinon, l'icône devient "close"
    }
  };
  const handleLogout = () => {
    // Effacer les données du local storage
    localStorage.removeItem('playerId');
    localStorage.removeItem('token');
    localStorage.removeItem('playerInfos');
    // Rediriger vers la page de connexion en utilisant navigate
    navigate('/');
  };

  return (
    <div className="all">
      <div className="navbar">
        <a id="navbarFirst">DISCOVER</a>
        <a>FEATURES</a>
        <a>SEASONS</a>
        <div className="log-button">
        {playerId ? (
          <div className="infos-containeur">
            <div className="navbar-info">
              <Link to="/user" id="link">
                <button id="nickname">{playerInfos[0].nick_name}</button>
              </Link>
              <button id="logout-info" onClick={handleLogout}>Log out</button>
            </div>
            <div id="avatar">
              <img src={playerInfos[0].social.avatar}/>
            </div>
          </div>
        ) : (
          <div className="log-button">
            <Link to="/login" id="link">
              <button id="login">&#x2022; Log In &#x2022;</button>
            </Link>
            <button id="signup2">&#x2022; Sign Up &#x2022;</button>
          </div>
        )}
        </div>
        <div id="toggle-menu">
        <span className="material-symbols-outlined" id="toggle-icon" onClick={toggleSubMenu}>
          menu
        </span>
        </div>
        {showSubMenu && (
          <div id="toogle-nav">
            <p>DISCOVER</p>
            <p>FEATURES</p>
            <p>SEASONS</p>
            <p>{playerInfos[0].nick_name}</p>
          </div>
        )}
      </div>

      <div className="containeur">
        <div className="element1">
          <h2>SPACE <mark>KANGURUS</mark></h2>
          <p>Warp into a epic space adventure & defend the motherland against the cyber dingoes !</p>
          <a href="https://store.steampowered.com/login/?redir=app%2F393380%2FSquad%2F%3Fgclid%3DCjwKCAjw3NyxBhBmEiwAyofDYf8jbt4mC-LDKSNTKB0H0tsmVlR70JAK-k8KmE84ScahdXPc3EohJhoCNpEQAvD_BwE&redir_ssl=1&snr=1_5_9__global-header">
          <button id="steam">&#x2022; Wish list on Steam &#x2022;</button></a>
          <button id="signup">&#x2022; Sign Up &#x2022;</button>
        </div>
        <div className="element2"></div>
        </div>
      
      <div className="footer">
        <div className="sous-menu">
          <p id="first-menu">HOME</p>
          <p>DISCOVER</p>
          <p>FEATURES</p>
          <p>SEASONS</p>
          <p id="logout" onClick={handleLogout}>LOG OUT</p>
        </div>
        <div>
        <a href="https://store.steampowered.com/login/?redir=app%2F393380%2FSquad%2F%3Fgclid%3DCjwKCAjw3NyxBhBmEiwAyofDYf8jbt4mC-LDKSNTKB0H0tsmVlR70JAK-k8KmE84ScahdXPc3EohJhoCNpEQAvD_BwE&redir_ssl=1&snr=1_5_9__global-header">
          <button id="steam2">&#x2022; Wish list on Steam &#x2022;</button>
        </a>
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

export default Main;
