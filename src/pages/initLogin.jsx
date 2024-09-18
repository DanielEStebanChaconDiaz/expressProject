import Login from "./login";
import '../styles/login.css';
import { useEffect, useRef } from 'react';

export default function InitLogin() {
  const registerFormContainerRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleAnimationEnd = () => {
      if (backgroundRef.current) {
        backgroundRef.current.style.backgroundImage = "url('/img/familiafondo.svg')";
      }
      setTimeout(() => {
        if (registerFormContainerRef.current) {
          registerFormContainerRef.current.classList.add('slide-in');
        }
      }, 100);
    };

    handleAnimationEnd();

    return () => {
      // No es necesario eliminar event listeners ya que no los estamos usando aquí
    };
  }, []);

  return (
    <div ref={backgroundRef} className="background">
      <div ref={registerFormContainerRef} className="register-form-container">
        <Login />
      </div>
    </div>
  );
}
