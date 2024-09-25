import React from 'react';
import axios from 'axios';
import '../styles/login.css';

export default function Login() {
    const FacebookAuth = () => {
        window.location.href = 'https://localhost:3000/auth/facebook';
    };
    const DiscordAuth = () => {
        window.location.href = 'https://localhost:3000/auth/discord';
    };
    

    return (
        <div className="container-top">
            <h2>Inicia sesión y <br />continúa viendo <strong>tus artesanías favoritas</strong></h2>
            <button className="social-btn fb-btn" onClick={FacebookAuth}>
                <img src="../../public/img/facebook.svg" alt="" /> Inicia Sesión con Facebook
            </button>
            <button className="social-btn insta-btn" onClick={DiscordAuth}>
                <img src="../../public/img/instagram.svg" alt="" /> Inicia sesión con Instagram
            </button>
            <button className="social-btn gmail-btn">
                <img src="../../public/img/gmail.svg" alt="" /> Inicia sesión con Gmail
            </button>
            <button className="social-btn mail-btn">
                <a href="#/Maki"><img src="../../public/img/maki.svg" alt="" />Inicia sesión con tu cuenta de Ruraq Maki</a>
            </button>
        </div>
    )
}