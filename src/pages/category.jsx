import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/category.css';
import Flecha from '../components/flecha-back';

export default function Category() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [productos, setProductos] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const selected = params.get('selected');
        if (selected) {
            setSelectedCategory(decodeURIComponent(selected));
            fetchCategoria(decodeURIComponent(selected));
        } else {
            fetchProductos();
        }
    }, [location]);

    const fetchProductos = async () => {
        try {
            const response = await axios.get('https://localhost:3000/api/productos');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const fetchCategoria = async (categoria) => {
        const categoriaNormalizada = categoria
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .trim();

        const url = `https://localhost:3000/api/productos/categoria/${categoriaNormalizada}`;
        console.log('URL de filtración:', url);

        try {
            const response = await axios.get(url);
            setProductos(response.data);
            setSelectedCategory(categoria);
        } catch (error) {
            console.error('Error al obtener los productos de la categoría:', error);
        }
    };

    const handleProductClick = (producto) => {
        navigate('/productCard', { state: { producto } });
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
        <div className='category-container'>
            <header className="header-category">
                <Flecha/>
            </header>
            <section className="categories-cate">
                <div className='category-box-cate'>
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={`category-item-cate ${selectedCategory === category.name ? 'selected' : ''}`}
                            onClick={() => fetchCategoria(category.name)}
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
                    <a href="#/settings"><img src="../../public/img/ajustes.svg" alt="" /></a> 
                </div>
            </div>
            <div className="products-grid">
                {productos.length > 0 ? (
                    productos.map((producto, index) => (
                        <div key={index} className="product-card" onClick={() => handleProductClick(producto)}>
                            <img src={producto.imagen || "../../public/img/category-ejemplo.svg"} alt={producto.nombre} />
                            <div className="product-info">
                                <h5>{producto.nombre}</h5>
                                <h6>S/.{producto.precio}</h6>
                                <p>{producto.tienda}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron productos para esta categoría.</p>
                )}
            </div>
        </div>
    );
}