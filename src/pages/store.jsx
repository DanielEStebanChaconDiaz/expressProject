import '../styles/store.css'
import Header from '../components/header';
import Footer from '../components/footer';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Store() {
  const [response, setResponse] = useState(null); // Almacenamos la respuesta del API
  const talleres = [
    { nombre: 'Arte Abedail Aller Escalante', lugar: 'Cusco', imagen: '../../public/img/taller-ejemplo.svg'},
    { nombre: 'Aso. de artesanos Tinkuy', lugar: 'Huánuco', imagen: '../../public/img/taller-ejemplo.svg' },
    { nombre: 'Retablos Jesús Urbano', lugar: 'Ayacucho', imagen: '../../public/img/taller-ejemplo.svg' },
    { nombre: 'Taller Awaq Ayllus', lugar: 'Ayacucho', imagen: '../../public/img/taller-ejemplo.svg' },
    { nombre: 'Taller Sanabria Nuñez', lugar: 'Junín', imagen: '../../public/img/taller-ejemplo.svg' },
    { nombre: 'Lastenia Canayo', lugar: 'Ucayali', imagen: '../../public/img/taller-ejemplo.svg' },
  ];

  useEffect(() => {
    const fetchTalleres = async () => {
      try {
        const res = await axios.get('https://localhost:3000/api/talleres/');
        setResponse(res); // Almacenamos la respuesta
        console.log('Datos de talleres:', res.data);
      } catch (error) {
        console.error('Error al obtener los talleres:', error);
      }
    };

    fetchTalleres();
  }, []);

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
          {/* Aseguramos que response y response.data existan antes de acceder a ellos */}
          {response && response.data && <img src={response.data.imagen} alt="" />}
        </div>
        </div>
        <div className="talleres-grid">
          {talleres.map((taller, index) => (
            <div key={index} className="taller-card">
              <div className="taller-info">
                <h3>{response.data[2].nombre}</h3>
                <p>{response.data[0].lugar}</p>
              </div>
              <img src={response.data[0].imagen} alt={taller.nombre} />
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
}
