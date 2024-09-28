import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import '../styles/chat.css';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);
    const [connectionError, setConnectionError] = useState(false);

    useEffect(() => {
        const newSocket = io('https://localhost:3000', {
            withCredentials: true,
            transports: ['websocket']
        });

        newSocket.on('connect', () => {
            console.log('Conectado al servidor');
            setConnectionError(false);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Error de conexión:', error);
            setConnectionError(true);
        });

        newSocket.on('chat message', ({ text, userId }) => {
            const messageClass = userId === 'admin' ? 'workshop-random-message' : 'user-random-message';
            const messageObj = { text, class: messageClass };

            setMessages((prevMessages) => [...prevMessages, messageObj]);
        });

        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input && socket) {
            socket.emit('chat message', input);
            setInput('');
        }
    };

    if (connectionError) {
        return <div>Error de conexión con el servidor. Por favor, intenta de nuevo más tarde.</div>;
    }

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    };

    return (
        <div className="random-container">
            <header className="random-header">
                <div className="back-button-chat">
                    <i className="bx bx-arrow-back hola" onClick={handleClick}></i>
                    <img src="../../public/img/flecha-craft.svg" alt="" className='flecha-chat' />
                </div>
                <div className='random-header-chat'>
                    <img src="../../public/img/icon-chat.svg" alt="" />
                    <h4>Chat con Taller Awaq Ayllus</h4>
                </div>
            </header>

            <main className="random-main">
                {messages.map((msg, index) => (
                    <div key={index} className={`random-message ${msg.class}`}>
                        {msg.text}
                        <div className={`triangle ${msg.class === 'user-random-message' ? 'triangle-user' : 'triangle-workshop'}`}></div>
                    </div>
                ))}
            </main>

            <footer className="random-footer">
                <form className="random-input-container" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Mandar mensaje a Taller Awaq Ayllus"
                        className="random-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button className="random-send-button" type="submit">
                        <img src="../../public/img/arrowRight.svg" alt="" />
                    </button>
                </form>
            </footer>
        </div>
    );
}
