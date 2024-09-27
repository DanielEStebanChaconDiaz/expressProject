import '../styles/store.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Store() {
  const [talleres, setTalleres] = useState([]);
  const [headerImage, setHeaderImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTalleres = async () => {
      try {
        const response = await axios.get('https://localhost:3000/api/tiendas/');
        setTalleres(response.data);
        setHeaderImage(response.data[0]?.imagen || '');
        console.log('Datos de talleres:', response.data);
      } catch (error) {
        console.error('Error al obtener los talleres:', error);
      }
    };

    fetchTalleres();
  }, []);

  // Modificamos la función para recibir el taller correspondiente
  const handleTallerClick = (taller) => {
    navigate('/craft', { state: { taller } });
  };

  return (
    <div className='store-container'>
      <Header/>

      <section className="talleres-section">
        <div className='header-talleres'>
          <div className='texto-encabezado'>
            <h2>Talleres y tiendas artesanales</h2>
            <p>Tiendas de artesanías de todas partes del Perú</p>
          </div>
          <div className='img-ajustes'>
            {headerImage && <img src='../../public/img/ajustes.svg' alt="Header" />}
          </div>
        </div>
        <div className="talleres-grid">
          {talleres.map((taller, index) => (
            <div key={index} className="taller-card" onClick={() => handleTallerClick(taller)}>
              <div className="taller-info">
                <h3>{taller.nombre}</h3>
                <p>{taller.lugar}</p>
              </div>
              <img src={taller.imagen} alt={taller.nombre} />
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
}
