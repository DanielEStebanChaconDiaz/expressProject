import '../styles/favorite.css';
import React, { useState, useEffect } from 'react';
import Flecha from '../components/flecha-back';
import axios from 'axios';

export default function Favorite() {
    const [selectedCategory, setSelectedCategory] = useState(null); // Estado para la categoría seleccionada
    const [favorites, setFavorites] = useState([]); // Estado para los productos favoritos
    const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario logueado

    // Función para obtener el usuario logueado
    const obtenerUsuarioLogueado = async () => {
        try {
            const response = await axios.get('https://localhost:3000/api/usuarios/me', {
                withCredentials: true
            });
            console.log(response.data);
            setUserId(response.data._id); // Guardar el ID del usuario
            return response.data; // Devolver los datos del usuario
        } catch (error) {
            console.error('Error al obtener el usuario logueado:', error);
            return null;
        }
    };

    // Función para obtener los productos favoritos usando los IDs
    const obtenerProductosFavoritos = async (productosFavoritos) => {
        try {
            const productos = await Promise.all(
                productosFavoritos.map(async (id) => {
                    const response = await axios.get(`https://localhost:3000/api/productos/${id}`);
                    return response.data;
                })
            );
            setFavorites(productos); // Guardar los productos en el estado
        } catch (error) {
            console.error('Error al obtener productos favoritos:', error);
        }
    };

    useEffect(() => {
        // Obtener el ID del usuario y luego los productos favoritos
        const fetchData = async () => {
            const usuario = await obtenerUsuarioLogueado();
            if (usuario && usuario.productosFavoritos) {
                console.log('Productos favoritos:', usuario.productosFavoritos);
                obtenerProductosFavoritos(usuario.productosFavoritos); // Llamar a la función para obtener los productos
            }
        };
        fetchData();
    }, []);

    // Función para eliminar un producto de favoritos tanto en el frontend como en el backend
    const handleRemoveFavorite = async (idProducto) => {
        try {
            // Hacer el fetch al backend para eliminar el producto de favoritos usando POST
            await axios.post(`https://localhost:3000/api/usuarios/${userId}/productos-favoritos`, {
                idProducto // Enviar el ID del producto en el cuerpo de la solicitud
            }, {
                withCredentials: true
            });

            // Actualizar el estado eliminando el ObjectId del producto de favoritos
            setFavorites(favorites.filter(favorite => favorite._id !== idProducto));
        } catch (error) {
            console.error('Error al eliminar el producto de favoritos:', error);
        }
    };

    const categories = [
        { name: 'Textilería', icon: '../../public/img/category1.svg' },
        { name: 'Bordado', icon: '../../public/img/category6.svg' },
        { name: 'Cerámica', icon: '../../public/img/category2.svg' },
        { name: 'Joyería', icon: '../../public/img/category7.svg' },
        { name: 'Orfebrería', icon: '../../public/img/category3.svg' },
        { name: 'Hojalatería', icon: '../../public/img/category8.svg' },
        { name: 'Estampado', icon: '../../public/img/category9.svg' },
        { name: 'Talla en madera', icon: '../../public/img/category5.svg' },
        { name: 'Talla en piedra', icon: '../../public/img/category4.svg' },
        { name: 'Pintura tradicional', icon: '../../public/img/category10.svg' },
    ];

    return (
        <div className='favorite-container'>
            <header className="header-category">
                <Flecha />
            </header>

            <section className="categories-cate">
                <div className='category-box-cate'>
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={`category-item-cate ${selectedCategory === category.name ? 'selected' : ''}`} // Clase para categoría seleccionada
                            onClick={() => setSelectedCategory(category.name)} // Cambiar estado al hacer clic
                        >
                            <img src={category.icon} alt={category.name} className="category-icon-cate" />
                            <span>{category.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <div className="products-grid-favorite">
                {favorites.map((favorite) => (
                    <div key={favorite._id} className="product-card-favorite">
                        {/* Botón de cerrar (X) que elimina el producto */}
                        <button
                            className="close-button"
                            onClick={() => handleRemoveFavorite(favorite._id)} // Cambiar a favorite._id
                        >×</button>

                        <img src={favorite.imagen} alt={favorite.nombre} />
                        <div className="product-info-favorite">
                            <h5>{favorite.nombre}</h5>
                            <h6>{favorite.precio}</h6>
                            <p>{favorite.tienda}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
