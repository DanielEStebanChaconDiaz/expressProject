import '../styles/compras.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Flecha from '../components/flecha-back';
import Rombo from '../components/header-rombo';
import FondoFlecha from '../components/fondo-flecha';

export default function Compras() {
    const [userId, setUserId] = useState(null);
    const [productosComprados, setProductosComprados] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const navigate = useNavigate();

    const obtenerUsuarioLogueado = async () => {
        try {
            const response = await axios.get('https://localhost:3000/api/usuarios/me', {
                withCredentials: true
            });
            console.log(response.data);
            setUserId(response.data._id);
            return response.data;
        } catch (error) {
            console.error('Error al obtener el usuario logueado:', error);
            return null;
        }
    };

    const obtenerProductosComprados = async (productosComprados) => {
        try {
            const productos = await Promise.all(
                productosComprados.map(async (producto) => {
                    const response = await axios.get(`https://localhost:3000/api/productos/${producto.item}`);
                    return {
                        ...response.data,
                        cantidad: producto.cantidad,
                        precioUnitario: producto.precioUnitario,
                    };
                })
            );
            setProductosComprados(productos);
        } catch (error) {
            console.error('Error al obtener productos comprados:', error);
        }
    };

    const obtenerProductosFavoritos = async (productosFavoritos) => {
        try {
            const productos = await Promise.all(
                productosFavoritos.map(async (id) => {
                    const response = await axios.get(`https://localhost:3000/api/productos/${id}`);
                    return response.data;
                })
            );
            setFavoritos(productos);
        } catch (error) {
            console.error('Error al obtener productos favoritos:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const usuario = await obtenerUsuarioLogueado();
            if (usuario) {
                if (usuario.productosComprados) {
                    console.log('Productos comprados:', usuario.productosComprados);
                    await obtenerProductosComprados(usuario.productosComprados);
                }
                if (usuario.productosFavoritos) {
                    console.log('Productos favoritos:', usuario.productosFavoritos);
                    await obtenerProductosFavoritos(usuario.productosFavoritos);
                }
            }
        };
        fetchData();
    }, []);

    const handleFavoriteClick = (producto) => {
        navigate('/productCard', { state: { producto } });
    };

    const subtotal = productosComprados.reduce((sum, producto) => sum + producto.precioUnitario * producto.cantidad, 0);
    const shipping = 20; // Envío fijo
    const total = subtotal + shipping;

    return (
        <div className='shopping-container'>
            <header className="header-category">
                <FondoFlecha/>
                <Flecha/>
                <Rombo/>
            </header>
            <section className="carrito-compras shopping">
                <div className="cart-items">
                    {productosComprados.map((producto) => (
                        <div key={producto._id} className="cart-item">
                            <img src={producto.imagen} alt={producto.nombre} className="item-image" />
                            <div className="item-details">
                                <h5>{producto.nombre}</h5>
                                <h5>S/{producto.precioUnitario} x {producto.cantidad}</h5>
                                <h5>{producto.dimensiones}</h5>
                                <h5>{producto.tienda}</h5>
                                <span>Ver seguimiento del producto</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <div className='sigue'>
                <h4>Sigue viendo más artesanías</h4>
            </div>
            <div className="products-grid-favorite">
                {favoritos.map((favorito) => (
                    <div 
                        key={favorito._id} 
                        className="product-card-favorite"
                        onClick={() => handleFavoriteClick(favorito)}
                    >
                        <img src={favorito.imagen} alt={favorito.nombre} />
                        <div className="product-info-favorite">
                            <h5>{favorito.nombre}</h5>
                            <h6>S/{favorito.precio}</h6>
                            <p>{favorito.tienda}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}