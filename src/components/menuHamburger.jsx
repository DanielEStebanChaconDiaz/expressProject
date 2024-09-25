import '../styles/menu.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Menu() {
    const [data, setData] = useState(null); // Para almacenar los datos
    const [loading, setLoading] = useState(true); // Para manejar el estado de carga
    const [error, setError] = useState(''); // Para manejar errores

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get('https://localhost:3000/api/usuarios/66f428720cbe27861a68a8c6');
                setData(response.data); // Guardamos los datos en el estado
            } catch (error) {
                console.error('Error:', error);
                setError('Error fetching data'); // Guardamos el mensaje de error
            } finally {
                setLoading(false); // Cambiamos el estado de carga
            }
        };
        fetchPost();
    }, []); // La dependencia vacía asegura que solo se ejecute al montar el componente

    if (loading) {
        return <div>Loading...</div>; // Muestra un mensaje de carga
    }

    if (error) {
        return <div>{error}</div>; // Muestra un mensaje de error
    }

    return (
        <nav className='menu-container'>
            <ul>
                <li>
                    <div className="profile">
                        <img src={data.fotoPerfil} alt="" />
                        <h1>{data ? data.nombreUsuario : 'Nombre no disponible'}</h1> {/* Asegúrate de que el nombre sea una propiedad válida en tu respuesta */}
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
    );
}
