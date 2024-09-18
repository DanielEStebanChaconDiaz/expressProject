import '../styles/registerEmail.css';
import { useState, useRef } from 'react';
export default function RegisterEmail() {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const days = Array.from({ length: 31 }, (_, i) => i + 1); // Genera los días 1-31
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i); // Últimos 100 años
    const [gender, setGender] = useState('');
    return (
        <div className="container-email">
            <div className="container-top-email">
                <form>
                    <h3>Nombre de usuario*</h3>
                    <p>*Crea un nombre de usuario de minimo 5 y máximo 12 carácteres</p>
                    <input type="text" placeholder="Nombre de usuario" required />
                    <h3>Correo electrónico*</h3>
                    <input type="email" placeholder="Correo electrónico" required />
                    <h3>Confirma tu correo*</h3>
                    <input type="email" placeholder="Confirmar correo electrónico" required />
                    <h3>Contraseña*</h3>
                    <p>Recuerda crear una contraseña dificil de adivinar</p>
                    <input type="password" placeholder="Contraseña" required />
                    <h3>Confirma tu contraseña*</h3>
                    <input type="password" placeholder="Confirmar contraseña" required />
                    <h3>Sexo</h3>
                    <div className="radio-buttons">
                        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <option value="">Seleccionar</option>
                            <option value="male">Hombre</option>
                            <option value="female">Mujer</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>
                    <h3>Fecha de Nacimiento*</h3>
                    <div className="fecha-container">
                        {/* Select para día */}
                        <select value={day} onChange={(e) => setDay(e.target.value)}>
                            <option value="">Día</option>
                            {days.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>

                        {/* Select para mes */}
                        <select value={month} onChange={(e) => setMonth(e.target.value)}>
                            <option value="">Mes</option>
                            {months.map((m, index) => (
                                <option key={index} value={index + 1}>{m}</option>
                            ))}
                        </select>

                        {/* Select para año */}
                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            <option value="">Año</option>
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                    <div className="continuar">
                    <i className='bx bx-chevron-right' ></i><a href="#/politicas">Continuar</a>
                    </div>
                </form>
            </div >
        </div >
    )
}