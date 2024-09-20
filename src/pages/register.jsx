import '../styles/register.css'

export default function Register() {
    return (
        <div className="container">
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
                    <a href="#/email"><i className='bx bx-envelope' ></i> Regístrate con tu correo</a>
                </button>
                <button className="social-btn phone-btn">
                    <a href="#/number"><i className='bx bxs-phone' ></i> Regístrate con tu celular</a>
                </button>
            </div>
            <div className="container-bottom">
                <p>¿Ya tienes una cuenta?</p>
                <a href="#/login">Inicia sesión</a>
            </div>
        </div>
    )
}