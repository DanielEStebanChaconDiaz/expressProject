import { useState } from "react";
import "../styles/car.css";
import Confirmacion from './confirmacion_compra'

export default function Car() {
  const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckoutClick = () => {
        setIsModalOpen(true); // Abre el modal de confirmación
    };

    const closeModal = () => {
        setIsModalOpen(false); // Cierra el modal
    };
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

  const handleIncrease = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setItems(
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 20; // Envío fijo por ahora
  const total = subtotal + shipping;

  return (
    <div className="car-container">
      <header className="header">
        <div className="menu">
          <img src="../../public/img/menu.svg" alt="Menu" />
          <div className="search-container">
            <img
              src="../../public/img/search.svg"
              alt="Buscar"
              className="search-icon"
            />
            <input
              type="text"
              placeholder="Buscar producto o tienda..."
              className="search-bar"
            />
          </div>
        </div>
      </header>

      <section className="carrito-compras">
        <h2 className="titulo-car">Tu carrito de compras</h2>
        <p className="titulo2-car">Revisa aquí los productos que añadiste a tu carrito</p>

        {/* Lista de productos */}
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h5>{item.name}</h5>
                <h5>S/{item.price}</h5>
                <h5>{item.size}</h5>
                <h5>{item.seller}</h5>
                <div className="item-quantity">
                  <button onClick={() => handleDecrease(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item.id)}>+</button>
                </div>
              </div>
              <button onClick={() => handleRemove(item.id)} className="remove-button">
                <img src="../../public/img/icon-trash.svg" alt="" />
              </button>
            </div>
          ))}
        </div>
         <div className="cupon-car">
            <div className="cupon">
                <span>Añadir cupón de descuento</span>
            </div>
         </div>
        {/* Resumen del total */}
        <div className="total-summary">
            <div className="join">
                <div className="summary-row">
                    <span>Sub total</span>
                    <span>S/{subtotal}</span>
                </div>
                <div className="summary-row">
                    <span>Gastos de envío</span>
                    <span>S/{shipping}</span>
                </div>
            </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>S/{total}</span>
          </div>
            {/* Botón para realizar compra */}
            <button className="checkout-button" onClick={handleCheckoutClick}>Realizar compra</button>

            {/* Renderizar el modal si isModalOpen es true */}
            {isModalOpen && (
            <Confirmacion closeModal={closeModal} />
            )}
        </div>
      </section>

      <footer className="footer-nav">
        <a href="/#/store" className="nav-item">
            <img src="../../public/img/icon-store.svg" alt="Store" />
        </a>
        <a href="/#/offer" className="nav-item">
            <img src="../../public/img/icon-offer.svg" alt="Offers" />
        </a>
        <a href="/#/home" className="nav-item">
            <img src="../../public/img/icon-home.svg" alt="Home" />
        </a>
        <a href="/#/car" className="nav-item1">
            <img src="../../public/img/icon-car.svg" alt="Car" />
        </a>
        <a href="#" className="nav-item">
            <img src="../../public/img/icon-profile.svg" alt="Profile" />
        </a>
      </footer>
    </div>
  );
}
