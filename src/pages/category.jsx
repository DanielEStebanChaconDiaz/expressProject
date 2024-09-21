import '../styles/category.css';

export default function Category(){
    const categories = [
        { name: 'Textilería', icon: '../../public/img/category1.svg' },
        { name: 'Cerámica', icon: '../../public/img/category2.svg' },
        { name: 'Orfebrería', icon: '../../public/img/category3.svg' },
        { name: 'Bordado', icon: '../../public/img/category6.svg'},
        { name: 'Joyería', icon: '../../public/img/category7.svg' },
        { name: 'Hojalatería', icon: '../../public/img/category8.svg' },
        { name: 'Estampado', icon: '../../public/img/category9.svg' },
        { name: 'Talla en madera', icon: '../../public/img/category5.svg' },
        { name: 'Talla en piedra', icon: '../../public/img/category4.svg' },
        { name: 'Pintura tradicional', icon: '../../public/img/category10.svg' },
      ];
    return(
        <div className='category-container'>
            <header className="header-category">
                <div className="back-button">
                    <i className="bx bx-arrow-back"></i>
                <h3>Categorías</h3>
                </div>
            </header>
            <section className="categories-cate">
                <div className='category-box-cate'>
                {categories.map((category, index) => (
                <div key={index} className="category-item-cate">
                    <img src={category.icon} alt={category.name} className="category-icon-cate" />
                    <span>{category.name}</span>
                </div>
                ))}
                </div>
      </section>
            <div className="search-container">
                <img src="../../public/img/search.svg" alt="Buscar" className="search-icon" />
                <input type="text" placeholder="Buscar producto o tienda..." className="search-bar" />
            </div>
            <div className="products-grid">
                <div className="product-card">
                    <img src="https://via.placeholder.com/100" alt="Producto 1" />
                    <div className="product-info">
                        <h2>Tapiz Chumpi Andino III</h2>
                        <p>S/.600</p>
                        <p>Taller Awaq Ayllus</p>
                    </div>
                </div>
                <div className="product-card">
                    <img src="https://via.placeholder.com/100" alt="Producto 2" />
                    <div className="product-info">
                        <h2>Pechera de Chompe Kené</h2>
                        <p>S/.350</p>
                        <p>Shinan Imabo</p>
                    </div>
                </div>
                {/* Agrega más productos aquí */}
            </div>
        </div> // <-- Este cierre estaba faltando
    );
}
