import { useNavigate } from 'react-router-dom';
import '../styles/registerEmail.css';
import { useState } from 'react';
import bcrypt from 'bcryptjs';

export default function RegisterEmail() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    };
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validaciones existentes...
        if (username.length < 5 || username.length > 12) {
            setError('El nombre de usuario debe tener entre 5 y 12 caracteres.');
            return;
        }
    
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('El correo electrónico no es válido.');
            return;
        }
    
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
    
        if (!['masculino', 'femenino', 'otro'].includes(gender)) {
            setError('Sexo no válido.');
            return;
        }

        // Convertir el mes a número
        const monthNumber = months.indexOf(month) + 1;
        if (monthNumber === 0) {
            setError('Mes no válido.');
            return;
        }

        // Validar y formatear la fecha de nacimiento
        const formattedDay = day.toString().padStart(2, '0');
        const formattedMonth = monthNumber.toString().padStart(2, '0');
        const birthDateString = `${year}-${formattedMonth}-${formattedDay}`;
        
        // Crear un objeto Date y verificar si es válido
        const birthDate = new Date(birthDateString);
        if (isNaN(birthDate.getTime())) {
            setError('La fecha de nacimiento no es válida.');
            return;
        }

        if (email !== confirmEmail) {
            setError('Los correos electrónicos no coinciden.');
            return;
        }
    
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
    
        const hashedPassword = bcrypt.hashSync(password, 10);
    
        const userData = {
            nombreUsuario: username,
            correoElectronico: email,
            contrasena: hashedPassword,
            sexo: gender,
            fechaNacimiento: birthDateString,
        };
    
        // Almacenar en localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
    
        console.log('Datos almacenados en localStorage');
        setError('');
        navigate('/politics');
    };

    return (
        <div className="container-email">
            <i className='bx bx-arrow-back' onClick={handleClick} style={{ cursor: 'pointer' }}></i>
            <div className="container-top-email">
                <img src="../../public/img/flecha1-craft.svg" alt="" className='flecha1' /> 
                <form onSubmit={handleSubmit}>
                    <h3>Nombre de usuario*</h3>
                    <p className='gris'>*Crea un nombre de usuario de mínimo 5 y máximo 12 caracteres</p>
                    <input type="text" placeholder="" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <h3>Correo electrónico*</h3>
                    <input type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <h3>Confirma tu correo*</h3>
                    <input type="email" placeholder="" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required />
                    <h3>Contraseña*</h3>
                    <p className='gris'>Recuerda crear una contraseña difícil de adivinar</p>
                    <input type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <h3>Confirma tu contraseña*</h3>
                    <input type="password" placeholder="" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <h3>Sexo</h3>
                    <div className="radio-buttons">
                        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <option value=""></option>
                            <option value="masculino">Hombre</option>
                            <option value="femenino">Mujer</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                    <h3>Fecha de Nacimiento*</h3>
                    <div className="fecha-container">
                        <select value={day} onChange={(e) => setDay(e.target.value)}>
                            <option value="">DD</option>
                            {days.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>

                        <select value={month} onChange={(e) => setMonth(e.target.value)}>
                            <option value="">MM</option>
                            {months.map((m, index) => (
                                <option key={index} value={m}>{m}</option>
                            ))}
                        </select>

                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            <option value="">YYYY</option>
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="continuar">
                        <button type="submit">
                            <i className='bx bx-chevron-right'></i><p>Continuar</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}