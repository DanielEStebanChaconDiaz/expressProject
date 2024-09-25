import React from 'react';
import axios from 'axios';
import '../styles/login.css';

export default function Login() {
    const FacebookAuth = async () => {
        try {
            // Redirige al usuario a la URL de autenticación de Facebook
            window.location.href = 'https://localhost:3000/auth/facebook/callback';
            
            // Después de que el usuario se autentique, tu backend debería redirigirlo a tu aplicación
            // aquí podrías hacer una solicitud para obtener el ID del usuario
            const response = await axios.get('http://localhost:3001/api/getUserId'); // Ajusta la URL según tu API
            
            // Almacena el ID del usuario en localStorage
            if (response.data.userId) {
                localStorage.setItem('userId', response.data.userId);
                console.log('User ID stored in localStorage:', response.data.userId);
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
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
    );
}
