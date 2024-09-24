import '../styles/store.css'
import Header from '../components/header';
import Footer from '../components/footer';


export default function Store() {
  const talleres = [
    { nombre: 'Arte Abedail Aller Escalante', lugar: 'Cusco', imagen: '../../public/img/taller-ejemplo.svg'},
    { nombre: 'Aso. de artesanos Tinkuy', lugar: 'Huánuco', imagen: '../../public/img/taller-ejemplo.svg' },
    { nombre: 'Retablos Jesús Urbano', lugar: 'Ayacucho', imagen: '../../public/img/taller-ejemplo.svg' },
    { nombre: 'Taller Awaq Ayllus', lugar: 'Ayacucho', imagen: '../../public/img/taller-ejemplo.svg' },
    { nombre: 'Taller Sanabria Nuñez', lugar: 'Junín', imagen: '../../public/img/taller-ejemplo.svg' },
    { nombre: 'Lastenia Canayo', lugar: 'Ucayali', imagen: '../../public/img/taller-ejemplo.svg' },
  ];
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
          <img src="../../public/img/ajustes.svg" alt="" />
        </div>
        </div>
        <div className="talleres-grid">
          {talleres.map((taller, index) => (
            <div key={index} className="taller-card">
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

