import '../styles/talleres.css';
import Flecha from '../components/flecha-back';
import Rombo from '../components/header-rombo';
import FondoFlecha from '../components/fondo-flecha';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Talleres() {
  const [talleres, setTalleres] = useState([]);
  const [headerImage, setHeaderImage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchTalleres = async () => {
    try {
      const response = await axios.get('https://localhost:3000/api/talleres/');
      setTalleres(response.data);
      setHeaderImage(response.data[0]?.imagen || '');
      console.log('Datos de talleres:', response.data);
    } catch (error) {
      console.error('Error al obtener los talleres:', error);
    }
  };

  useEffect(() => {
    fetchTalleres();
  }, []);

  // Function to handle navigation to info-taller
  const handleTallerClick = (taller) => {
    navigate('/info-taller', { state: { taller } });
  };

  return (
    <div className='talleres-container'>
      <FondoFlecha />
      <Flecha />
      <Rombo />
      <section>
        <div className="search-container-taller">
          <img src="../../public/img/search-category.svg" alt="Buscar" className="search-icon-taller" />
          <input type="text" placeholder="Buscar taller, por categoría o artesanos" className="search-bar-taller" />
        </div>
      </section>
      <div className="talleres-lista">
        {talleres.length > 0 ? (
          talleres.map((taller) => (
            <div 
              key={taller.id} 
              className="taller-item" 
              onClick={() => handleTallerClick(taller)}
            >
              <img src={taller.imagen} alt={taller.nombre} className="taller-imagen" />
              <div className="taller-info">
                <h3>{taller.nombre}</h3>
                <a href="#" className="taller-publico">{taller.publicoObjetivo}</a>
                <p>{taller.descripcion}</p>
                <button className="taller-boton">Entérate más sobre el taller aquí</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay talleres disponibles.</p>
        )}
      </div>
    </div>
  );
}