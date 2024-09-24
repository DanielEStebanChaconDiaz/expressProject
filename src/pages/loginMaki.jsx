import Maki from "../components/loginMaki.jsx";
import { useEffect, useRef } from 'react';

export default function MakiLogin() {
  const registerFormContainerRef = useRef(null);

  useEffect(() => {
    const handleAnimationEnd = () => {
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
    <div className="background-maki">
      <div ref={registerFormContainerRef} className="login-form-maki">
        <Maki />
      </div>
    </div>
  );
}
