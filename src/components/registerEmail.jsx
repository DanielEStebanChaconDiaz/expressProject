import { useNavigate } from 'react-router-dom';
import '../styles/registerEmail.css';
import { useState } from 'react';

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
    const [error, setError] = useState(''); // Para manejar errores de validación

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que los correos sean iguales
        if (email !== confirmEmail) {
            setError('Los correos electrónicos no coinciden.');
            return;
        }

        // Validar que las contraseñas sean iguales (opcional)
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        // Si todo está bien, guardar los datos en el localStorage
        const formData = {
            username,
            email,
            confirmEmail,
            password,
            confirmPassword,
            gender,
            birthDate: {
                day,
                month,
                year,
            }
        };

        localStorage.setItem('userData', JSON.stringify(formData));

        // Limpiar el error (si lo había) y redirigir
        setError('');
        console.log("Datos guardados:", formData);

        // Redirigir a #/politics
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
                    <h3>Correo electrónico*</h3>
                    <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <h3>Confirma tu correo*</h3>
                    <input type="email" placeholder="Confirmar correo electrónico" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required />
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
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error si lo hay */}
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
