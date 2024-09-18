import '../styles/login.css';

export default function Login() {
    return (
        <div className="container-top">
            <h2>Regístrate ahora y obtén las mejores promociones en <strong>artesanías peruanas</strong></h2>
            <button className="social-btn fb-btn">
                <i className='bx bxl-facebook-circle' ></i> Regístrate con Facebook
            </button>
            <button className="social-btn insta-btn">
                <i className='bx bxl-instagram' ></i> Regístrate con Instagram
            </button>
            <button className="social-btn gmail-btn">
                <i className='bx bxl-gmail' ></i> Regístrate con Gmail
            </button>
            <button className="social-btn mail-btn">
                <i className='bx bxs-user-circle' ></i> Regístrate con tu cuenta de Ruraq Maki
            </button>
        </div>
    )
}