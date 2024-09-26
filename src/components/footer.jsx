import { useLocation } from 'react-router-dom'; // Importa useLocation

export default function Footer() {
    const location = useLocation(); // Obtiene la ubicación actual

    return (
        <footer className="footer-nav">
            <a href="/#/store" className={`nav-item ${location.pathname === '/store' ? 'nav-item1' : ''}`}>
                <img src="../../public/img/icon-store.svg" alt="Store" />
            </a>
            <a href="/#/offer" className={`nav-item ${location.pathname === '/offer' ? 'nav-item1' : ''}`}>
                <img src="../../public/img/icon-offer.svg" alt="Offers" />
            </a>
            <a href="/#/home" className={`nav-item ${location.pathname === '/home' ? 'nav-item1' : ''}`}>
                <img src="../../public/img/icon-home.svg" alt="Home" />
            </a>
            <a href="/#/car" className={`nav-item ${location.pathname === '/car' ? 'nav-item1' : ''}`}>
                <img src="../../public/img/icon-car.svg" alt="Car" />
            </a>
            <a href="#/profile" className={`nav-item ${location.pathname === '/profile' ? 'nav-item1' : ''}`}>
                <img src="../../public/img/icon-profile.svg" alt="Profile" />
            </a>
        </footer>
    );
}
