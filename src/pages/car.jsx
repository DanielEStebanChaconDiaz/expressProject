import { useState, useEffect } from "react";
import "../styles/car.css";
import Confirmacion from './confirmacion_compra';
import Header from '../components/header';
import Footer from "../components/footer";
import axios from 'axios';

export default function Car() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cupon, setCupon] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const shipping = 20; // Envío fijo

  useEffect(() => {
    fetchCarrito();
  }, []);

  const fetchCarrito = async () => {
    try {
      setLoading(true);

      const response = await axios.get('https://localhost:3000/api/usuarios/me', {
        withCredentials: true
      });
      
      const { carrito } = response.data;
      console.log('Carrito de la sesión:', carrito);

      const productosDetalles = await Promise.all(carrito.map(async (item) => {
        const productoResponse = await axios.get(`https://localhost:3000/api/productos/${item.producto}`, {
          withCredentials: true
        });
        return {
          ...item,
          producto: productoResponse.data
        };
      }));

      setItems(productosDetalles || []);
      calcularTotal(productosDetalles || []);
      setError(null);
    } catch (error) {
      console.error('Error al obtener el carrito de la sesión:', error);
      setError('Error al cargar el carrito. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };
  const calcularTotal = (carrito, descuentoTotal = 0) => {
    const nuevoSubtotal = carrito.reduce((sum, item) => {
      const precioItem = item.precioConDescuento || item.producto.precio;
      return sum + (precioItem * item.cantidad);
    }, 0);
    
    setSubtotal(nuevoSubtotal);
    setTotal(nuevoSubtotal + shipping);
  };

  const handleQuantityChange = async (id, change) => {
    // Buscar el producto actual en el carrito
    const item = items.find(item => item.producto.id === id);
  
    // Verificar si la nueva cantidad sería 0 o menor
    const nuevaCantidad = item.cantidad + change;
    
    // Si la nueva cantidad es 0, eliminamos el producto
    if (nuevaCantidad <= 0) {
      handleRemove(id);
      return;
    }
  
    try {
      // Si la cantidad es mayor a 0, actualizamos el carrito
      const response = await axios.post('https://localhost:3000/api/usuarios/carrito/agregar', {
        productoId: id,
        cantidad: change
      }, {
        withCredentials: true
      });
  
      // Actualizamos los items del carrito y el total
      setItems(response.data.carrito);
      calcularTotal(response.data.carrito);
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      setError('Error al actualizar el carrito. Por favor, intenta de nuevo.');
    }
  };
  
  const handleRemove = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`https://localhost:3000/api/usuarios/carrito/remover/${id}`, {
        withCredentials: true
      });
      setItems(response.data.carrito);
      calcularTotal(response.data.carrito);
    } catch (error) {
      console.error('Error al remover item:', error);
      setError('Error al eliminar el item del carrito. Por favor, intenta de nuevo.');
    }
  };
  

  const aplicarCupon = async () => {
    try {
      const response = await axios.post('https://localhost:3000/api/usuarios/carrito/usar-cupon', {
        codigoCupon: cupon
      }, {
        withCredentials: true
      });
      if (response.data.carrito) {
        setItems(response.data.carrito);
        calcularTotal(response.data.carrito);
      } else {
        await fetchCarrito();
      }
      setCupon('');
    } catch (error) {
      console.error('Error al aplicar cupón:', error);
    }
  };

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onCompraExitosa = () => {
    // Reiniciar el carrito, subtotal y total
    setItems([]);
    setSubtotal(0);
    setTotal(0);
    closeModal();
  };

  return (
    <div className="car-container">
      <Header />
      <section className="carrito-compras">
      <div className='texto-encabezado'>
        <img src="../../public/img/triangulo-principales.svg" alt="" className='imagen-triangulo-store'/>
        <h2 className="titulo-car">Tu carrito de compras</h2>
        <p className="titulo2-car">Revisa aquí los productos que añadiste a tu carrito</p>
      </div>

        {loading ? (
          <p>Cargando carrito...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : items.length > 0 ? (
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.producto._id} className="cart-item">
                <img src={item.producto.imagen} alt={item.producto.nombre} className="item-image" />
                <div className="item-details">
                  <h5>{item.producto.nombre}</h5>
                  <h5 className="precio-original">
                    S/{item.producto.precio.toFixed(2)}
                  </h5>

                  {/* Mostrar precio con descuento si existe */}
                  {item.precioConDescuento && (
                    <h5 className="precio-con-descuento">
                      Precio con descuento: S/{item.precioConDescuento.toFixed(2)}
                    </h5>
                  )}
                  
                  <h5>{item.producto.tamaño}</h5>
                  <h5>{item.producto.vendedor}</h5>
                  <div className="item-quantity">
                    <button onClick={() => handleQuantityChange(item.producto.id, -1)}>-</button>
                    <span>{item.cantidad}</span>
                    {console.log('producto: ',item.producto)}
                    <button onClick={() => handleQuantityChange(item.producto.id, 1)}>+</button>
                  </div>
                </div>
                <button onClick={() => handleRemove(item.producto._id)} className="remove-button">
                  <img src="../../public/img/icon-trash.svg" alt="" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Tu carrito está vacío</p>
        )}

        <div className="cupon-car">
          <div className="cupon">
            <input
              type="text"
              placeholder="Código de cupón"
              value={cupon}
              onChange={(e) => setCupon(e.target.value)}
            />
            <button onClick={aplicarCupon}>Aplicar cupón</button>
          </div>
        </div>

        {items.length > 0 && (
          <div className="total-summary">
            <div className="join">
              <div className="summary-row">
                <span>Sub total</span>
                <span>S/{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Gastos de envío</span>
                <span>S/{shipping.toFixed(2)}</span>
              </div>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>S/{total.toFixed(2)}</span>
            </div>
            <button className="checkout-button" onClick={handleCheckoutClick}>Realizar compra</button>
          </div>
        )}

        {isModalOpen && (
          <Confirmacion 
            closeModal={closeModal} 
            total={total}
            onCompraExitosa={onCompraExitosa}
          />
        )}
      </section>
      <Footer />
    </div>
  );
}
