import { useNavigate } from 'react-router-dom';
import '../styles/loginMaki.css';
import { useState } from 'react';
import FondoFlecha from './fondo-flecha';
import Flecha from './flecha-back';

export default function Maki() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    };

    const [contactInfo, setContactInfo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación básica
        if (!contactInfo || !password) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        const isEmail = /\S+@\S+\.\S+/.test(contactInfo);
        const isPhone = /^\+?[\d\s-]{10,}$/.test(contactInfo);
        const isUsername = /^[a-zA-Z0-9_]{5,12}$/.test(contactInfo);

        if (!isEmail && !isPhone && !isUsername) {
            setError('Por favor, ingrese un correo electrónico o número de teléfono válido.');
            return;
        }

        // Si todo está bien, guardar los datos en el localStorage
        const formData = {
            contactInfo,
            password,
        };

        localStorage.setItem('userData', JSON.stringify(formData));

        // Limpiar el error (si lo había) y redirigir
        setError('');
        console.log("Datos guardados:", formData);

        // Redirigir a #/politics
        navigate('/Home');
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        // Redirigir a la página de restablecimiento de contraseña
        navigate('/reset-password');
    };

    return (
        <div className="container-login">
            <FondoFlecha/>
            <Flecha/>
            <div className="container-top-login">
                <form onSubmit={handleSubmit} className='loginMaki'>
                    <h3>Nombre de usuario, celular o correo</h3>
                    <input 
                        type="text" 
                        placeholder="" 
                        value={contactInfo} 
                        onChange={(e) => setContactInfo(e.target.value)} 
                        required 
                    />

                    <h3>Contraseña</h3>
                    <input 
                        type="password" 
                        placeholder="" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    
                    <div className="iniciar">
                        <button type="submit">
                            <p>Iniciar sesión</p>
                        </button>
                    </div>
                    <div className="Olvidaste">
                        <button type="button" onClick={handleForgotPassword}>
                            <p>¿Olvidaste tu contraseña?</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}