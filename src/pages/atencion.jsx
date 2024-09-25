import '../styles/atencion.css'
import Flecha from '../components/flecha-back'
import Rombo from '../components/header-rombo'
import FondoFlecha from '../components/fondo-flecha'

export default function Atencion(){
    return(
        <div className='atencion-container'>
            <FondoFlecha/>
            <Flecha/>
            <Rombo/>
            <section className="faq-section">
                <h3>Preguntas frecuentes</h3>
                <div className="faq-item">¿Cómo compro en la app?</div>
                <div className="faq-item">¿Cómo me inscribo en un taller?</div>
                <div className="faq-item">¿Cómo escaneo el QR interactivo?</div>
                <div className="faq-item">¿Cómo cambio la moneda en la app?</div>
                <div className="faq-item">¿Cómo reporto un problema?</div>
            </section>

                <p>¿Necesitas atención personalizada? habla con nuestro equipo de soporte</p>
            <section className="support-section">
                <div className="support-button1">
                <img src="../../public/img/chat-atencion.svg" alt="" /> Empieza un chat
                </div>
                <div className="support-button2">
                <img src="../../public/img/llamada.svg" alt="" /> Programa una llamada
                </div>
            </section>
        </div>
    )
}