import '../styles/politics.css';
import { useNavigate } from 'react-router-dom';
export default function Politics() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1)
    }
    return (
        <div className="politics-container">
            <i class='bx bx-arrow-back bx-arrow-back1' onClick={handleClick} style={{ cursor: 'pointer' }}></i>
            <div className="check">
                <div className="privacidad">
                    <input type="checkbox" className="checkbox" /> <p>He leido y acepto la <a href="#">Politica de privacidad</a></p>

                </div>
                <div className="condiciones">
                    <input type="checkbox" className="checkbox" /> <p>He leido y acepto los <a href="#">Terminos y condiciones</a></p>

                </div>
                <div className="proms">
                    <input type="checkbox" className="checkbox" /> <p>Acepto que me envien promociones y eventos a mi correo electrónico</p>

                </div>
            </div>
            <div className="registrar">
                <i className='bx bx-chevron-right bx-chevron-right1' ></i><a href="#">Registrarse</a>
            </div>
        </div>
    )
}