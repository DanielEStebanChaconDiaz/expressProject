import React, { useState } from 'react';
import '../styles/category.css';

export default function Category() {
    const [selectedCategory, setSelectedCategory] = useState(null); // Estado para la categoría seleccionada

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
        <div className='category-container'>
            <header className="header-category">
                <div className="back-button">
                    <i className="bx bx-arrow-back"></i>
                    <h3>Categorías</h3>
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
            <div className="search-container-cate">
                <img src="../../public/img/search-category.svg" alt="Buscar" className="search-icon-cate" />
                <input type="text" placeholder="Buscar producto o palabra clave..." className="search-bar-cate" />
                <div className='img-ajustes-cate'>
                    <img src="../../public/img/ajustes.svg" alt="" />
                </div>
            </div>
            <div className="products-grid">
                <div className="product-card">
                    <img src="../../public/img/category-ejemplo.svg" alt="Producto 1" />
                    <div className="product-info">
                        <h5>Tapiz Chumpi Andino III</h5>
                        <h6>S/.600</h6>
                        <p>Taller Awaq Ayllus</p>
                    </div>
                </div>
                <div className="product-card">
                <img src="../../public/img/category-ejemplo.svg" alt="Producto 1" />
                    <div className="product-info">
                        <h5>Tapiz Chumpi Andino III</h5>
                        <h6>S/.600</h6>
                        <p>Taller Awaq Ayllus</p>
                    </div>
                </div>
                <div className="product-card">
                <img src="../../public/img/category-ejemplo.svg" alt="Producto 1" />
                    <div className="product-info">
                        <h5>Tapiz Chumpi Andino III</h5>
                        <h6>S/.600</h6>
                        <p>Taller Awaq Ayllus</p>
                    </div>
                </div>
                <div className="product-card">
                <img src="../../public/img/category-ejemplo.svg" alt="Producto 1" />
                    <div className="product-info">
                        <h5>Tapiz Chumpi Andino III</h5>
                        <h6>S/.600</h6>
                        <p>Taller Awaq Ayllus</p>
                    </div>
                </div>
                <div className="product-card">
                <img src="../../public/img/category-ejemplo.svg" alt="Producto 1" />
                    <div className="product-info">
                        <h5>Tapiz Chumpi Andino III</h5>
                        <h6>S/.600</h6>
                        <p>Taller Awaq Ayllus</p>
                    </div>
                </div>
                <div className="product-card">
                <img src="../../public/img/category-ejemplo.svg" alt="Producto 1" />
                    <div className="product-info">
                        <h5>Tapiz Chumpi Andino III</h5>
                        <h6>S/.600</h6>
                        <p>Taller Awaq Ayllus</p>
                    </div>
                </div>
                
                {/* Agrega más productos aquí */}
            </div>
        </div>
    );
}
