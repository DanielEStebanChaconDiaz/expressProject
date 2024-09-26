import React from 'react';
import '../styles/documental.css'
import Flecha from '../components/flecha-back';
import FondoFlecha from '../components/fondo-flecha';
import QRCode from 'react-qr-code';

export default function Documental() {
    const valorCodigoQR = "https://www.youtube.com/watch?v=zWaymcVmJ-A"; // Reemplaza con tu URL real

    return (
        <div className='documental-container'>
            <FondoFlecha/>
            <Flecha/>
            <section>
                <div className='header-documental'>
                    <h3>El Taller de Arte Awaq Ayllus reúne a más de 60 tejedores y tejedoras ayacuchanos que producen tapices murales y delicadas piezas bordadas para diversos usos decorativos y utilitarios.</h3>
                </div>
                <div className='nombre-taller-documental'>
                    <h2>Taller de arte Awaq Ayllus - Documental</h2>
                </div>
                <div className='video-documental'>
                    <img src="../../public/img/video-ejemplo.svg" alt="Video ejemplo" />
                </div>
                <div className='info-codigo'>
                    <h3>Conoce más del taller de forma interactiva</h3>
                    <h4>Escanea el código QR con tu celular y disfruta de la experiencia</h4>
                </div>
                <div className='codigo-qr'>
                    <QRCode value={valorCodigoQR} size={128} />
                </div>
            </section>
        </div>
    )
}