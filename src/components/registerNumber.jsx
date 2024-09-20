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
        // Añade más códigos de país aquí
    ];

    const handlePhoneChange = (setter) => (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Solo permite números
        setter(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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

        const formData = {
            username,
            phoneNumber: `${countryCode}${phoneNumber}`,
            password,
            gender,
            birthDate: {
                day,
                month,
                year,
            }
        };

        localStorage.setItem('userData', JSON.stringify(formData));

        setError('');
        console.log("Datos guardados:", formData);

        navigate('/politics');
    };

    return (
        <div className="container-email">
            <i className='bx bx-arrow-back' onClick={handleClick} style={{ cursor: 'pointer' }}></i>
            <div className="container-top-email">
                <form onSubmit={handleSubmit}>
                    <h3>Nombre de usuario*</h3>
                    <p>*Crea un nombre de usuario de minimo 5 y máximo 12 carácteres</p>
                    <input type="text" placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    
                    <h3>Número de teléfono*</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select className='codigo' value={countryCode} onChange={(e) => setCountryCode(e.target.value)} required>
                            <option value="">Código</option>
                            {countryCodes.map(country => (
                                <option key={country.code} value={country.code}>{country.code} ({country.country})</option>
                            ))}
                        </select>
                        <input className='number' type="tel" placeholder="Número de teléfono" value={phoneNumber} onChange={handlePhoneChange(setPhoneNumber)} required />
                    </div>
                    
                    <h3>Confirma tu número de teléfono*</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select className='codigo' value={confirmCountryCode} onChange={(e) => setConfirmCountryCode(e.target.value)} required>
                            <option value="">Código</option>
                            {countryCodes.map(country => (
                                <option key={country.code} value={country.code}>{country.code} ({country.country})</option>
                            ))}
                        </select>
                        <input className='number' type="tel" placeholder="Confirmar número de teléfono" value={confirmPhoneNumber} onChange={handlePhoneChange(setConfirmPhoneNumber)} required />
                    </div>

                    <h3>Contraseña*</h3>
                    <p>Recuerda crear una contraseña dificil de adivinar</p>
                    <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    
                    <h3>Confirma tu contraseña*</h3>
                    <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    
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
                        <select value={day} onChange={(e) => setDay(e.target.value)}>
                            <option value="">Día</option>
                            {days.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>

                        <select value={month} onChange={(e) => setMonth(e.target.value)}>
                            <option value="">Mes</option>
                            {months.map((m, index) => (
                                <option key={index} value={index + 1}>{m}</option>
                            ))}
                        </select>

                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            <option value="">Año</option>
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