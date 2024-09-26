import '../styles/register.css'

export default function Register() {

    const FacebookAuth = () => {
        window.location.href = 'https://localhost:3000/auth/facebook';
    };

    const GoogleAuth = () => {
        window.location.href = 'https://localhost:3000/auth/google';
    };

    const DiscordAuth = () => {
        window.location.href = 'https://localhost:3000/auth/discord';
    };

    return (
        <div className="container">
            <div className="container-top">
                <h2>Regístrate ahora y obtén las mejores promociones en <strong>artesanías peruanas</strong></h2>
                <button className="social-btn fb-btn"onClick={FacebookAuth}>
                    <img src="../../public/img/facebook.svg" alt="" /> Regístrate con Facebook
                </button>
                <button className="social-btn insta-btn"onClick={DiscordAuth}>
                    <img src="../../public/img/instagram.svg" alt="" /> Regístrate con Instagram
                </button>
                <button className="social-btn gmail-btn"onClick={GoogleAuth}>
                    <img src="../../public/img/gmail.svg" alt="" /> Regístrate con Gmail
                </button>
                <button className="social-btn mail-btn">
                    <a href="#/email"><img src="../../public/img/correo.svg" alt="" /> Regístrate con tu correo</a>
                </button>
                <button className="social-btn phone-btn">
                    <a href="#/number"><img src="../../public/img/celular.svg" alt="" /> Regístrate con tu celular</a>
                </button>
            </div>
            <div className="container-bottom">
                <p>¿Ya tienes una cuenta?</p>
                <a href="#/login">Inicia sesión</a>
            </div>
        </div>
    )
}