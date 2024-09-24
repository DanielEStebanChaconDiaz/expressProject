import '../styles/menu.css';
export default function Menu() {
    return (
        <nav className='menu-container'>
            <ul>
                <li>
                    <div className="profile">
                        <img src="../../public/img/profile.svg" alt="" />
                        <h1>SaraMartin9</h1>
                    </div>
                </li>
                <li>
                    <div className="favoritos">
                        <img src="../../public/img/heard.svg" alt="" />
                        <a href="#home">Lista de favoritos</a>
                    </div>
                </li>
                <li>
                    <div className="favoritos">
                        <img src="../../public/img/shopy.svg" alt="" />
                        <a href="#home">Compras</a>
                    </div>
                </li>
                <li>
                    <div className="favoritos">
                        <img src="../../public/img/docs.svg" alt="" />
                        <a href="#home">Talleres</a>
                    </div>
                </li>
                <li>
                    <div className="favoritos">
                        <img src="../../public/img/cupon.svg" alt="" />
                        <a href="#home">Canjear cupon</a>
                    </div>
                </li>
                <div className="rombos">
                    <img src="../../public/img/rombos.svg" alt="" />
                </div>
                <li>
                    <div className="favoritos">
                        <img src="../../public/img/settings.svg" alt="" />
                        <a href="#home">Ajustes</a>
                    </div>
                </li>
                <li>
                    <div className="favoritos">
                        <img src="../../public/img/chat.svg" alt="" />
                        <a href="#home">Comentarios</a>
                    </div>
                </li>
                <li>
                    <div className="favoritos">
                        <img src="../../public/img/headphones.svg" alt="" />
                        <a href="#home">Atencion al cliente</a>
                    </div>
                </li>
                <div className="footer">
                    <p className='text1'>Aplicacion potenciada por:</p>
                    <img src='../../public/img/campuslands.png' alt='Logo' />
                </div>
            </ul>
        </nav>
    )
}