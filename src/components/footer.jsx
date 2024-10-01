import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="footer-nav">
      <a onClick={() => handleNavigation('/store')} className={`nav-item ${location.pathname === '/store' ? 'nav-item1' : ''}`}>
        <img src="../../public/img/icon-store.svg" alt="Store" />
      </a>
      <a onClick={() => handleNavigation('/offer')} className={`nav-item ${location.pathname === '/offer' ? 'nav-item1' : ''}`}>
        <img src="../../public/img/icon-offer.svg" alt="Offers" />
      </a>
      <a onClick={() => handleNavigation('/home')} className={`nav-item ${location.pathname === '/home' ? 'nav-item1' : ''}`}>
        <img src="../../public/img/icon-home.svg" alt="Home" />
      </a>
      <a onClick={() => handleNavigation('/car')} className={`nav-item ${location.pathname === '/car' ? 'nav-item1' : ''}`}>
        <img src="../../public/img/icon-car.svg" alt="Car" />
      </a>
      <a onClick={() => handleNavigation('/profile')} className={`nav-item ${location.pathname === '/profile' ? 'nav-item1' : ''}`}>
        <img src="../../public/img/icon-profile.svg" alt="Profile" />
      </a>
    </footer>
  );
}