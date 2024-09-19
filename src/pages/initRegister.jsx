import '../styles/register.css';
import { useEffect, useRef } from 'react';
import Register from "./register";

export default function InitRegister() {
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

    };
  }, []);

  return (
    <div ref={backgroundRef} className="background">
      <div ref={registerFormContainerRef} className="register-form-container">
        <Register />
      </div>
    </div>
  );
}
