import '../styles/cupon.css'
import React, { useState } from "react";
import Flecha from '../components/flecha-back'
import Rombo from '../components/header-rombo'
import FondoFlecha from '../components/fondo-flecha'

export default function Cupon(){

  const [cuponIngresado, setCuponIngresado] = useState("");
  const [cupones, setCupones] = useState([
    {
      id: 1,
      descripcion: "50% de descuento en cartucheras del Taller Awaq Ayllus",
      fechaVencimiento: "4/9/23",
      imagen: "https://via.placeholder.com/100", // Reemplaza con la URL real de la imagen
    },
    {
        id: 2,
        descripcion: "50% de descuento en cartucheras del Taller Awaq Ayllus",
        fechaVencimiento: "4/9/23",
        imagen: "https://via.placeholder.com/100", // Reemplaza con la URL real de la imagen
      },
  ]);

  const handleInputChange = (e) => {
    setCuponIngresado(e.target.value);
  };

  const handleValidarCupon = () => {
    console.log("Validando cupón: ", cuponIngresado);
  };

  const handleUsarCupon = (id) => {
    console.log(`Usando cupón con id: ${id}`);
  };

  return (
    <div className="container">
      {/* Sección de canje de cupón */}
      <FondoFlecha/>
    <Flecha/>
    <Rombo/>

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
          <img src="../../public/img/cupon-sin-fondo.svg" alt="" />
          <button onClick={handleValidarCupon} className="button-validar">
            Validar
          </button>
        </div>
      </div>

      {/* Sección de cupones vigentes */}
      <div className="cupones-section">
        <p>Cupones vigentes</p>
        <p className="subtext">*Usar antes de la fecha de vencimiento</p>

        {cupones.map((cupon) => (
          <div key={cupon.id} className="cupon-card">
            <img src={cupon.imagen} alt="Imagen cupón" className="image" />
            <div className="cupon-details">
              <p>{cupon.descripcion}</p>
              <h4>Fecha de vencimiento: {cupon.fechaVencimiento}</h4>
              <button
                onClick={() => handleUsarCupon(cupon.id)}
                className="button">
                Usar cupón
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

