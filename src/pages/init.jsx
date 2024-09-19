import { useEffect, useRef } from 'react';
import '../styles/register.css';
import {useNavigate } from 'react-router-dom';
export default function Init() {
  const animatedTextRef = useRef(null);
  const backgroundRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAnimationEnd = () => {
      setTimeout(() => {
        navigate('/register');
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
    </div>
  );
}
