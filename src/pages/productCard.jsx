import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/productCard.css';
import heartIcon from '../../public/img/heart.svg';
import cartIcon from '../../public/img/carrito.svg';
import axios from 'axios'
import '../styles/productCard.css';
import heartIcon from '../../public/img/heart.svg';  // Ícono de corazón vacío
import heartCompleteIcon from '../../public/img/heart-complete.svg';  // Ícono de corazón lleno
import cartIcon from '../../public/img/carrito.svg';  
import { useNavigate } from 'react-router-dom';

export default function ProductCard() {
    
    const [userId, setUserId] = useState(null); // Estado para almacenar el userId
    const location = useLocation();
    const { producto } = location.state || {};
    const navigate = useNavigate();
    
    // Estado para manejar el ícono del corazón
    const [isFavorite, setIsFavorite] = useState(false);

    const handleClick = () => {
        navigate(-1);
    };

    // Función para obtener el usuario logueado y guardar su userId
    const obtenerUsuarioLogueado = async () => {
        try {
            const response = await axios.get('https://localhost:3000/api/usuarios/me', {
                withCredentials: true
            });
            console.log(response.data)
            setUserId(response.data._id); // Almacenar el userId
        } catch (error) {
            console.error('Error al obtener el usuario logueado:', error);
        }
    };

    // Llama a la función al cargar el componente
    React.useEffect(() => {
        obtenerUsuarioLogueado();
    }, []);

    // Función para manejar el clic en el icono de favorito
    const handleFavoriteClick = async () => {
        if (!userId) {
            console.error('No se ha obtenido el userId');
            return;
        }

        try {
            await axios.post(`https://localhost:3000/api/usuarios/${userId}/productos-favoritos`, {
                productoId: producto.id
            }, {
                withCredentials: true
            });
            console.log('Producto agregado a favoritos');
        } catch (error) {
            console.error('Error al agregar producto a favoritos:', error);
        }
    };

    if (!producto) {
        return <div>No se encontró información del producto.</div>;
    }

    return (
        <div className='productCard-container'>
            <header className="header-craft">
                <div className="back-button-craft">
                    <i className="bx bx-arrow-back" onClick={handleClick}></i>
                    <img src="../../public/img/flecha-craft.svg" alt="" className='flecha' />
                </div>
                <div className="image-container">
                    <img 
                        src={producto.imagen || "https://via.placeholder.com/400x300"} 
                        alt={producto.nombre} 
                        className="product-image" 
                    />
                </div>
            </header>
            <section>
                <div className="product-info-card">
                    <div className="product-header-card">
                        <h3 className="product-title-card">{producto.nombre}</h3>
                    </div>

                    <div className='card-price-icon'>
                        <div className='card-up-title'>
                            <p className="product-price-card">S/. {producto.precio}</p>
                            <p className="product-taller-card">{producto.tienda}</p>
                        </div>
                        <img 
                            src={heartIcon} 
                            alt="Favorito" 
                            className="favorite-icon" 
                            onClick={handleFavoriteClick} // Añadido el evento onClick
                        />
                    </div>

                    <div className="product-details-card">
                        <p><strong>Dimensiones:</strong> {producto.dimensiones || 'No especificadas'}</p>
                        <p><strong>Descripción:</strong> {producto.descripcion}</p>
                    </div>

                    <div className='ok-card'>
                        <img src="../../public/img/productCard-ok.svg" alt="" />
                        <p className="shipping-info-card">Cuenta con envío hacia tu ubicación</p>
                    </div>

                    <button className="add-to-cart">
                        <img src={cartIcon} alt="Carrito" className="cart-icon" /> Añadir a mi carrito de compras
                    </button>
                </div>
            </section>
        </div>
    );
}
