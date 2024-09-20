import Maki from "../components/loginMaki.jsx";
// import '../styles/registerNumber.css'
import { useEffect, useRef } from 'react';

export default function MakiLogin() {
  const registerFormContainerRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleAnimationEnd = () => {
      if (backgroundRef.current) {
        backgroundRef.current.style.backgroundImage = "url('/img/fondoEmail.svg')";
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
    <div ref={backgroundRef} className="background-email">
      <div ref={registerFormContainerRef} className="register-form-email">
        <Maki />
      </div>
    </div>
  );
}
