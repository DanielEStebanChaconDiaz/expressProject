import { useNavigate } from 'react-router-dom';
import '../styles/registerNumber.css';
import { useState } from 'react';

export default function RegisterNumber() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    };
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPhoneNumber, setConfirmPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [confirmCountryCode, setConfirmCountryCode] = useState('');
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
    const countryCodes = [
        { code: '+1', country: 'Estados Unidos' },
        { code: '+34', country: 'España' },
        { code: '+52', country: 'México' },
        { code: '+57', country: 'Colombia' }
    ];
    const handlePhoneChange = (setter) => (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setter(value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.length < 5 || username.length > 12) {
            setError('El nombre de usuario debe tener entre 5 y 12 caracteres.');
            return;
        }
        if (phoneNumber !== confirmPhoneNumber) {
            setError('Los números de teléfono no coinciden.');
            return;
        }
        if (countryCode !== confirmCountryCode) {
            setError('Los códigos de país no coinciden.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
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

        const monthNumber = months.indexOf(month) + 1;
        if (monthNumber === 0) {
            setError('Mes no válido.');
            return;
        }

        const formattedDay = day.toString().padStart(2, '0');
        const formattedMonth = monthNumber.toString().padStart(2, '0');
        const birthDateString = `${year}-${formattedMonth}-${formattedDay}`;
        
        const birthDate = new Date(birthDateString);
        if (isNaN(birthDate.getTime())) {
            setError('La fecha de nacimiento no es válida.');
            return;
        }


        const userData = {
            nombreUsuario: username,
            celular: `${countryCode}${phoneNumber}`,
            contrasena: password,
            sexo: gender,
            fechaNacimiento: birthDateString,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        setError('');
        navigate('/politics');
    };
    return (
        <div className="container-email">
            <i className='bx bx-arrow-back' onClick={handleClick} style={{ cursor: 'pointer' }}></i>
            <div className="container-top-email">
                <img src="../../public/img/flecha1-craft.svg" alt="" onClick={handleClick} className='flecha1'/>
                <form onSubmit={handleSubmit}>
                    <h3>Nombre de usuario*</h3>
                    <p className='gris'>*Crea un nombre de usuario de minimo 5 y máximo 12 carácteres</p>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                   
                    <h3>Número de teléfono*</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select className='codigo' value={countryCode} onChange={(e) => setCountryCode(e.target.value)} required>
                            <option value="">Código</option>
                            {countryCodes.map(country => (
                                <option key={country.code} value={country.code}>{country.code} ({country.country})</option>
                            ))}
                        </select>
                        <input className='number' type="tel" value={phoneNumber} onChange={handlePhoneChange(setPhoneNumber)} required />
                    </div>
                   
                    <h3>Confirma tu número de teléfono*</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select className='codigo' value={confirmCountryCode} onChange={(e) => setConfirmCountryCode(e.target.value)} required>
                            <option value="">Código</option>
                            {countryCodes.map(country => (
                                <option key={country.code} value={country.code}>{country.code} ({country.country})</option>
                            ))}
                        </select>
                        <input className='number' type="tel" value={confirmPhoneNumber} onChange={handlePhoneChange(setConfirmPhoneNumber)} required />
                    </div>
                    <h3>Contraseña*</h3>
                    <p className='gris'>Recuerda crear una contraseña dificil de adivinar</p>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                   
                    <h3>Confirma tu contraseña*</h3>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                   
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