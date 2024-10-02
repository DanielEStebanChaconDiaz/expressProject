import React, { useState, useEffect } from 'react';
import '../styles/productCard.css';
import heartIconEmpty from '../../public/img/heart.svg';  // Ícono de corazón vacío
import heartIconFull from '../../public/img/heart-complete.svg';  // Ícono de corazón completo
import cartIcon from '../../public/img/carrito.svg';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ProductCard2() {
    const navigate = useNavigate();
    const location = useLocation();
    const producto = location.state?.producto;

    const [userId, setUserId] = useState(null); // Estado para almacenar el userId del usuario logueado
    const [isFavorite, setIsFavorite] = useState(false); // Estado para manejar el ícono del corazón
    const [mensaje, setMensaje] = useState(''); // Estado para mostrar mensajes temporales

    // Obtener el usuario logueado al cargar el componente
    const obtenerUsuarioLogueado = async () => {
        try {
            const response = await axios.get('https://localhost:3000/api/usuarios/me', {
                withCredentials: true
            });
            setUserId(response.data._id);
        } catch (error) {
            console.error('Error al obtener el usuario logueado:', error);
        }
    };

    useEffect(() => {
        obtenerUsuarioLogueado();
    }, []);

    // Maneja el clic en el ícono del corazón para agregar/eliminar de favoritos
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
            setIsFavorite(!isFavorite); // Cambiar el estado al contrario
        } catch (error) {
            console.error('Error al agregar/eliminar producto de favoritos:', error);
        }
    };

    // Maneja la acción de agregar al carrito
    const agregarAlCarrito = async () => {
        try {
            const productoId = producto._id || producto.id;
            if (!productoId) {
                throw new Error('ID de producto no encontrado');
            }
            await axios.post('https://localhost:3000/api/usuarios/carrito/agregar', {
                productoId: productoId,
                cantidad: 1
            }, {
                withCredentials: true
            });
            setMensaje('Producto añadido al carrito');
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            setMensaje('Error al agregar al carrito');
        }
        setTimeout(() => setMensaje(''), 3000); // Oculta el mensaje después de 3 segundos
    };

    const handleClick = () => {
        navigate(-1);
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
                <div className="image-container2">
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="product-image"
                    />
                    {producto.descuento && (
                        <div className='descuento-card'>
                            <img className='descuento-producto2' src="../../public/img/star-card.svg" alt="" />
                            <h3>-{producto.descuento}%</h3>
                        </div>
                    )}
                </div>
            </header>
            <section>
                <div className="product-info-card">
                    <div className="product-header-card">
                        <h3 className="product-title-card">{producto.nombre}</h3>
                    </div>

                    <div className='card-price-icon'>
                        <div className='card-up-title'>
                            <p className="product-price-card">
                                {producto.precioOriginal && <s>S/. {producto.precioOriginal}</s>} S/. {producto.precio}
                            </p>
                            <p className="product-taller-card">{producto.tienda}</p>
                        </div>

                        {/* Ícono de favorito con funcionalidad de clic */}
                        <img
                            src={isFavorite ? heartIconFull : heartIconEmpty}
                            alt="Favorito"
                            className="favorite-icon"
                            onClick={handleFavoriteClick}
                        />
                    </div>

                    <div className="product-details-card">
                        <p><strong>Dimensiones:</strong> {producto.dimensiones || 'No especificadas'}</p>
                        <p><strong>Descripción:</strong> {producto.descripcion || 'No hay descripción disponible.'}</p>
                    </div>

                    <div className='ok-card'>
                        <img src="../../public/img/productCard-ok.svg" alt="" />
                        <p className="shipping-info-card">Cuenta con envío hacia tu ubicación</p>
                    </div>

                    {mensaje && <div className="mensaje">{mensaje}</div>} {/* Muestra el mensaje temporal */}

                    <button className="add-to-cart" onClick={agregarAlCarrito}>
                        <img src={cartIcon} alt="Carrito" className="cart-icon" /> Añadir a mi carrito de compras
                    </button>
                </div>
            </section>
        </div>
    );
}
