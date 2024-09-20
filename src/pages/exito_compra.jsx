import '../styles/exito_compra.css'

export default function Exito(){
    return(
        <div className="confirmacion-container">
            <div className="confirmacion-content">
                <h2>¡Compra realizada con éxito!</h2>
                <h4>
                    Gracias por apoyar a los artesanos peruanos, puedes revisar tu compra
                    en la opción de
                </h4>
                <button className="btn-compras">Compras</button>
                <p>Vincula tu correo para recibir más detalles sobre tus compras realizadas</p>
                <input
                    type="email"
                    placeholder="Añadir correo electrónico"
                    className="email-input"
                />
                <button className="btn-inicio">
                    Regresar al inicio
                </button>
            </div>
        </div>
);
}