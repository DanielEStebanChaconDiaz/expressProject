import '../styles/shopping.css';
import { useState } from "react";
import Flecha from '../components/flecha-back';

export default function Compras() {
    const [items, setItems] = useState([
        {
            id: 1,
            name: "Vasija pequeña con diseño de flor",
            price: 50,
            size: "13x10 cm, 2 KG",
            seller: "Asoc. de artesanos productores de Chazuta",
            quantity: 1,
            image: "../../public/img/producto-ejemplo2.svg",
        },
        {
            id: 2,
            name: "Bolso negro con diseño de flores",
            price: 40,
            size: "40x20 cm",
            seller: "Asoc. Pequeña Roma",
            quantity: 1,
            image: "../../public/img/producto-ejemplo2.svg",
        },
    ]);

    const handleRemove = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 20; // Envío fijo
    const total = subtotal + shipping;

    const favorites = [
        { id: 1, name: 'Tapiz Chumpi Andino III', price: 'S/.600', artisan: 'Taller Awaq Ayllus', img: '../../public/img/category-ejemplo.svg' },
        { id: 2, name: 'Chullo Andino', price: 'S/.250', artisan: 'Nación Q’ero', img: '../../public/img/category-ejemplo.svg' },
        { id: 3, name: 'Pechera de Chompe Kené', price: 'S/.350', artisan: 'Shinan Imabo', img: '../../public/img/category-ejemplo.svg' },
        { id: 4, name: 'Cartuchera Flores I', price: 'S/.30', artisan: 'Taller Awaq Ayllus', img: '../../public/img/category-ejemplo.svg' }
    ];

    return (
        <div className='shopping-container'>
            <header className="header-category">
                <Flecha/>
            </header>
            <section className="carrito-compras shopping">
                <div className="cart-items">
                    {items.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <h5>{item.name}</h5>
                                <h5>S/{item.price}</h5>
                                <h5>{item.size}</h5>
                                <h5>{item.seller}</h5>
                                <span>Ver seguimiento del producto</span>
                            </div>
                            <button onClick={() => handleRemove(item.id)} className="remove-button-shopping">
                                <img src="../../public/img/icon-chat.svg" alt="Eliminar" />
                            </button>
                        </div>
                    ))}
                </div>
            </section>
            <div className='sigue'>
                <h4>Sigue viendo más artesanías</h4>
            </div>
            <div className="products-grid-favorite">
                {favorites.map((favorite) => (
                    <div key={favorite.id} className="product-card-favorite">
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
