import { useEffect, useRef } from 'react';
import '../styles/register.css';
import Register from './register';

export default function Init() {
  const animatedTextRef = useRef(null);
  const registerFormContainerRef = useRef(null);
  const backgroundRef = useRef(null);
  const overlayRef = useRef(null);

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

    const animatedTextElement = animatedTextRef.current;
    if (animatedTextElement) {
      animatedTextElement.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (animatedTextElement) {
        animatedTextElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, []);

  return (
    <div ref={backgroundRef} className="background">
      <div ref={overlayRef} className="overlay">
        {/* Puedes cambiar "img" por otro elemento si es necesario */}
        <img 
          ref={animatedTextRef}
          src="/img/ruraqmaki.png" 
          alt="Animated Text" 
          className="animated-text" 
        />
      </div>
      <div ref={registerFormContainerRef} className="register-form-container">
        <Register />
      </div>
    </div>
  );
}
