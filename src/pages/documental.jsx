import React from 'react';
import '../styles/documental.css'
import Flecha from '../components/flecha-back';
import FondoFlecha from '../components/fondo-flecha';
import QRCode from 'react-qr-code';
import { useLocation } from 'react-router-dom';

export default function Documental() {
    const location = useLocation();
    const taller = location.state?.taller;

    const valorCodigoQR = taller?.video || "https://www.youtube.com/watch?v=_u3NH5yGZt0&list=PLSbDMtNBmYTtx23xKzeq756HGYRB11BCU";

    return (
        <div className='documental-container'>
            <section>
                <div className='header-documental'>
                    <h3>{taller?.descripcion || "El Taller de Arte Awaq Ayllus reúne a más de 60 tejedores y tejedoras ayacuchanos que producen tapices murales y delicadas piezas bordadas para diversos usos decorativos y utilitarios."}</h3>
                </div>
                <div className='nombre-taller-documental'>
                    <h2>{`${taller?.nombre || "Taller de arte Awaq Ayllus"} - Documental`}</h2>
                </div>
                <div className='video-documental'>
                    <img src={taller?.imagenVideo || "../../public/img/video-ejemplo.svg"} alt={`Video de ${taller?.nombre || "ejemplo"}`} />
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