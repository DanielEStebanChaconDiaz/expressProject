import './app.css'
import Init from './pages/init'
import Home from './pages/home'
import Store from './pages/store'
import Offer from './pages/offer'
import Car from './pages/car'
import Confirmacion from './pages/confirmacion_compra'
import Exito from './pages/exito_compra'
import Category from './pages/category'
import Craft from './pages/craft'

import { HashRouter, Routes, Route } from "react-router-dom"; // Cambiado a HashRouter
export default function App() {
    return (
        <HashRouter> {/* Cambiado a HashRouter */}
            <Routes>
                <Route path ="/" element={<Init/>}/>
                <Route path ="/home" element={<Home/>}/>
                <Route path ="/store" element={<Store/>}/>
                <Route path ="/offer" element={<Offer/>}/>
                <Route path ="/car" element={<Car/>}/>
                <Route path ="/confirmacion_compra" element={<Confirmacion/>}/>
                <Route path ="/exito_compra" element={<Exito/>}/>
                <Route path ="/category" element={<Category/>}/>
                <Route path ="/craft" element={<Craft/>}/>
            </Routes>
        </HashRouter>
    )
}