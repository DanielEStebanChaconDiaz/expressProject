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
        "/talleres": "Talleres educativos",

    };

    const currentTitle = pageTitles[location.pathname] || "Tus artesanías favoritas";

    return (
        <div className="back-button">
            <i className="bx bx-arrow-back" onClick={handleClick}></i>
            <h3>{currentTitle}</h3>
        </div>
    );
}
