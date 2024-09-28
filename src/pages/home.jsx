import '../styles/home.css';
import { useState,useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';

export default function Home() {
  useEffect(() => {
    const obtenerUsuarioLogueado = async () => {
      try {
        const response = await axios.get('https://localhost:3000/api/usuarios/me', { 
          withCredentials: true 
        });
        const usuario = response.data;
      } catch (error) {
        console.error('Error al obtener el usuario logueado:', error);
      }
    };

    obtenerUsuarioLogueado();
  }, []); 

  const categories = [
    { name: 'Textilería', icon: '../../public/img/category1.svg' },
    { name: 'Cerámica', icon: '../../public/img/category2.svg' },
    { name: 'Orfebrería', icon: '../../public/img/category3.svg' },
    { name: 'Talla en piedra', icon: '../../public/img/category4.svg' },
    { name: 'Talla en madera', icon: '../../public/img/category5.svg' },
    { name: 'Bordado', icon: '../../public/img/category6.svg' },
    { name: 'Joyería', icon: '../../public/img/category7.svg' },
    { name: 'Hojalatería', icon: '../../public/img/category8.svg' },
    { name: 'Estampado', icon: '../../public/img/category9.svg' },
    { name: 'Pintura tradicional', icon: '../../public/img/category10.svg' },
  ];

  return (
    <>
      <div className="App">
        <Header/>

        <section className="categories">
          <h3>Categorias</h3>
          <div className='category-box'>
            {categories.map((category, index) => (
              <div key={index} className="category-item">
                <img src={category.icon} alt={category.name} className="category-icon" />
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="workshops">
          <h3>Talleres del mes</h3>
          <p>¡Aprende cómo hacerlos en estos talleres educativos!</p>
          <img src="../../public/img/ejemplo1.svg" alt="Taller del mes" />
        </section>
              <Footer/>

      </div>

      {/* Componente de menú hamburguesa */}
    </>
  );
}