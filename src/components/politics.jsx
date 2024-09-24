import '../styles/politics.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Politics() {
    const navigate = useNavigate();
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [promotionsAccepted, setPromotionsAccepted] = useState(false);

    const handleClick = () => {
        navigate(-1);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (privacyAccepted && termsAccepted) {
            // Lógica de registro aquí
        } else {
            alert("Por favor, acepta los términos y condiciones.");
        }
    };

    return (
        <div className="politics-container">
            <i className='bx bx-arrow-back bx-arrow-back1' onClick={handleClick} style={{ cursor: 'pointer' }}></i>
            <div className="check">
                <div className="privacidad">
                    <input 
                        type="checkbox" 
                        className="checkbox" 
                        checked={privacyAccepted}
                        onChange={() => setPrivacyAccepted(!privacyAccepted)} 
                    />
                    <p>He leído y acepto la <a href="#">Política de privacidad</a></p>
                </div>
                <div className="condiciones">
                    <input 
                        type="checkbox" 
                        className="checkbox" 
                        checked={termsAccepted}
                        onChange={() => setTermsAccepted(!termsAccepted)} 
                    />
                    <p>He leído y acepto los <a href="#">Términos y condiciones</a></p>
                </div>
                <div className="proms">
                    <input 
                        type="checkbox" 
                        className="checkbox" 
                        checked={promotionsAccepted}
                        onChange={() => setPromotionsAccepted(!promotionsAccepted)} 
                    />
                    <p>Acepto que me envíen promociones y eventos a mi correo electrónico</p>
                </div>
            </div>
            <div className="registrar">
                <i className='bx bx-chevron-right bx-chevron-right1'></i>
                <a href="#" onClick={handleRegister}>Registrarse</a>
            </div>
        </div>
    );
}
