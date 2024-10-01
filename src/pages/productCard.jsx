import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/productCard.css';
import heartIcon from '../../public/img/heart.svg';
import cartIcon from '../../public/img/carrito.svg';
import axios from 'axios';
import '../styles/productCard.css';
import heartCompleteIcon from '../../public/img/heart-complete.svg';  // Ícono de corazón lleno

export default function ProductCard() {
    const [userId, setUserId] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const [mensaje, setMensaje] = useState('');

    const handleClick = () => {
        navigate(-1);
    };

    const obtenerUsuarioLogueado = async () => {
        try {
            const response = await axios.get('https://localhost:3000/api/usuarios/me', {
                withCredentials: true
            });
            console.log(response.data);
            setUserId(response.data._id);
        } catch (error) {
            console.error('Error al obtener el usuario logueado:', error);
        }
    };

    useEffect(() => {
        obtenerUsuarioLogueado();
    }, []);

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
            setIsFavorite(!isFavorite);
            console.log('Producto agregado a favoritos');
        } catch (error) {
            console.error('Error al agregar producto a favoritos:', error);
        }
    };

    const agregarAlCarrito = async () => {
        try {
            console.log('Intentando agregar al carrito:', producto);
            const productoId = producto._id || producto.id;
            if (!productoId) {
                throw new Error('ID de producto no encontrado');
            }
            const response = await axios.post('https://localhost:3000/api/usuarios/carrito/agregar', {
                productoId: productoId,
                cantidad: 1
            }, {
                withCredentials: true
            });
            console.log('Respuesta al agregar al carrito:', response.data);
            setMensaje('Producto añadido al carrito');
        } catch (error) {
            console.error('Error al agregar al carrito:', error.response ? error.response.data : error);
            if (error.response) {
                if (error.response.status === 401) {
                    setMensaje('Debes iniciar sesión para agregar productos al carrito');
                    // Aquí podrías redirigir al usuario a la página de login
                    // navigate('/login');
                } else {
                    setMensaje(error.response.data.mensaje || 'Error al agregar al carrito');
                }
            } else {
                setMensaje('Error de conexión. Por favor, intenta de nuevo.');
            }
        }
        setTimeout(() => setMensaje(''), 3000);
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
                            src={isFavorite ? heartCompleteIcon : heartIcon} 
                            alt="Favorito" 
                            className="favorite-icon" 
                            onClick={handleFavoriteClick}
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

                    {mensaje && <div className="mensaje">{mensaje}</div>}

                    <button className="add-to-cart" onClick={agregarAlCarrito}>
                        <img src={cartIcon} alt="Carrito" className="cart-icon" /> Añadir a mi carrito de compras
                    </button>
                </div>
            </section>
        </div>
    );
}