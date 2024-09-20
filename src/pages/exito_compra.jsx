import '../styles/exito_compra.css'

export default function Exito(){
    return(
        <div className="confirmacion-container">
        <div className="confirmacion-content">
            <img src="../../public/img/exito.svg" alt="Compra exitosa" className='exito'/>
            <h1>¡Compra realizada con éxito!</h1>
            <p>
                Gracias por apoyar a los artesanos peruanos, puedes revisar tu compra
                en la opción de
            </p>
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