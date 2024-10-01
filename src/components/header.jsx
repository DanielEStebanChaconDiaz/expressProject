import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from '../components/menuHamburger';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ productos: [], talleres: [] });
  const [isSearching, setIsSearching] = useState(false);
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

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setSearchResults({ productos: [], talleres: [] });
      return;
    }
  
    setIsSearching(true);
    try {
      const response = await axios.get(`https://localhost:3000/api/talleryproductos/busqueda?nombre=${searchTerm}`);
      console.log(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      setSearchResults({ productos: [], talleres: [] });
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleProductClick = (product) => {
    navigate('/productCard', { state: { producto: product } });
  };

  const handleTallerClick = (taller) => {
    navigate('/info-taller', { state: { taller: taller } });
  };

  const renderProductResults = () => {
    return searchResults.productos.map((product) => (
      <div key={product.id} className="search-result-item" onClick={() => handleProductClick(product)}>
        <img src={product.imagen} alt={product.nombre} className="result-image" />
        <div className="result-info">
          <h3>{product.nombre}</h3>
          <p>{product.descripcion}</p>
          <p className="result-price">
            ${product.precio.toFixed(2)}
            {product.descuento > 0 && (
              <span className="discount"> ({product.descuento}% off)</span>
            )}
          </p>
          <p className="result-category">{product.categoria}</p>
        </div>
      </div>
    ));
  };

  const renderTallerResults = () => {
    return searchResults.talleres.map((taller) => (
      <div key={taller.id} className="search-result-item" onClick={() => handleTallerClick(taller)}>
        <img src={taller.imagen} alt={taller.nombre} className="result-image" />
        <div className="result-info">
          <h3>{taller.nombre}</h3>
          <p>{taller.descripcion}</p>
          <p className="result-category">{taller.categoria}</p>
        </div>
      </div>
    ));
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
          <img src="../../public/img/search.svg" alt="Buscar" className="search-icon" onClick={handleSearch} />
          <input 
            type="text" 
            placeholder="Buscar producto o tienda..." 
            className="search-bar" 
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
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
      <div className="search-results-container">
        {isSearching && <div className="search-loading">Buscando...</div>}
        {!isSearching && (searchResults.productos.length > 0 || searchResults.talleres.length > 0) && (
          <div className="search-results">
            {searchResults.productos.length > 0 && (
              <div className="product-results">
                <h2>Productos</h2>
                {renderProductResults()}
              </div>
            )}
            {searchResults.talleres.length > 0 && (
              <div className="taller-results">
                <h2>Talleres</h2>
                {renderTallerResults()}
              </div>
            )}
          </div>
        )}
        {!isSearching && searchResults.productos.length === 0 && searchResults.talleres.length === 0 && searchTerm && (
          <div className="no-results">No se encontraron resultados para "{searchTerm}"</div>
        )}
      </div>
    </header>
  );
}