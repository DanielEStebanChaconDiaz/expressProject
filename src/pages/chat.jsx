import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

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

        newSocket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input && socket) {
            socket.emit('chat message', 'Usuario: ' + input);
            setInput('');
        }
    };

    if (connectionError) {
        return <div>Error de conexión con el servidor. Por favor, intenta de nuevo más tarde.</div>;
    }

    return (
        <div className="chat-container">
            <h1>Chat en Vivo</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}