import '../styles/confirmacion_compra.css';
import { useNavigate } from 'react-router-dom';
export default function Confirmacion({ closeModal }) {
  const navigate = useNavigate();

  const handleConfirmarCompra = () => {
    navigate('/exito_compra');
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className='texto-confirm'>¿Seguro de realizar la compra?</p>
        <div className="modal-buttons">
        <button className="modal-button confirm" onClick={handleConfirmarCompra}>
      <img src="../../public/img/confirmation.svg" alt="Confirmar compra" />
    </button>
          <button className="modal-button cancel" onClick={closeModal}>
            <img src="../../public/img/no-confirmation.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
