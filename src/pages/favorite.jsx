import '../styles/favorite.css';
import React, { useState, useEffect } from 'react';
import Flecha from '../components/flecha-back';
import axios from 'axios';

export default function Favorite() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allFavorites, setAllFavorites] = useState([]);
    const [displayedFavorites, setDisplayedFavorites] = useState([]);
    const [userId, setUserId] = useState(null);

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

    const obtenerProductosFavoritos = async (productosFavoritos) => {
        try {
            const productos = await Promise.all(
                productosFavoritos.map(async (id) => {
                    const response = await axios.get(`https://localhost:3000/api/productos/${id}`);
                    return response.data;
                })
            );
            setAllFavorites(productos);
            setDisplayedFavorites(productos);
        } catch (error) {
            console.error('Error al obtener productos favoritos:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const usuario = await obtenerUsuarioLogueado();
            if (usuario && usuario.productosFavoritos) {
                console.log('Productos favoritos:', usuario.productosFavoritos);
                obtenerProductosFavoritos(usuario.productosFavoritos);
            }
        };
        fetchData();
    }, []);

    const handleRemoveFavorite = async (idProducto) => {
        try {
            await axios.post(`https://localhost:3000/api/usuarios/${userId}/productos-favoritos`, {
                idProducto
            }, {
                withCredentials: true
            });

            const updatedFavorites = allFavorites.filter(favorite => favorite._id !== idProducto);
            setAllFavorites(updatedFavorites);
            setDisplayedFavorites(updatedFavorites);
        } catch (error) {
            console.error('Error al eliminar el producto de favoritos:', error);
        }
    };

    const filterByCategory = (categoria) => {
        if (categoria === null) {
            setDisplayedFavorites(allFavorites);
            setSelectedCategory(null);
        } else {
            const categoriaNormalizada = categoria
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .trim()
                .toLowerCase();

            const filteredFavorites = allFavorites.filter(producto => 
                producto.categoria.toLowerCase() === categoriaNormalizada
            );
            setDisplayedFavorites(filteredFavorites);
            setSelectedCategory(categoria);
        }
    };

    const handleCategoryClick = (categoryName) => {
        if (categoryName === selectedCategory) {
            filterByCategory(null);
        } else {
            filterByCategory(categoryName);
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
                            className={`category-item-cate ${selectedCategory === category.name ? 'selected' : ''}`}
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            <img src={category.icon} alt={category.name} className="category-icon-cate" />
                            <span>{category.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <div className="products-grid-favorite">
                {displayedFavorites.map((favorite) => (
                    <div key={favorite._id} className="product-card-favorite">
                        <button
                            className="close-button"
                            onClick={() => handleRemoveFavorite(favorite._id)}
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