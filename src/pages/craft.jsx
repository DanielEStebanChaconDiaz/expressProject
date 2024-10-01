import '../styles/craft.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Craft() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { taller } = state || {};
    const [productos, setProductos] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [busqueda, setBusqueda] = useState('');

    const handleClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (taller) {
            console.log('Datos del taller:', taller);
            fetchProductos(taller.id);
        } else {
            console.log('No se recibieron datos del taller.');
            setMensaje('No se pudo cargar la información del taller.');
        }
    }, [taller]);

    const fetchProductos = async (tallerId) => {
        try {
            const response = await axios.get(`https://localhost:3000/api/productos/tienda/${tallerId}`);
            console.log('Productos obtenidos:', response.data);
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            setMensaje('Error al cargar los productos. Por favor, intenta de nuevo.');
        }
    };

    const handleSearch = (event) => {
        setBusqueda(event.target.value);
    };

    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleProductClick = (producto) => {
        navigate('/productCard', { state: { producto } });
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
                    <h3>{taller ? taller.nombre : 'Nombre del taller no disponible'}</h3>
                </div>
            </header>
            <section>
                <div className="imagen-taller">
                    <img src={taller ? taller.imagen : ''} alt={taller?.nombre} />
                </div>
                <div className="texto-craft">
                    <p>{taller ? taller.descripcion : 'Descripción no disponible'}</p>
                </div>
            </section>
            <div className='header2'>
                <h3>Artesanias</h3>
                <a href="#/chat"><img src="../../public/img/icon-chat.svg" alt="" className='icono-chat' /></a>
            </div>
            <div className="search-container-cate">
                <img src="../../public/img/search-category.svg" alt="Buscar" className="search-icon-cate" />
                <input 
                    type="text" 
                    placeholder="Buscar producto o palabra clave..." 
                    className="search-bar-cate"
                    value={busqueda}
                    onChange={handleSearch}
                />
                <div className='img-ajustes-cate'>
                <a href="#/settings"><img src="../../public/img/ajustes.svg" alt="" /></a> 
                </div>
            </div>
            
            {mensaje && <div className="mensaje">{mensaje}</div>}
            
            <div className="products-grid">
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map((producto) => (
                        <div key={producto._id || producto.id} className="product-card" onClick={() => handleProductClick(producto)}>
                            <img src={producto.imagen || "../../public/img/category-ejemplo.svg"} alt={producto.nombre} />
                            <div className="product-info">
                                <h5>{producto.nombre}</h5>
                                <h6>S/.{producto.precio}</h6>
                                <p>{taller?.nombre}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles que coincidan con tu búsqueda.</p>
                )}
            </div>
        </div>
    );
}