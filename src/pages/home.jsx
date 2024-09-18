import '../styles/home.css'

function App() {
  const categories = [
    { name: 'Textilería', icon: 'bx bx-shirt' },
    { name: 'Cerámica', icon: 'bx bx-bowl' },
    { name: 'Orfebrería', icon: 'bx bx-gem' },
    { name: 'Talla en piedra', icon: 'bx bx-scissors' },
    { name: 'Talla en madera', icon: 'bx bx-tree' },
    { name: 'Bordado', icon: 'bx bx-paint' },
    { name: 'Joyería', icon: 'bx bx-ring' },
    { name: 'Hojalatería', icon: 'bx bx-wrench' },
    { name: 'Estampado', icon: 'bx bx-brush' },
    { name: 'Pintura tradicional', icon: 'bx bx-palette' },
  ];

  return (
    <div className="App">
      <header className="header">
        <div className="menu">
            <img src="../../public/img/menu.svg" alt="" />
            <div className="search-container">
                <img src="../../public/img/search.svg" alt="Buscar" className="search-icon" /> {/* Imagen de búsqueda */}
                <input type="text" placeholder="Buscar producto o tienda..." className="search-bar" />
            </div>
        </div>
        <button className="location-btn">
          <img src="../../public/img/ubication.svg" alt="" /> Ubicación de entrega actual
        </button>
      </header>

      <section className="categories">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <i className={category.icon}></i>
            <span>{category.name}</span>
          </div>
        ))}
      </section>

      <section className="workshops">
        <h2>Talleres del mes</h2>
        <p>¡Aprende cómo hacerlos en estos talleres educativos!</p>
        <img src="https://via.placeholder.com/300" alt="Taller del mes" />
      </section>

      <footer className="footer-nav">
        <a href="#" className="nav-item">
          <i className="bx bx-cog"></i>
        </a>
        <a href="#" className="nav-item">
          <i className="bx bx-star"></i>
        </a>
        <a href="#" className="nav-item">
          <i className="bx bx-home"></i>
        </a>
        <a href="#" className="nav-item">
          <i className="bx bx-bell"></i>
        </a>
        <a href="#" className="nav-item">
          <i className="bx bx-user"></i>
        </a>
      </footer>
    </div>
  );
}

export default App;
