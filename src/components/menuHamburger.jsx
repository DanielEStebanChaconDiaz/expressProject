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
                        <a href="#/favorite">Lista de favoritos</a>
                    </div>
                </li>
                <li>
                    <div className="favoritos">
                        <img src="../../public/img/shopy.svg" alt="" />
                        <a href="#/compras">Compras</a>
                    </div>
                </li>
                <li>
                    <div className="favoritos">
                        <img src="../../public/img/docs.svg" alt="" />
                        <a href="#/taller">Talleres</a>
                    </div>
                </li>
                <li>
                    <div className="favoritos">
                        <img src="../../public/img/cupon.svg" alt="" />
                        <a href="#/cupon">Canjear cupon</a>
                    </div>
                </li>
                <div className="rombos">
                    <img src="../../public/img/rombos.svg" alt="" />
                </div>
                <li>
                    <div className="favoritos">
                        <img src="../../public/img/settings.svg" alt="" />
                        <a href="#/settings">Ajustes</a>
                    </div>
                </li>
                <li>
                    <div className="favoritos">
                        <img src="../../public/img/chat.svg" alt="" />
                        <a href="#/chat">Comentarios</a>
                    </div>
                </li>
                <li>
                    <div className="favoritos">
                        <img src="../../public/img/headphones.svg" alt="" />
                        <a href="#/atencion">Atencion al cliente</a>
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