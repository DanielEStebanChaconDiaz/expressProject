import "../styles/politics.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Politics() {
  const navigate = useNavigate();
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [promotionsAccepted, setPromotionsAccepted] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleClick = () => {
    navigate(-1);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (privacyAccepted && termsAccepted) {
      if (userData) {
        try {
          const endpoint = userData.celular 
            ? "https://localhost:3000/api/usuarios/register-phone"
            : "https://localhost:3000/api/usuarios/register";

          const response = await axios.post(endpoint, {
            ...userData,
            aceptaPromociones: promotionsAccepted,
          }, {
            withCredentials: true
          });

          console.log("Registro exitoso:", response.data);
          
          // Guardar los datos del usuario en el localStorage
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          // Limpiar los datos temporales del registro
          localStorage.removeItem("userData");
          
          navigate("/home");
        } catch (err) {
          console.error("Error al registrar:", err.response);
          alert(
            "Error al registrar: " +
              (err.response?.data?.message || "Error desconocido")
          );
        }
      } else {
        alert("No se encontraron datos de usuario.");
      }
    } else {
      alert("Por favor, acepta los términos y condiciones.");
    }
  };

  return (
    <div className="politics-container">
      <i
        className="bx bx-arrow-back bx-arrow-back1"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      ></i>
      <div className="check">
        <div className="privacidad">
          <input
            type="checkbox"
            className="checkbox"
            checked={privacyAccepted}
            onChange={() => setPrivacyAccepted(!privacyAccepted)}
          />
          <p>
            He leído y acepto la <a href="#">Política de privacidad</a>
          </p>
        </div>
        <div className="condiciones">
          <input
            type="checkbox"
            className="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
          />
          <p>
            He leído y acepto los <a href="#">Términos y condiciones</a>
          </p>
        </div>
        <div className="proms">
          <input
            type="checkbox"
            className="checkbox"
            checked={promotionsAccepted}
            onChange={() => setPromotionsAccepted(!promotionsAccepted)}
          />
          <p>
            Acepto que me envíen promociones y eventos a mi correo electrónico
          </p>
        </div>
      </div>
      <div className="registrar">
        <i className="bx bx-chevron-right bx-chevron-right1"></i>
        <button onClick={handleRegister}>Registrarse</button>
      </div>
    </div>
  );
}