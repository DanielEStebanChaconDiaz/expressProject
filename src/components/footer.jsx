import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="footer-nav">
      <button onClick={() => handleNavigation('/store')} className={`nav-item ${location.pathname === '/store' ? 'nav-item1' : ''}`}>
        <img src="../../public/img/icon-store.svg" alt="Store" />
      </button>
      <button onClick={() => handleNavigation('/offer')} className={`nav-item ${location.pathname === '/offer' ? 'nav-item1' : ''}`}>
        <img src="../../public/img/icon-offer.svg" alt="Offers" />
      </button>
      <button onClick={() => handleNavigation('/home')} className={`nav-item ${location.pathname === '/home' ? 'nav-item1' : ''}`}>
        <img src="../../public/img/icon-home.svg" alt="Home" />
      </button>
      <button onClick={() => handleNavigation('/car')} className={`nav-item ${location.pathname === '/car' ? 'nav-item1' : ''}`}>
        <img src="../../public/img/icon-car.svg" alt="Car" />
      </button>
      <button onClick={() => handleNavigation('/profile')} className={`nav-item ${location.pathname === '/profile' ? 'nav-item1' : ''}`}>
        <img src="../../public/img/icon-profile.svg" alt="Profile" />
      </button>
    </footer>
  );
}