import '../styles/confirmacion_compra.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function Confirmacion({ closeModal, total, onCompraExitosa }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleConfirmarCompra = async () => {
    try {
      const response = await axios.post('https://localhost:3000/api/usuarios/comprar', {}, {
        withCredentials: true
      });
      
      if (response.status === 200) {
        onCompraExitosa(); // Llamar a esta función antes de navegar
        navigate('/exito_compra');
      } else {
        throw new Error('La respuesta del servidor no fue exitosa');
      }
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      setError(error.response?.data?.mensaje || 'Error al procesar la compra. Por favor, intenta de nuevo más tarde.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className='texto-confirm'>¿Seguro de realizar la compra?</p>
        <p>Total a pagar: S/{total.toFixed(2)}</p>
        {error && <p className="error-message">{error}</p>}
        <div className="modal-buttons">
          <button className="modal-button confirm" onClick={handleConfirmarCompra}>
            <img src="../../public/img/confirmation.svg" alt="Confirmar compra" />
          </button>
          <button className="modal-button cancel" onClick={closeModal}>
            <img src="../../public/img/no-confirmation.svg" alt="Cancelar compra" />
          </button>
        </div>
      </div>
    </div>
  );
}