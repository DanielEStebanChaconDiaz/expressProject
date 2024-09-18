import './app.css'
import Init from './pages/init'
import RegisterEmail from './pages/registerEmail';
import { HashRouter, Routes, Route } from "react-router-dom"; // Cambiado a HashRouter
import InitLogin from './pages/initLogin'
export default function App() {
    return (
        <HashRouter> {/* Cambiado a HashRouter */}
            <Routes>
                <Route path ="/" element={<Init/>}/>
                <Route path='/login' element={<InitLogin/>}/>
                <Route path='/email' element={<RegisterEmail/>}/>
            </Routes>
        </HashRouter>
    )
}