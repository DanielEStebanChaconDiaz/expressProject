import '../styles/favorite.css';
import React, { useState, useEffect } from 'react';
import Flecha from '../components/flecha-back';
import axios from 'axios';

export default function Favorite() {
    const [selectedCategory, setSelectedCategory] = useState(null); // Estado para la categoría seleccionada
    const [favorites, setFavorites] = useState([]); // Estado para los productos favoritos

    // Función para obtener el usuario logueado
    const obtenerUsuarioLogueado = async () => {
        try {
            const response = await axios.get('https://localhost:3000/api/usuarios/me', {
                withCredentials: true
            });
            console.log(response.data)
            return response.data; // Devolver los datos del usuario
        } catch (error) {
            console.error('Error al obtener el usuario logueado:', error);
            return null;
        }
    };

    useEffect(() => {
        // Obtener el ID del usuario y luego los productos favoritos
        const fetchData = async () => {
            const usuario = await obtenerUsuarioLogueado();
            console.log('usuario:', usuario)
        };
        fetchData();
    }, []);

    const handleRemoveFavorite = (id) => {
        // Filtrar productos para quitar el que coincide con el id
        setFavorites(favorites.filter(favorite => favorite.id !== id));
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
                    <div key={favorite.id} className="product-card-favorite">
                        {/* Botón de cerrar (X) que elimina el producto */}
                        <button
                            className="close-button"
                            onClick={() => handleRemoveFavorite(favorite.id)}
                        >×</button>

                        <img src={favorite.img} alt={favorite.name} />
                        <div className="product-info-favorite">
                            <h5>{favorite.name}</h5>
                            <h6>{favorite.price}</h6>
                            <p>{favorite.artisan}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
