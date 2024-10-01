import '../styles/productCard.css'
import heartIcon from '../../public/img/heart-complete.svg';
import cartIcon from '../../public/img/carrito.svg';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ProductCard2(){
    const navigate = useNavigate();
    const location = useLocation();
    const producto = location.state?.producto;

    const handleClick = () => {
        navigate(-1);
    };

    if (!producto) {
        return <div>No se encontró información del producto.</div>;
    }

    return(
        <div className='productCard-container'>
            <header className="header-craft">
                <div className="back-button-craft">
                    <i className="bx bx-arrow-back" onClick={handleClick}></i>
                    <img src="../../public/img/flecha-craft.svg" alt="" className='flecha'/>
                </div>
                <div className="image-container">
                    <img 
                    src={producto.imagen} 
                    alt={producto.nombre} 
                    className="product-image" 
                    />
                    {producto.descuento && (
                        <div className='descuento-card'>
                            <img src="../../public/img/star-card.svg" alt="" />
                            <h3>{producto.descuento}</h3>
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
                        <img src={heartIcon} alt="Favorito" className="favorite-icon" />
                    </div>

                    <div className="product-details-card">
                        <p><strong>Dimensiones:</strong> {producto.dimensiones || 'No especificadas'}</p>
                        <p><strong>Descripción:</strong> {producto.descripcion || 'No hay descripción disponible.'}</p>
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