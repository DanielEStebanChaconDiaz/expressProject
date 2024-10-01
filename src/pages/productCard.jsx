import React, { useState } from 'react';
import '../styles/productCard.css';
import heartIcon from '../../public/img/heart.svg';  // Ícono de corazón vacío
import heartCompleteIcon from '../../public/img/heart-complete.svg';  // Ícono de corazón lleno
import cartIcon from '../../public/img/carrito.svg';  
import { useNavigate } from 'react-router-dom';

export default function ProductCard(){
    const navigate = useNavigate();
    
    // Estado para manejar el ícono del corazón
    const [isFavorite, setIsFavorite] = useState(false);

    const handleClick = () => {
        navigate(-1);
    };

    // Función para manejar el clic en el ícono del corazón
    const toggleFavorite = () => {
        setIsFavorite(prevState => !prevState);  // Cambia el estado a su opuesto
    };

    return(
        <div className='productCard-container'>
            <header className="header-craft">
                <div className="back-button-craft">
                    <i className="bx bx-arrow-back" onClick={handleClick}></i>
                    <img src="../../public/img/flecha-craft.svg" alt="" className='flecha'/>
                </div>
                <div className="image-container">
                    <img 
                    src="https://via.placeholder.com/400x300" 
                    alt="Tapiz Chumpi Andino III" 
                    className="product-image" 
                    />
                </div>
            </header>
            <section>
                <div className="product-info-card">
                    <div className="product-header-card">
                        <h3 className="product-title-card">Tapiz Chumpi Andino III</h3>
                    </div>

                    <div className='card-price-icon'>
                        <div className='card-up-title'>
                            <p className="product-price-card">S/. 600</p>
                            <p className="product-taller-card">Taller Awaq Ayllus</p>
                        </div>

                        {/* Ícono de favorito con funcionalidad de clic */}
                        <img 
                            src={isFavorite ? heartCompleteIcon : heartIcon} 
                            alt="Favorito" 
                            className="favorite-icon" 
                            onClick={toggleFavorite}  // Al hacer clic, cambia el estado
                        />
                    </div>

                    <div className="product-details-card">
                        <p><strong>Dimensiones:</strong> 60 x 80 cm</p>
                        <p><strong>Descripción:</strong> Tapiz tridimensional con diseños de la tradición textil andina prehispánica. Elaborado con lana de ovino y tejido en telar a pedal.</p>
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
    )
}
