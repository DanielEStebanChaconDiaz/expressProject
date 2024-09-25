import React from 'react';
import axios from 'axios';
import '../styles/login.css';

export default function Login() {
    const FacebookAuth = async () => {
        try {
            const response = await axios.get('https://localhost:3000/auth/facebook');
            
            if (response.data && response.data.redirectUrl) {
                window.location.href = response.data.redirectUrl;
            } else {
                console.error('No se recibió una URL de redirección válida');
            }
        } catch (error) {
            console.error('Error al iniciar la autenticación de Facebook:', error);
        }
    };

    return (
        <div className="container-top">
            <h2>Inicia sesión y <br />continúa viendo <strong>tus artesanías favoritas</strong></h2>
            <button className="social-btn fb-btn" onClick={FacebookAuth}>
                <img src="../../public/img/facebook.svg" alt="" /> Inicia Sesión con Facebook
            </button>
            <button className="social-btn insta-btn">
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