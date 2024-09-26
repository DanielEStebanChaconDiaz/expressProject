import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../styles/loginMaki.css';

export default function Maki() {
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
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
      setError('Por favor, ingrese un correo electrónico, número de teléfono o nombre de usuario válido.');
      return;
    }

    try {
      const response = await axios.post('https://localhost:3000/login', {
        contactInfo,
        password
      }, { withCredentials: true });

      if (response.data.success) {
        console.log('Sesión iniciada:', response.data.user);
        navigate('/Home');
      } else {
        setError('Credenciales inválidas. Por favor, verifique su información.');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      setError('Ocurrió un error durante el inicio de sesión. Por favor, intente nuevamente.');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate('/reset-password');
  };

  return (
    <div className="container-login">
      <div className="back-button-maki">
        <img src="../../public/img/flecha1-craft.svg" alt="" className='flecha2'/>
        <i className="bx bx-arrow-back" onClick={handleClick}></i>
      </div>
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