import './app.css'
import Init from './pages/init'
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
import Compras from './pages/shopping'

import { HashRouter, Routes, Route } from "react-router-dom"; // Cambiado a HashRouter
import InitLogin from './pages/initLogin'
import InitPolitics from './pages/initPolitics'
import Number from './pages/registerNumber';
import MakiLogin from './pages/loginMaki';
export default function App() {
    return (
        <HashRouter> {/* Cambiado a HashRouter */}
            <Routes>
                <Route path ="/" element={<Init/>}/>
                <Route path='/register' element={<InitRegister/>}/>
                <Route path='/login' element={<InitLogin/>}/>
                <Route path='/email' element={<RegisterEmail/>}/>
                <Route path='/number' element={<Number/>}/>
                <Route path='/Maki' element={<MakiLogin/>}/>
                <Route path='/politics' element={<InitPolitics/>}/>
                <Route path ="/home" element={<Home/>}/>
                <Route path ="/store" element={<Store/>}/>
                <Route path ="/offer" element={<Offer/>}/>
                <Route path ="/car" element={<Car/>}/>
                <Route path ="/confirmacion_compra" element={<Confirmacion/>}/>
                <Route path ="/exito_compra" element={<Exito/>}/>
                <Route path ="/category" element={<Category/>}/>
                <Route path ="/craft" element={<Craft/>}/>
                <Route path ="/favorite" element={<Favorite/>}/> 
                <Route path ="/compras" element={<Compras/>}/> 
            </Routes>
        </HashRouter>
    )
}