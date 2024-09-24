import '../styles/home.css';
import MenuHamburguesa from '../components/menuHamburger'; // Asegúrate de que la ruta de importación sea correcta
import { useState } from 'react'; // Importar useState

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú

  const categories = [
    { name: 'Textilería', icon: '../../public/img/category1.svg' },
    { name: 'Cerámica', icon: '../../public/img/category2.svg' },
    { name: 'Orfebrería', icon: '../../public/img/category3.svg' },
    { name: 'Talla en piedra', icon: '../../public/img/category4.svg' },
    { name: 'Talla en madera', icon: '../../public/img/category5.svg' },
    { name: 'Bordado', icon: '../../public/img/category6.svg' },
    { name: 'Joyería', icon: '../../public/img/category7.svg' },
    { name: 'Hojalatería', icon: '../../public/img/category8.svg' },
    { name: 'Estampado', icon: '../../public/img/category9.svg' },
    { name: 'Pintura tradicional', icon: '../../public/img/category10.svg' },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Alternar el estado del menú
  };

  return (
    <>
      <div className="App">
        <header className="header">
          <div className="menu">
            <img src="../../public/img/menu.svg" alt="Menu" onClick={handleMenuToggle} /> {/* Al hacer clic, abrir el menú */}
            <div className="search-container">
              <img src="../../public/img/search.svg" alt="Buscar" className="search-icon" />
              <input type="text" placeholder="Buscar producto o tienda..." className="search-bar" />
            </div>
          </div>
          <button className="location-btn">
            <img src="../../public/img/ubication.svg" alt="Ubicación" /> Ubicación de entrega actual
          </button>
        </header>

        <section className="categories">
          <h3>Categorias</h3>
          <div className='category-box'>
            {categories.map((category, index) => (
              <div key={index} className="category-item">
                <img src={category.icon} alt={category.name} className="category-icon" />
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="workshops">
          <h3>Talleres del mes</h3>
          <p>¡Aprende cómo hacerlos en estos talleres educativos!</p>
          <img src="../../public/img/ejemplo1.svg" alt="Taller del mes" />
        </section>

        <footer className="footer-nav">
          <a href="/#/store" className="nav-item">
            <img src="../../public/img/icon-store.svg" alt="Store" />
          </a>
          <a href="/#/offer" className="nav-item">
            <img src="../../public/img/icon-offer.svg" alt="Offers" />
          </a>
          <a href="/#/home" className="nav-item1">
            <img src="../../public/img/icon-home.svg" alt="Home" />
          </a>
          <a href="/#/car" className="nav-item">
            <img src="../../public/img/icon-car.svg" alt="Car" />
          </a>
          <a href="#" className="nav-item">
            <img src="../../public/img/icon-profile.svg" alt="Profile" />
          </a>
        </footer>
      </div>

      {/* Componente de menú hamburguesa */}
      <MenuHamburguesa isOpen={isMenuOpen} toggleMenu={handleMenuToggle} />
    </>
  );
}
