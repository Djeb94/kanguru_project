import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./main.css";

function Main() {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const playerId = localStorage.getItem('playerId');
  const playerInfos = JSON.parse(localStorage.getItem('playerInfos'));



  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <div>
      <div className="navbar">
        <a>DISCOVER</a>
        <a>FEATURES</a>
        <a>SEASONS</a>
        {playerId ? (
          <Link to="/">
            <button>{playerInfos[0].nick_name}</button>
          </Link>
        ) : (
          <div>
            <Link to="/login" id="link">
              <button id="login">&#x2022; Log In &#x2022;</button>
            </Link>
            <button id="signup">&#x2022; Sign Up &#x2022;</button>
          </div>
        )}
        <span className="material-symbols-outlined" id="toggle-menu" onClick={toggleSubMenu}>
          menu
        </span>
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

      <div className="containeur">
        <div className="element1">
          <h2>SPACE <mark>KANGURUS</mark></h2>
          <p>Warp into a epic space adventure & defend the motherland against the cyber dingoes !</p>
          <button id="steam">&#x2022; Wish list on Steam &#x2022;</button>
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

export default Main;
