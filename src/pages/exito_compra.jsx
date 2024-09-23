import '../styles/exito_compra.css'
import { useNavigate } from 'react-router-dom';

export default function Exito(){
    const navigate = useNavigate();

    const handleConfirmarCompra = () => {
      navigate('/home');
    };
    const handleCompras = () => {
        navigate('/compras')
      };
    return(
        
        <div className="confirmacion-container">
            <div className="confirmacion-content">
                <h2>¡Compra realizada con éxito!</h2>
                <h4>
                    Gracias por apoyar a los artesanos peruanos, puedes revisar tu compra
                    en la opción de
                </h4>
                <button className="btn-compras" onClick={handleCompras}>Compras</button>
                <p>Vincula tu correo para recibir más detalles sobre tus compras realizadas</p>
                <input
                    type="email"
                    placeholder="Añadir correo electrónico"
                    className="email-input"
                />
                <button className="btn-inicio" onClick={handleConfirmarCompra}>
                    Regresar al inicio
                </button>   
            </div>
        </div>
);
}