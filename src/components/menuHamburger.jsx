import "../styles/menu.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Menu() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const obtenerUsuarioLogueado = async () => {
      try {
        const response = await axios.get(
          "https://localhost:3000/api/usuarios/me",
          {
            withCredentials: true,
          }
        );
        const usuarioData = response.data;
        setUsuario(usuarioData);
      } catch (error) {
        console.error("Error al obtener el usuario logueado:", error);
      }
    };
    obtenerUsuarioLogueado();
  }, []);

  const obtenerFotoPerfil = () => {
    if (usuario && usuario.fotoPerfil) {
      if (usuario.fotoPerfil.includes("googleusercontent.com")) {
        return usuario.fotoPerfil.replace("=s96-c", "=s200-c");
      }
      return usuario.fotoPerfil;
    }
    return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://localhost:3000/api/usuarios/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUsuario(null);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className='menu-container'>
      <ul>
        <li>
          <div className="profile">
            <img src={obtenerFotoPerfil()} alt="Perfil" />
            <h1>{usuario ? usuario.nombreUsuario : 'Cargando...'}</h1>
          </div>
        </li>
        <li>
          <div className="favoritos" onClick={() => handleNavigation('/favorite')}>
            <img src="../../public/img/heard.svg" alt="" />
            <span>Lista de favoritos</span>
          </div>
        </li>
        <li>
          <div className="favoritos" onClick={() => handleNavigation('/compras')}>
            <img src="../../public/img/shopy.svg" alt="" />
            <span>Compras</span>
          </div>
        </li>
        <li>
          <div className="favoritos">
            <img src="../../public/img/docs.svg" alt="" />
            <a href="#/taller">Talleres</a>
          </div>
        </li>
        <li>
          <div className="favoritos">
            <img src="../../public/img/cupon.svg" alt="" />
            <a href="#/cupon">Canjear cupón</a>
          </div>
        </li>
        <div className="rombos">
          <img src="../../public/img/rombos.svg" alt="" />
        </div>
        <li>
          <div className="favoritos">
            <img src="../../public/img/settings.svg" alt="" />
            <a href="#/settings">Ajustes</a>
          </div>
        </li>
        <li>
          <div className="favoritos">
            <img src="../../public/img/chat.svg" alt="" />
            <a href="#/comentario">Comentarios</a>
          </div>
        </li>
        <li>
          <div className="favoritos">
            <img src="../../public/img/headphones.svg" alt="" />
            <a href="#/atencion">Atención al cliente</a>
          </div>
        </li>
        <li>
          <div className="favoritos" onClick={handleLogout}>
            <img src="../../public/img/logout.png" alt="" />
            <span>Cerrar sesión</span>
          </div>
        </li>
        <div className="footer">
          <p className="text1">Aplicación potenciada por:</p>
          <img src="../../public/img/campuslands.png" alt="Logo" />
        </div>
      </ul>
    </nav>
  );
}