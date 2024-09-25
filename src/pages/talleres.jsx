import '../styles/talleres.css'
import Flecha from '../components/flecha-back'

export default function Talleres(){
    const talleres = [
        {
        id: 1,
        imagen: '../../public/img/ejemplo-talleres.svg',
        titulo: 'Taller de bordado ayacuchano',
        publico: 'Para el público en general',
        descripcion: 'Taller dado por los artesanos de Taller Awaq Ayllus',
        },
        {
        id: 2,
        imagen: '../../public/img/ejemplo-talleres.svg',
        titulo: 'Taller de cerámica artesanal',
        publico: 'Para el público en general',
        descripcion: 'Taller dado por los artesanos de Cerámicas Tater Vera',
        },
        {
        id: 3,
        imagen: '../../public/img/ejemplo-talleres.svg',
        titulo: 'Taller de alfarería infantil',
        publico: 'Para niños de 4 a 12 años',
        descripcion: 'Taller dado por la artesana María Santos Minchán',
        },
        {
        id: 4,
        imagen: '../../public/img/ejemplo-talleres.svg',
        titulo: 'Taller de pintura tradicional',
        publico: 'Para adultos mayores',
        descripcion: 'Taller dado por los artesanos Roldán y Harry Pinedo',
        },
    ];
    return(
        <div className='talleres-container'>
            <Flecha/>
            <section>
                <div className="search-container-taller">
                    <img src="../../public/img/search-category.svg" alt="Buscar" className="search-icon-taller" />
                    <input type="text" placeholder="Buscar taller, por categoría o artesanos" className="search-bar-taller" />
                </div>
            </section>
            <div className="talleres-lista">
                {talleres.map((taller) => (
                <div key={taller.id} className="taller-item">
                    <img src={taller.imagen} alt={taller.titulo} className="taller-imagen" />
                    <div className="taller-info">
                    <h3>{taller.titulo}</h3>
                    <a href="#" className="taller-publico">{taller.publico}</a>
                    <p>{taller.descripcion}</p>
                    <button className="taller-boton">Entérate más sobre el taller aquí</button>
                    </div>
                </div>
                ))}
            </div>    
        </div>
    )
}