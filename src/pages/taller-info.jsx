import '../styles/taller-info.css'
import { useNavigate } from 'react-router-dom';


export default function InfoTaller(){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    };
    const handleInscribirse = () => {
        alert('Inscripción completada');
      };
    return(
        <div className='container-taller-info'>
            <header className="header-craft">
                <div className="back-button-craft">
                    <i className="bx bx-arrow-back" onClick={handleClick}></i>
                    <img src="../../public/img/flecha-craft.svg" alt="" className='flecha'/>
                </div>
                <div className="image-container">
                    <img 
                    src="https://via.placeholder.com/400x300" 
                    alt="Tapiz Chumpi Andino III" 
                    className="product-image" 
                    />
                </div>
            </header>
            <div className="taller-info-card">
                <h2>Taller de cerámica artesanal</h2>
                <p>
                En este taller dado por los artesanos de <b>Cerámicas Tater Vera</b> aprenderán a usar la arcilla para crear cosas para el hogar con diseños típicos ayacuchanos.
                </p>
                <h3><b>Para el público en general</b></h3>
                <p className='gris-letra'>*los niños menores de 8 años se recomienda que estén acompañados de un adulto</p>

                <h4><b>Duración:</b> 2 meses</h4>
                <h4><b>Fecha de inicio:</b> 8 de Julio</h4>
                <h4><b>Horario:</b> 4 a 6 PM cada sábado</h4>
                <h4><b>Materiales:</b> Materiales dados en clase</h4>
                <h4><b>Modalidad:</b> Presencial</h4>
                <h4><b>Lugar:</b> En el Ministerio de Cultura, Lima, Perú</h4>
                {/* Botón para inscribirse */}
                <div className='inscribir-taller'>

                <button className="inscribirse-button" onClick={handleInscribirse}>
                <img src="../../public/img/inscribir.svg" alt="" /> Inscribirse al taller
                </button>
                <p className="cupos-lim">*Cupos limitados</p>
                </div>
            </div>
        </div>
    )
}