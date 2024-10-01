import '../styles/taller-info.css'
import { useNavigate, useLocation } from 'react-router-dom';
import Documental from './documental';

export default function InfoTaller(){
    const navigate = useNavigate();
    const location = useLocation();
    const taller = location.state?.taller;

    const handleClick = () => {
        navigate(-1);
    };
    const handleInscribirse = () => {
        alert('Inscripción completada');
    };

    // Si no hay datos del taller, muestra un mensaje de error
    if (!taller) {
        return <div>No se encontró información del taller.</div>;
    }

    return(
        <div className='container-taller-info'>
            <header className="header-craft">
                <div className="back-button-craft">
                    <i className="bx bx-arrow-back" onClick={handleClick}></i>
                    <img src="../../public/img/flecha-craft.svg" alt="" className='flecha'/>
                </div>
                <div className="image-container">
                    <img 
                    src={taller.imagen || "https://via.placeholder.com/400x300"}
                    alt={taller.nombre} 
                    className="product-image" 
                    />
                </div>
            </header>
            <div className="taller-info-card">
                <h2>{taller.nombre}</h2>
                <p>{taller.descripcion}</p>
                <h3><b>{taller.publicoObjetivo}</b></h3>
                <p className='gris-letra'>{taller.notaPublicoObjetivo}</p>

                <h4><b>Duración:</b> {taller.duracion}</h4>
                <h4><b>Fecha de inicio:</b> {taller.fechaInicio}</h4>
                <h4><b>Horario:</b> {taller.horario}</h4>
                <h4><b>Materiales:</b> {taller.materiales}</h4>
                <h4><b>Modalidad:</b> {taller.modalidad}</h4>
                <h4><b>Lugar:</b> {taller.lugar}</h4>
                <div className='inscribir-taller'>
                    <button className="inscribirse-button" onClick={handleInscribirse}>
                    <img src="../../public/img/inscribir.svg" alt="" /> Inscribirse al taller
                    </button>
                    <p className="cupos-lim">*Cupos limitados</p>
                </div>
            </div>
            <Documental taller={taller}/>
        </div>
    )
}