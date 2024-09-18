import '../styles/login.css'

export default function Login() {
    return (
        <div className="container">
            <div className="container-top">
            <h2>Regístrate ahora y obtén las mejores promociones en <strong>artesanías peruanas</strong></h2>
                <button className="social-btn fb-btn">
                    <i className="fab fa-facebook-f"></i> Regístrate con Facebook
                </button>
                <button className="social-btn insta-btn">
                    <i className="fab fa-instagram"></i> Regístrate con Instagram
                </button>
                <button className="social-btn gmail-btn">
                    <i className="fab fa-google"></i> Regístrate con Gmail
                </button>
                <button className="social-btn mail-btn">
                    <i className="fas fa-envelope"></i> Regístrate con tu correo
                </button>
                <button className="social-btn phone-btn">
                    <i className="fas fa-phone"></i> Regístrate con tu celular
                </button>
        </div>
            <div className="container-bottom">
                <p>¿Ya tienes una cuenta?</p>
                <a href="#">Inicia sesión</a>
            </div>
        </div>
    )
}