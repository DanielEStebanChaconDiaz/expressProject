import '../styles/car.css'

export default function Car(){
    return(
        <div className='car-container'>
            <header className="header">
                <div className="menu">
                    <img src="../../public/img/menu.svg" alt="" />
                    <div className="search-container">
                        <img src="../../public/img/search.svg" alt="Buscar" className="search-icon" /> {/* Imagen de búsqueda */}
                        <input type="text" placeholder="Buscar producto o tienda..." className="search-bar" />
                    </div>
                </div>
            </header>
            <section className='carrito-compras'>
                <h2>Tu carrito de compras</h2>
                <p>Revisa aquí los productos que añadiste a tu carrito</p>
            </section>
                <footer className="footer-nav">
                    <a href="#" className="nav-item">
                        <img src="../../public/img/icon-store.svg" alt="Store" />
                    </a>
                    <a href="#" className="nav-item">
                        <img src="../../public/img/icon-offer.svg" alt="Offers" />
                    </a>
                    <a href="#" className="nav-item">
                        <img src="../../public/img/icon-home.svg" alt="Home" />
                    </a>
                    <a href="#" className="nav-item1">
                        <img src="../../public/img/icon-car.svg" alt="Car" />
                    </a>
                    <a href="#" className="nav-item">
                        <img src="../../public/img/icon-profile.svg" alt="Profile" />
                    </a>
                </footer>
        </div>
    )
}