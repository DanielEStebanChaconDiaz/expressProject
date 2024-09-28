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

  const handleLocationClick = () => {
    // Aquí puedes agregar la lógica para manejar el clic en el botón de ubicación
    // Por ejemplo, navegar a una página de selección de ubicación
    // navigate('/select-location');
  };

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
      {location.pathname !== '/profile' && location.pathname !== '/store' && location.pathname !== '/offer' && location.pathname !== '/car' &&(
        <button className="location-btn" onClick={handleLocationClick}>
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