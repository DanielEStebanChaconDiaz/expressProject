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
    };

    const currentTitle = pageTitles[location.pathname];

    // Inserta un salto de línea entre las palabras si hay más de una palabra
    const formattedTitle = currentTitle?.split(' ').join('\n');

    return (
        <div className="back-button">
            <i className="bx bx-arrow-back" onClick={handleClick}></i>
            {/* Solo mostrar el h3 si currentTitle no está vacío */}
            {formattedTitle && <h3 style={{ whiteSpace: 'pre-wrap' }}>{formattedTitle}</h3>}
        </div>
    );
}
