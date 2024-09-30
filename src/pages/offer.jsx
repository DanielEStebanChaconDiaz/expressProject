import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/offer.css'
import Header from '../components/header';
import Footer from '../components/footer';

export default function Offer(){
    const [productos, setProductos] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    
    useEffect(() => {
        fetchProductos();
    }, []);
    
    const fetchProductos = async () => {
        try {
            const response = await axios.get('https://localhost:3000/api/productos/descuento');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };
    
    const fetchCategoria = async (categoria) => {
        const categoriaNormalizada = categoria
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .trim();

        const url = `https://localhost:3000/api/productos/categoria/${categoriaNormalizada}/descuento`;
        console.log('URL de filtración:', url);

        try {
            const response = await axios.get(url);
            setProductos(response.data);
            setCategoriaSeleccionada(categoria);
        } catch (error) {
            console.error('Error al obtener los productos de la categoría:', error);
        }
    };

    const categorias = ['Textilería', 'Cerámica', 'Joyería', 'Talla en piedra', 'Talla en madera', 'Bordado', 'Joyeria', 'Hojalatería', 'Estampado', 'Pintura Tradicional'];

    return(
        <div className='offer-container'>
            <Header/>

            <section className="promociones-section">
                <h2>Descuentos y promociones</h2>
                <p>En cientos de artesanías</p>
                
                <div className="categorias-carrusel">
                    <div className="categorias-tabs">
                        <button 
                            className={`categoria-tab ${categoriaSeleccionada === '' ? 'active' : ''}`} 
                            onClick={fetchProductos}
                        >
                            Todos
                        </button>
                        {categorias.map((categoria, index) => (
                            <button 
                                key={index} 
                                className={`categoria-tab ${categoriaSeleccionada === categoria ? 'active' : ''}`}
                                onClick={() => fetchCategoria(categoria)}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>
                </div>  

                <div className="productos-grid">
                    {productos.length > 0 ? (
                        productos.map((producto, index) => (
                            <div key={index} className="producto-card">
                                <div className="imagen-wrapper">
                                    <img src={producto.imagen} alt={producto.nombre} />
                                    {producto.descuento && (
                                        <span className="etiqueta-descuento">
                                            <img src="../../public/img/icon-discount.svg" alt="descuento estrella" className="estrella-icon" />
                                            {producto.descuento}
                                        </span>
                                    )}
                                    {producto.oferta && (
                                        <span className="etiqueta-oferta">
                                            <img src="../../public/img/icon-discount.svg" alt="oferta estrella" className="estrella-icon" />
                                            {producto.oferta}
                                        </span>
                                    )}
                                </div>
                                <div className="producto-info">
                                    <h3>{producto.nombre}</h3>
                                    <p>{producto.precio}</p>
                                    <p className="tienda">{producto.tienda}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron productos para esta categoría.</p>
                    )}
                </div>
            </section>
            
            <Footer/>
        </div>
    );
}