import '../styles/offer.css'
import Header from '../components/header';
import Footer from '../components/footer';

export default function Offer(){
    const productos = [
        { nombre: 'Chalina Beige con flecos', precio: 'S/100', descuento: '35%', oferta: '', tienda: 'Aso. de artesanos Tinkuy', imagen: '../../public/img/producto-ejemplo.svg' },
        { nombre: 'Caminos de mesa', precio: 'S/200', descuento: '', oferta: '2x1', tienda: 'Cooperativa originarios', imagen: '../../public/img/producto-ejemplo.svg'  },
        { nombre: 'Dueño de la malva', precio: 'S/170', descuento: '15%', oferta: '', tienda: 'Lastenia Canayo', imagen: '../../public/img/producto-ejemplo.svg'  },
        { nombre: 'Chullo II', precio: 'S/250', descuento: '', oferta: '2x1', tienda: 'Nación Q’ero', imagen: '../../public/img/producto-ejemplo.svg'  },
        { nombre: 'Faja tradicional', precio: 'S/320', descuento: '', oferta: '3x2', tienda: '', imagen: '../../public/img/producto-ejemplo.svg' },
        { nombre: 'Bufanda especial', precio: 'S/150', descuento: '', oferta: 'Envío gratis', tienda: '', imagen: '../../public/img/producto-ejemplo.svg'  },
        
      ];
    
      const categorias = ['Textilería', 'Cerámica', 'Joyería', 'Talla en piedra', 'Talla en madera', 'Bordado', 'Joyeria', 'Hojalatería', 'Estampado', 'Pintura Tradicional'];
    
    return(
        <div className='offer-container'>
                <Header/>

        <section className="promociones-section">
        <div className='texto-encabezado'>
          <img src="../../public/img/triangulo-principales.svg" alt="" className='imagen-triangulo-store'/>
            <h2>Descuentos y promociones</h2>
            <p>En cientos de artesanías</p>
        </div>
        
        {/* Categorías */}
        <div className="categorias-carrusel">
            <div className="categorias-tabs">
                {categorias.map((categoria, index) => (
                <button key={index} className="categoria-tab">
                    {categoria}
                </button>
                ))}
            </div>
        </div>  


        {/* Productos en oferta */}
        <div className="productos-grid">
          {productos.map((producto, index) => (
            <div key={index} className="producto-card">
              <div className="imagen-wrapper">
                <img src={producto.imagen} alt={producto.nombre} />
                {/* {producto.descuento && (
                    <span className="etiqueta-descuento">
                        <img src="../../public/img/icon-discount.svg" alt="descuento estrella" className="estrella-icon" />
                        {producto.descuento}
                    </span>
                    )}
                    {producto.oferta && (
                    <span className="etiqueta-oferta">
                        <img src="../../public/img/icon-discount.svg"  alt="oferta estrella" className="estrella-icon" />
                        {producto.oferta}
                    </span>
                )} */}

              </div>
              <div className="producto-info">
                <h3>{producto.nombre}</h3>
                <p>{producto.precio}</p>
                <p className="tienda">{producto.tienda}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
      </div>
    )
}