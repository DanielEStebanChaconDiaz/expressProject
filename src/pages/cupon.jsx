import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/cupon.css';
import Flecha from '../components/flecha-back';
import Rombo from '../components/header-rombo';
import FondoFlecha from '../components/fondo-flecha';

export default function Cupon() {
  const [cuponIngresado, setCuponIngresado] = useState("");
  const [cupones, setCupones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCupones();
  }, []);

  const fetchCupones = async () => {
    try {
      const { data: usuario } = await axios.get('https://localhost:3000/api/usuarios/me', { withCredentials: true });
      
      if (!Array.isArray(usuario.cuponesAsignados) || usuario.cuponesAsignados.length === 0) {
        setCupones([]);
        return;
      }

      const cuponesPromises = usuario.cuponesAsignados.map(async cuponId => {
        const { data: cupon } = await axios.get(`https://localhost:3000/api/cupones/${cuponId}`, { withCredentials: true });
        
        if (cupon.productoId) {
          const { data: producto } = await axios.get(`https://localhost:3000/api/productos/${cupon.productoId}`, { withCredentials: true });
          return { ...cupon, imagenProducto: producto.imagen };
        }
        
        return cupon;
      });

      const cuponesData = await Promise.all(cuponesPromises);
      
      setCupones(cuponesData);
    } catch (error) {
      console.error('Error al obtener cupones:', error);
      setError('No se pudieron cargar los cupones. Por favor, intente más tarde.');
      setCupones([]);
    }
  };

  const handleInputChange = (e) => setCuponIngresado(e.target.value);

  const handleValidarCupon = async () => {
    try {
      await axios.post('https://localhost:3000/api/usuarios/carrito/canjear-cupon', 
        { codigoCupon: cuponIngresado },
        { withCredentials: true }
      );
      setCuponIngresado('');
      fetchCupones();
    } catch (error) {
      console.error('Error al validar cupón:', error);
      setError('No se pudo validar el cupón. Por favor, intente de nuevo.');
    }
  };

  const handleUsarCupon = async (id) => {
    try {
      await axios.post('https://localhost:3000/api/usuarios/carrito/aplicar-cupon', 
        { cuponId: id },
        { withCredentials: true }
      );
      fetchCupones();
    } catch (error) {
      console.error('Error al usar cupón:', error);
      setError('No se pudo usar el cupón. Por favor, intente de nuevo.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) return 'Fecha inválida';
    
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="cupon-container">
      <FondoFlecha />
      <Flecha />
      <Rombo />
      <div className="input-section">
        <p>¿Cuentas con algún cupón de descuento? Canjealo aquí</p>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Ingresa tu cupón"
            value={cuponIngresado}
            onChange={handleInputChange}
            className="input"
          />
          <img src="/img/cupon-sin-fondo.svg" alt="Icono cupón" />
          <button onClick={handleValidarCupon} className="button-validar">
            Validar
          </button>
        </div>
      </div>
      <div className="cupones-section">
        <p>Cupones vigentes</p>
        <p className="subtext">*Usar antes de la fecha de vencimiento</p>
        {error && <p className="error-message">{error}</p>}
        {cupones.length === 0 ? (
          <p>No hay cupones disponibles en este momento.</p>
        ) : (
          cupones.map((cupon) => (
            <div key={cupon._id.$oid} className="cupon-card">
              <img 
                src={cupon.imagenProducto || "/img/default-cupon.svg"} 
                alt={cupon.imagenProducto ? "Imagen del producto" : "Cupón genérico"} 
                className="image"
              />
              <div className="cupon-details">
                <p>{cupon.codigo}</p>
                <p>Descuento: {cupon.descuento}{cupon.tipo === 'porcentaje' ? '%' : ' MXN'}</p>
                <p>Tipo: {cupon.tipo === 'porcentaje' ? 'Porcentaje' : 'Monto fijo'}</p>
                <h4>Fecha de vencimiento: {formatDate(cupon.fechaExpiracion)}</h4>
                {cupon.productoId && <p>Aplicable a producto específico</p>}
                {cupon.tallerId && <p>Aplicable a taller específico</p>}
                <button
                  onClick={() => handleUsarCupon(cupon._id.$oid)}
                  className="button">
                  Usar cupón
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}