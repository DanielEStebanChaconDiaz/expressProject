import '../styles/favorite.css';
import React, { useState } from 'react';

export default function Favorite() {
    const [selectedCategory, setSelectedCategory] = useState(null); // Estado para la categoría seleccionada

    // Estado para los productos favoritos
    const [favorites, setFavorites] = useState([
        { id: 1, name: 'Tapiz Chumpi Andino III', price: 'S/.600', artisan: 'Taller Awaq Ayllus', img: '../../public/img/category-ejemplo.svg' },
        { id: 2, name: 'Chullo Andino', price: 'S/.250', artisan: 'Nación Q’ero', img: '../../public/img/category-ejemplo.svg' },
        { id: 3, name: 'Pechera de Chompe Kené', price: 'S/.350', artisan: 'Shinan Imabo', img: '../../public/img/category-ejemplo.svg' },
        { id: 4, name: 'Cartuchera Flores I', price: 'S/.30', artisan: 'Taller Awaq Ayllus', img: '../../public/img/category-ejemplo.svg' }
    ]);

    // Función para eliminar un producto de favoritos
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
                <div className="back-button">
                    <i className="bx bx-arrow-back"></i>
                    <h3>Tus artesanías favoritas</h3>
                </div>
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
