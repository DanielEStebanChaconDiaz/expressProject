import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation
import Menu from '../components/menuHamburger';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation(); // Obtiene la ubicación actual

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

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
      {/* Condición para mostrar el botón de ubicación */}
      {location.pathname !== '/profile' && (
        <button className="location-btn">
          <img src="../../public/img/ubication.svg" alt="Ubicación" /> Ubicación de entrega actual
        </button>
      )}
      {isMenuOpen && (
        <div className="menu-overlay" ref={menuRef}>
          <Menu />
        </div>
      )}
    </header>
  );
}
