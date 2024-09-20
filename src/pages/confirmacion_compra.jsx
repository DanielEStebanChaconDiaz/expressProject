import '../styles/confirmacion_compra.css';

export default function Confirmacion({ closeModal }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className='texto-confirm'>¿Seguro de realizar la compra?</p>
        <div className="modal-buttons">
          <button className="modal-button confirm" onClick={() => { /* Lógica de confirmación de compra */ }}>
          <img src="../../public/img/confirmation.svg" alt="" />

          </button>
          <button className="modal-button cancel" onClick={closeModal}>
            <img src="../../public/img/no-confirmation.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
