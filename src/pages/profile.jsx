import '../styles/profile.css'
import Header from '../components/header'
import Footer from '../components/footer'
import editIcon from '../../public/img/edit-profile.svg';  // Imagen de edición
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Profile(){
  const [usuario, setUsuario] = useState(null);
  const [editMode, setEditMode] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    const obtenerUsuarioLogueado = async () => {
      try {
        const response = await axios.get('https://localhost:3000/api/usuarios/me', {
          withCredentials: true
        });
        const usuarioData = response.data;
        setUsuario(usuarioData);
        console.log('Usuario logueado:', usuarioData);
      } catch (error) {
        console.error('Error al obtener el usuario logueado:', error);
      }
    };
    obtenerUsuarioLogueado();
  }, []);

  const handleEdit = (field) => {
    setEditMode(prev => ({ ...prev, [field]: true }));
  };

  const handleChange = (field, value) => {
    setUsuario(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setEditMode(prev => ({ ...prev, [field]: false }));
    // Aquí deberías enviar una solicitud al servidor para actualizar los datos
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUsuario(prev => ({ ...prev, fotoPerfil: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return(
    <div className='profile-container'>
      <Header/>
      <main>
        <div className="profile-page">
          <div className="profile-picture">
            <h3>Foto de perfil</h3>
            <img 
              src={usuario && usuario.fotoPerfil ? usuario.fotoPerfil : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} 
              alt="Perfil" 
              className='foto-profile' 
              onClick={handleImageClick}
            />
            <button className="edit-button" onClick={handleImageClick}>
              <img src={editIcon} alt="Editar" className="icon-image" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
          </div>
          
          <div className="profile-info">
            <div className="info-item">
              <label>Usuario:</label>
              <div className="info-content">
                <input 
                  type="text" 
                  value={usuario && usuario.nombreUsuario} 
                  readOnly={!editMode.nombreUsuario}
                  onChange={(e) => handleChange('nombreUsuario', e.target.value)}
                  onBlur={() => handleBlur('nombreUsuario')}
                  className='input'
                />
                <img 
                  src={editIcon} 
                  alt="Editar" 
                  className="icon-image" 
                  onClick={() => handleEdit('nombreUsuario')}
                />
              </div>
            </div>

            <div className="info-item">
              <label>Correo:</label>
              <div className="info-content">
                <input 
                  type="email" 
                  value={usuario && usuario.correoElectronico ? usuario.correoElectronico : ''} 
                  readOnly={!editMode.correoElectronico}
                  onChange={(e) => handleChange('correoElectronico', e.target.value)}
                  onBlur={() => handleBlur('correoElectronico')}
                  className='input'
                />
                <img 
                  src={editIcon} 
                  alt="Editar" 
                  className="icon-image" 
                  onClick={() => handleEdit('correoElectronico')}
                />
              </div>
            </div>

            <div className="info-item">
              <label>Celular:</label>
              <div className="info-content">
                <input type="tel" value="+1" className='telefono' readOnly />
                <input 
                  type="tel" 
                  placeholder={usuario && usuario.celular ? usuario.celular : 'Agregar su numero de telefono'} 
                  value={usuario && usuario.celular ? usuario.celular : ''}
                  readOnly={!editMode.celular}
                  onChange={(e) => handleChange('celular', e.target.value)}
                  onBlur={() => handleBlur('celular')}
                  className='input' 
                />
                <img 
                  src={editIcon} 
                  alt="Editar" 
                  className="icon-image" 
                  onClick={() => handleEdit('celular')}
                />
              </div>
            </div>

            <div className="info-item">
              <label>Sexo:</label>
              <div className="info-content">
                <input 
                  type="text" 
                  value={usuario && usuario.sexo ? usuario.sexo : ''} 
                  readOnly={!editMode.sexo}
                  onChange={(e) => handleChange('sexo', e.target.value)}
                  onBlur={() => handleBlur('sexo')}
                  className='telefono' 
                />
                <img 
                  src={editIcon} 
                  alt="Editar" 
                  className="icon-image" 
                  onClick={() => handleEdit('sexo')}
                />
              <label>Fecha de nacimiento:</label>
                <input 
                  type="date" 
                  value={usuario && usuario.fechaNacimiento ? usuario.fechaNacimiento : ''} 
                  readOnly={!editMode.fechaNacimiento}
                  onChange={(e) => handleChange('fechaNacimiento', e.target.value)}
                  onBlur={() => handleBlur('fechaNacimiento')}
                  className='fecha'
                />
                <img 
                  src={editIcon} 
                  alt="Editar" 
                  className="icon-image" 
                  onClick={() => handleEdit('fechaNacimiento')}
                />
              </div>
            </div>
          </div>

          <div className="payment-methods">
            <h3>Métodos de pago</h3>
            <div className="payment-method">Visa Mastercard</div>
            <button className="add-payment-button">Añadir método de pago</button>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  )
}