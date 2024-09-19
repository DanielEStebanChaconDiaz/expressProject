import './app.css'
import Init from './pages/init'
import InitRegister from './pages/initRegister';
import RegisterEmail from './pages/registerEmail';
import { HashRouter, Routes, Route } from "react-router-dom"; // Cambiado a HashRouter
import InitLogin from './pages/initLogin'
import InitPolitics from './pages/initPolitics'
export default function App() {
    return (
        <HashRouter> {/* Cambiado a HashRouter */}
            <Routes>
                <Route path ="/" element={<Init/>}/>
                <Route path='/register' element={<InitRegister/>}/>
                <Route path='/login' element={<InitLogin/>}/>
                <Route path='/email' element={<RegisterEmail/>}/>
                <Route path='/politics' element={<InitPolitics/>}/>
            </Routes>
        </HashRouter>
    )
}