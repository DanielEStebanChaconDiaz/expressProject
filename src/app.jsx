import React from 'react';
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from 'axios';
import './app.css';

// Importaciones de páginas
import Init from './pages/init';
import InitRegister from './pages/initRegister';
import RegisterEmail from './pages/registerEmail';
import Home from './pages/home'
import Store from './pages/store'
import Offer from './pages/offer'
import Car from './pages/car'
import Confirmacion from './pages/confirmacion_compra'
import Exito from './pages/exito_compra'
import Category from './pages/category'
import Craft from './pages/craft'
import Favorite from './pages/favorite'
import Compras from './pages/compras'
import Profile from './pages/profile';
import InitLogin from './pages/initLogin';
import InitPolitics from './pages/initPolitics';
import Number from './pages/registerNumber';
import MakiLogin from './pages/loginMaki';
import ProductCard from './pages/productCard';
import ProductCard2 from './pages/productCard2';
import Talleres from './pages/talleres';
import Settings from './pages/settings';
import Atencion from './pages/atencion';
import Cupon from './pages/cupon'
import Comentario from './pages/comentarios'
import InfoTaller from './pages/taller-info'
import Chat from './pages/chat'

const ErrorHandler = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return null;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Init/>}/>
    <Route path='/register' element={<InitRegister/>}/>
    <Route path='/login' element={<InitLogin/>}/>
    <Route path='/email' element={<RegisterEmail/>}/>
    <Route path='/number' element={<Number/>}/>
    <Route path='/Maki' element={<MakiLogin/>}/>
    <Route path='/politics' element={<InitPolitics/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/store" element={<Store/>}/>
    <Route path="/offer" element={<Offer/>}/>
    <Route path="/car" element={<Car/>}/>
    <Route path="/confirmacion_compra" element={<Confirmacion/>}/>
    <Route path="/exito_compra" element={<Exito/>}/>
    <Route path="/category" element={<Category/>}/>
    <Route path="/craft" element={<Craft/>}/>
    <Route path="/favorite" element={<Favorite/>}/> 
    <Route path="/compras" element={<Compras/>}/> 
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/productCard" element={<ProductCard/>}/>
    <Route path="/productCard2" element={<ProductCard2/>}/>
    <Route path="/taller" element={<Talleres/>}/>
    <Route path="/settings" element={<Settings/>}/>
    <Route path="/atencion" element={<Atencion/>}/>
    <Route path="/cupon" element={<Cupon/>}/>
    <Route path="/comentario" element={<Comentario/>}/>
    <Route path="/info-taller" element={<InfoTaller/>}/>
    <Route path="/chat" element={<Chat />} />
  </Routes>
);

export default function App() {
  return (
    <HashRouter>
      <ErrorHandler />
      <AppRoutes />
    </HashRouter>
  );
}