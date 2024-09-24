export default function Header(){
    return(
        <header className="header">
        <div className="menu">
          <img src="../../public/img/menu.svg" alt="Menu"  /> {/* Al hacer clic, abrir el menú */}
          <div className="search-container">
            <img src="../../public/img/search.svg" alt="Buscar" className="search-icon" />
            <input type="text" placeholder="Buscar producto o tienda..." className="search-bar" />
          </div>
        </div>
        <button className="location-btn">
          <img src="../../public/img/ubication.svg" alt="Ubicación" /> Ubicación de entrega actual
        </button>
      </header>
    )
}