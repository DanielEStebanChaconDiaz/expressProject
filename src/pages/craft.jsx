import '../styles/craft.css'

export default function Craft(){
    return(
        <div className='craft-container'>
            <header className="header-craft">
                <div className="back-button-craft">
                    <i className="bx bx-arrow-back"></i>
                    <img src="../../public/img/flecha-craft.svg" alt="" className='flecha'/>
                </div>
                <div className='titulo'>
                    <img src="../../public/img/titulo-craft.svg" alt="" />
                    <h3>Taller Awaq Ayllus</h3>
                </div>
            </header>
            <section>
                <div className="imagen-taller">
                    <img src="../../public/img/craft-ejemplo.svg" alt="" />
                </div>
                <div className="texto-craft">
                    <p>Conoce la historia detrás de este taller artesanal y conoce como producen sus textiles</p>
                </div>
            </section>
            <div className='header2'>
                <h3>Artesanias</h3>
                <img src="../../public/img/icon-chat.svg" alt="" className='icono-chat'/>
            </div>
            <div className="search-container-cate">
                <img src="../../public/img/search-category.svg" alt="Buscar" className="search-icon-cate" />
                <input type="text" placeholder="Buscar producto o palabra clave..." className="search-bar-cate" />
                <div className='img-ajustes-cate'>
                    <img src="../../public/img/ajustes.svg" alt="" />
                </div>
            </div>
            <div className="products-grid">
                <div className="product-card">
                    <img src="../../public/img/category-ejemplo.svg" alt="Producto 1" />
                    <div className="product-info">
                        <h5>Tapiz Chumpi Andino III</h5>
                        <h6>S/.600</h6>
                        <p>Taller Awaq Ayllus</p>
                    </div>
                </div>
                <div className="product-card">
                <img src="../../public/img/category-ejemplo.svg" alt="Producto 1" />
                    <div className="product-info">
                        <h5>Tapiz Chumpi Andino III</h5>
                        <h6>S/.600</h6>
                        <p>Taller Awaq Ayllus</p>
                    </div>
                </div>
                <div className="product-card">
                <img src="../../public/img/category-ejemplo.svg" alt="Producto 1" />
                    <div className="product-info">
                        <h5>Tapiz Chumpi Andino III</h5>
                        <h6>S/.600</h6>
                        <p>Taller Awaq Ayllus</p>
                    </div>
                </div>
                <div className="product-card">
                <img src="../../public/img/category-ejemplo.svg" alt="Producto 1" />
                    <div className="product-info">
                        <h5>Tapiz Chumpi Andino III</h5>
                        <h6>S/.600</h6>
                        <p>Taller Awaq Ayllus</p>
                    </div>
                </div>
             </div>

        </div>
    )
}