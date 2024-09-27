import '../styles/comentarios.css'
import React, { useState } from 'react';
import Flecha from '../components/flecha-back'
import Rombo from '../components/header-rombo'
import FondoFlecha from '../components/fondo-flecha'

export default function Comentario(){
    const [problemaSeleccionado, setProblemaSeleccionado] = useState('');
    const [otroProblema, setOtroProblema] = useState('');
  
    const problemasFrecuentes = [
      'La aplicación no carga de manera correcta',
      'Errores al querer comprar en la aplicación',
      'No puedo ver las imágenes de las tiendas y/o artesanías',
      'No me permite usar un cupón de descuento',
      'No me deja inscribirme a los talleres',
      'El QR interactivo no funciona de manera correcta',
    ];
  
    const handleProblemaClick = (problema) => {
      setProblemaSeleccionado(problema);
    };
  
    const handleSubmit = () => {
      const problema = otroProblema || problemaSeleccionado;
      alert(`Problema reportado: ${problema}`);
    };
    return(
        <div className='comentario-container'>
            <FondoFlecha/>
            <Flecha/>
            <Rombo/>
            <h3 className='problems'>Problemas frecuentes</h3>
      <div className="problemas-frecuentes">
        {problemasFrecuentes.map((problema, index) => (
          <button
            key={index}
            className={`problema-item ${
              problemaSeleccionado === problema ? 'active' : ''
            }`}
            onClick={() => handleProblemaClick(problema)}
          >
            {problema}
          </button>
        ))}
      </div>

      <h3 className='others'>Otro</h3>
      <textarea
        placeholder="Describe aquí tu problema..."
        value={otroProblema}
        onChange={(e) => setOtroProblema(e.target.value)}
        className="otro-problema"
      />

      <div className="action-buttons">
        <button className="adjuntar-button">Adjuntar captura</button>
        <button className="enviar-button" onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </div>

    )
}