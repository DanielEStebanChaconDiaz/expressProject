import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import './app.css';

// Importaciones de páginas
import Init from './pages/init';
import InitRegister from './pages/initRegister';
import RegisterEmail from './pages/registerEmail';
import Home from './pages/home';
import Store from './pages/store';
import Offer from './pages/offer';
import Car from './pages/car';
import Confirmacion from './pages/confirmacion_compra';
import Exito from './pages/exito_compra';
import Category from './pages/category';
import Craft from './pages/craft';
import Favorite from './pages/favorite';
import Compras from './pages/shopping';
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

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Rutas de inicio y autenticación */}
        <Route path="/" element={<Init />} />
        <Route path="/register" element={<InitRegister />} />
        <Route path="/login" element={<InitLogin />} />
        <Route path="/email" element={<RegisterEmail />} />
        <Route path="/number" element={<Number />} />
        <Route path="/maki" element={<MakiLogin />} />
        <Route path="/politics" element={<InitPolitics />} />

        {/* Rutas principales */}
        <Route path="/home" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/car" element={<Car />} />
        <Route path="/confirmacion-compra" element={<Confirmacion />} />
        <Route path="/exito-compra" element={<Exito />} />
        <Route path="/category" element={<Category />} />
        <Route path="/craft" element={<Craft />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/profile" element={<Profile />} />

        {/* Rutas de productos y talleres */}
        <Route path="/product-card" element={<ProductCard />} />
        <Route path="/product-card-2" element={<ProductCard2 />} />
        <Route path="/taller" element={<Talleres />} />

        {/* Rutas adicionales */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/atencion" element={<Atencion />} />
      </Routes>
    </HashRouter>
  );
}