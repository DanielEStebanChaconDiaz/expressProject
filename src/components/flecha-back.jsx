import { useNavigate, useLocation } from "react-router-dom";

export default function Flecha() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(-1);
  };

  // Mapea las rutas a sus respectivos títulos
  const pageTitles = {
    "/category": "Categorías",
    "/favorite": "Tus artesanías favoritas",
    "/compras": "Compras realizadas",
    "/taller": "Talleres educativos",
    "/settings": "Ajustes",
    "/atencion": "Atención al cliente",
    "/Maki": "",
    "/cupon": "Canjear cupón",
    "/comentario": "Comentarios a la app",
  };

  const currentTitle = pageTitles[location.pathname];

  // Verifica el número de palabras y formatea el título
  const formattedTitle = currentTitle?.split(' ');
  let titleWithLineBreak;

  if (formattedTitle && formattedTitle.length > 3) {
    titleWithLineBreak = `${formattedTitle[0]}\n${formattedTitle.slice(1).join(' ')}`;
  } else {
    titleWithLineBreak = currentTitle;
  }

  return (
    <div className="back-button">
      <i className="bx bx-arrow-back" onClick={handleClick}></i>
      {/* Solo mostrar el h3 si currentTitle no está vacío */}
      {titleWithLineBreak && <h3 style={{ whiteSpace: 'pre-wrap' }}>{titleWithLineBreak}</h3>}
    </div>
  );
}
