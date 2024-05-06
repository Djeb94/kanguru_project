import React from "react";
import { Link } from 'react-router-dom';
import "./user.css";

function User() {
    
    const playerInfos = JSON.parse(localStorage.getItem('playerInfos'));
    
    return(
        <div className="containeur3">
        
            <div className="card">
            <Link to="/"><p id='comeback'>&#x2190; back</p></Link>
            <h1>Your profil</h1>
            <div className="head-profil">
                <img id="profil-avatar" src={playerInfos[0].social.avatar} />
                <div className="main-profil">
                    <h2><mark>nickname : </mark>{playerInfos[0].nick_name}</h2>
                    <h1><mark>level : </mark>{playerInfos[0].level}</h1>
                    <h3><mark>xp : </mark>{playerInfos[0].xp.current} / {playerInfos[0].xp.to_next_level}</h3>
                </div>
            </div>
            <div className="secondary-profil"> 
                <h2><mark>first name : </mark>{playerInfos[0].first_name}</h2>
                <h2><mark>last name : </mark>{playerInfos[0].last_name}</h2>
                <h2><mark>email : </mark>{playerInfos[0].email}</h2>
                </div>
            </div>
        </div>
    )
}
export default User;