import './app.css'
import Init from './pages/init'
import { HashRouter, Routes, Route } from "react-router-dom"; // Cambiado a HashRouter
export default function App() {
    return (
        <HashRouter> {/* Cambiado a HashRouter */}
            <Routes>
                <Route path ="/" element={<Init/>}/>
            </Routes>
        </HashRouter>
    )
}