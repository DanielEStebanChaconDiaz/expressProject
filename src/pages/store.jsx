import '../styles/store.css'

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
      <header className="header">
        <div className="menu">
            <img src="../../public/img/menu.svg" alt="" />
            <div className="search-container">
                <img src="../../public/img/search.svg" alt="Buscar" className="search-icon" /> {/* Imagen de búsqueda */}
                <input type="text" placeholder="Buscar producto o tienda..." className="search-bar" />
            </div>
        </div>
      </header>
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
      <footer className="footer-nav">
        <a href="#" className="nav-item1">
          <img src="../../public/img/icon-store.svg" alt="Store" />
        </a>
        <a href="#" className="nav-item">
          <img src="../../public/img/icon-offer.svg" alt="Offers" />
        </a>
        <a href="#" className="nav-item">
          <img src="../../public/img/icon-home.svg" alt="Home" />
        </a>
        <a href="#" className="nav-item">
          <img src="../../public/img/icon-car.svg" alt="Car" />
        </a>
        <a href="#" className="nav-item">
          <img src="../../public/img/icon-profile.svg" alt="Profile" />
        </a>
      </footer>
    </div>


  );
}

