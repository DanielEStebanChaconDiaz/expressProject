import { useNavigate } from 'react-router-dom';
import '../styles/loginMaki.css';
import { useState } from 'react';

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

        // Validar si es un email o un número de teléfono
        const isEmail = /\S+@\S+\.\S+/.test(contactInfo);
        const isPhone = /^\+?[\d\s-]{10,}$/.test(contactInfo);

        if (!isEmail && !isPhone) {
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
        navigate('/politics');
    };

    return (
        <div className="container-email">
            <i className='bx bx-arrow-back' onClick={handleClick} style={{ cursor: 'pointer' }}></i>
            <div className="container-top-email">
                <form onSubmit={handleSubmit}>
                    <h3>Correo electrónico o número de teléfono*</h3>
                    <input 
                        type="text" 
                        placeholder="Correo electrónico o número de teléfono" 
                        value={contactInfo} 
                        onChange={(e) => setContactInfo(e.target.value)} 
                        required 
                    />

                    <h3>Contraseña*</h3>
                    <p>Recuerda crear una contraseña difícil de adivinar</p>
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    
                    <div className="continuar">
                        <button type="submit">
                            <i className='bx bx-chevron-right'></i><p>Continuar</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}