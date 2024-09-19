import '../styles/politics.css';
import { useEffect, useRef } from 'react';
import Politics from "../components/politics";

export default function InitRegister() {
  const registerFormContainerRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleAnimationEnd = () => {
      if (backgroundRef.current) {
        backgroundRef.current.style.backgroundImage = "url('/img/fondoPolitics.svg')";
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
    <div ref={backgroundRef} className="background-politics">
      <div ref={registerFormContainerRef} className="form-Politics">
        <Politics />
      </div>
    </div>
  );
}
