import '../styles/menu.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Menu() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const obtenerUsuarioLogueado = async () => {
            try {
                const response = await axios.get('https://localhost:3000/api/usuarios/me', {
                    withCredentials: true
                });
                const usuarioData = response.data;
                setUsuario(usuarioData);
                console.log('Usuario logueado:', usuarioData);
            } catch (error) {
                console.error('Error al obtener el usuario logueado:', error);
            }
        };
        obtenerUsuarioLogueado();
    }, []);

    // Función para obtener la URL de la foto de perfil
    const obtenerFotoPerfil = () => {
        if (usuario && usuario.fotoPerfil) {
            // Si es una URL de Google, ajustamos el tamaño
            if (usuario.fotoPerfil.includes('googleusercontent.com')) {
                return usuario.fotoPerfil.replace('=s96-c', '=s200-c');
            }
            return usuario.fotoPerfil;
        }
        return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    };
    return (
        <nav className='menu-container'>
            <ul>
                <li>
                    <div className="profile">
                        <img
                            src={obtenerFotoPerfil()}
                            alt="Perfil"
                        />
                        <h1>{usuario ? usuario.nombreUsuario : 'Cargando...'}</h1>
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
