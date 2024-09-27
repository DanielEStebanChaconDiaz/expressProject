import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/menuHamburger';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Lógica para manejar el cierre del menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Lógica para redirigir a "Home" por defecto si la ruta es '/'
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home'); // Redirigir a la ruta "Home"
    }
    // Actualiza el estado de la página activa cada vez que cambie la ubicación
    setActivePage(location.pathname);
  }, [location, navigate]);

  return (
    <header className="header">
      <div className="menu">
        <img
          src="../../public/img/menu.svg"
          alt="Menu"
          onClick={toggleMenu}
        />
        <div className="search-container">
          <img src="../../public/img/search.svg" alt="Buscar" className="search-icon" />
          <input type="text" placeholder="Buscar producto o tienda..." className="search-bar" />
        </div>
      </div>
      {location.pathname !== '/profile' && (
        <button className="location-btn" onClick={handleLocationClick}>
          <img src="../../public/img/ubication.svg" alt="Ubicación" /> Ubicación de entrega actual
        </button>
      )}
      {/* Muestra el menú si está abierto */}
      {isMenuOpen && (
        <div className="menu-overlay" ref={menuRef}>
          <Menu activePage={activePage} />
        </div>
      )}
    </header>
  );
}