import '../styles/craft.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';  // Importa Axios

export default function Craft() {
    const navigate = useNavigate();
    const { state } = useLocation(); // Obtiene el estado pasado desde la navegación
    const { taller } = state || {};  // Extrae el objeto taller del estado
    const [productos, setProductos] = useState([]);  // Estado para almacenar los productos

    const handleClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (taller) {
            console.log('Datos del taller:', taller);  // Imprime los datos del taller en la consola
            fetchProductos(taller.id);  // Llamada a la función fetchProductos con el id del taller
        } else {
            console.log('No se recibieron datos del taller.');
        }
    }, [taller]);

    // Función para hacer el fetch de los productos utilizando el id del taller con Axios
    const fetchProductos = async (tallerId) => {
        try {
            const response = await axios.get(`https://localhost:3000/api/productos/tienda/${tallerId}`);
            console.log('Productos obtenidos:', response.data);  // Imprime los productos obtenidos en la consola
            setProductos(response.data);  // Almacena los productos obtenidos en el estado
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    return (
        <div className='craft-container'>
            <header className="header-craft">
                <div className="back-button-craft">
                    <i className="bx bx-arrow-back" onClick={handleClick}></i>
                    <img src="../../public/img/flecha-craft.svg" alt="" className='flecha' />
                </div>
                <div className='titulo'>
                    <img src="../../public/img/titulo-craft.svg" alt="" />
                    <h3>{taller ? taller.nombre : 'Nombre del taller no disponible'}</h3> {/* Muestra el nombre del taller */}
                </div>
            </header>
            <section>
                <div className="imagen-taller">
                    <img src={taller ? taller.imagen : taller.imagen} alt={taller?.nombre} /> {/* Muestra la imagen del taller */}
                </div>
                <div className="texto-craft">
                    <p>{taller ? taller.descripcion : 'Descripción no disponible'}</p> {/* Muestra la descripción del taller */}
                </div>
            </section>
            <div className='header2'>
                <h3>Artesanias</h3>
                <a href="#/chat"><img src="../../public/img/icon-chat.svg" alt="" className='icono-chat' /></a>
                
            </div>
            <div className="search-container-cate">
                <img src="../../public/img/search-category.svg" alt="Buscar" className="search-icon-cate" />
                <input type="text" placeholder="Buscar producto o palabra clave..." className="search-bar-cate" />
                <div className='img-ajustes-cate'>
                <a href="#/settings"><img src="../../public/img/ajustes.svg" alt="" /></a> 
                </div>
            </div>
            <div className="products-grid">
                {productos.length > 0 ? (
                    productos.map((producto, index) => (
                        <div key={index} className="product-card">
                            <img src={producto.imagen || "../../public/img/category-ejemplo.svg"} alt={producto.nombre} />
                            <div className="product-info">
                                <h5>{producto.nombre}</h5>
                                <h6>S/.{producto.precio}</h6>
                                <p>{taller?.nombre}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles.</p>
                )}
            </div>
        </div>
    );
}
