import React, { useState } from 'react';
import '../styles/settings.css';
import Flecha from '../components/flecha-back';
import { Switch } from '../components/switch';
import Rombo from '../components/header-rombo';
import FondoFlecha from '../components/fondo-flecha';

export default function Settings() {
  const [notificationSettings, setNotificationSettings] = useState({
    purchases: false,
    discounts: false,
    workshops: false,
    sound: false,
  });

  const handleToggle = (setting) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  return (
    <div className='settings-container'>
            <FondoFlecha/>
            <Flecha/>
            <Rombo/>
      <h4>Global</h4>
      <section className="settings-section">
        <div className="settings-item">
          <span>Cambiar país y región</span>
          <span className="settings-value">Canadá, Toronto</span>
        </div>
        <div className="settings-item">
          <span>Cambiar idioma</span>
          <span className="settings-value">Español</span>
        </div>
        <div className="settings-item">
          <span>Cambiar moneda</span>
          <span className="settings-value">PEN</span>
        </div>
      </section>

      <h4>Notificaciones</h4>
      <section className="settings-section">
        <div className="settings-toggle">
          <span>Mostrar notificaciones de compras</span>
          <Switch
            checked={notificationSettings.purchases}
            onCheckedChange={() => handleToggle('purchases')}
          />
        </div>
        <div className="settings-toggle">
          <span>Mostrar notificaciones de descuentos</span>
          <Switch
            checked={notificationSettings.discounts}
            onCheckedChange={() => handleToggle('discounts')}
          />
        </div>
        <div className="settings-toggle">
          <span>Mostrar notificaciones de talleres</span>
          <Switch
            checked={notificationSettings.workshops}
            onCheckedChange={() => handleToggle('workshops')}
          />
        </div>
        <div className="settings-toggle">
          <span>Sonido de notificaciones</span>
          <Switch
            checked={notificationSettings.sound}
            onCheckedChange={() => handleToggle('sound')}
          />
        </div>
      </section>

      <h4>Legal</h4>
      <section className="settings-section">
        <ul className="settings-legal-list">
          <li>Política de privacidad</li>
          <li>Información legal</li>
          <li>Libro de reclamaciones</li>
        </ul>
      </section>
    </div>
  );
}