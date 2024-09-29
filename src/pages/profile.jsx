import '../styles/profile.css'
import Header from '../components/header'
import Footer from '../components/footer'
import editIcon from '../../public/img/edit-profile.svg';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Profile() {
  const [usuario, setUsuario] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const defaultProfilePic = 'https://res.cloudinary.com/tu-cloud-name/image/upload/v1234567890/default-profile.png'; // Asegúrate de reemplazar esto con tu URL real de Cloudinary

  useEffect(() => {
    const obtenerUsuarioLogueado = async () => {
      try {
        const response = await axios.get('https://localhost:3000/api/usuarios/me', {
          withCredentials: true
        });
        const usuarioData = response.data;
        console.log('Datos del usuario recibidos:', usuarioData);
        if (!usuarioData || !usuarioData._id) {
          throw new Error('La respuesta del servidor no incluye el ID del usuario');
        }
        setUsuario(usuarioData);
      } catch (error) {
        console.error('Error al obtener el usuario logueado:', error);
        setError('No se pudo cargar la información del usuario. Por favor, inicie sesión nuevamente.');
      } finally {
        setLoading(false);
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

  const handleBlur = async (field) => {
    setEditMode(prev => ({ ...prev, [field]: false }));
    if (usuario && usuario._id) {
      try {
        await axios.put(`https://localhost:3000/api/usuarios/${usuario._id}`, { [field]: usuario[field] }, {
          withCredentials: true
        });
        console.log(`Campo ${field} actualizado con éxito`);
      } catch (error) {
        console.error(`Error al actualizar el campo ${field}:`, error);
        setError(`No se pudo actualizar ${field}. Por favor, intente nuevamente.`);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error('No se seleccionó ningún archivo');
      return;
    }
    if (!usuario || !usuario._id) {
      console.error('No se pudo obtener el ID del usuario');
      setError('No se pudo identificar al usuario. Por favor, inicie sesión nuevamente.');
      return;
    }

    const formData = new FormData();
    formData.append('fotoPerfil', file);

    try {
      const response = await axios.post(`https://localhost:3000/api/usuarios/${usuario._id}/foto-perfil`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (response.data && response.data.fotoPerfil) {
        // Verificar que la URL de Cloudinary sea válida
        if (isValidCloudinaryUrl(response.data.fotoPerfil)) {
          setUsuario(prev => ({ ...prev, fotoPerfil: response.data.fotoPerfil }));
          console.log('Foto de perfil actualizada con éxito');
        } else {
          throw new Error('La URL de la foto de perfil no es válida');
        }
      } else {
        throw new Error('La respuesta del servidor no contiene la URL de la foto de perfil');
      }
    } catch (error) {
      console.error('Error al actualizar la foto de perfil:', error);
      setError('No se pudo actualizar la foto de perfil. Por favor, intente nuevamente.');
    }
  };

  const isValidCloudinaryUrl = (url) => {
    // Verifica que la URL sea una URL válida de Cloudinary
    const cloudinaryPattern = /^https:\/\/res\.cloudinary\.com\/.*\/image\/upload\/.+/;
    return cloudinaryPattern.test(url);
  };

  const getProfilePicUrl = () => {
    if (usuario && usuario.fotoPerfil && isValidCloudinaryUrl(usuario.fotoPerfil)) {
      return usuario.fotoPerfil;
    }
    return defaultProfilePic;
  };

  if (loading) {
    return <div>Cargando información del usuario...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!usuario || !usuario._id) {
    return <div>No se pudo cargar la información del usuario. Por favor, inicie sesión.</div>;
  }

  return (
    <div className='profile-container'>
      <Header/>
      <main>
        <div className="profile-page">
          <div className="profile-picture">
            <h3>Foto de perfil</h3>
            <img 
              src={getProfilePicUrl()}
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
                  value={usuario.nombreUsuario || ''}
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
                  value={usuario.correoElectronico || ''}
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
                  placeholder="Agregar su numero de telefono"
                  value={usuario.celular || ''}
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
                  value={usuario.sexo || ''}
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
              </div>
            </div>

            <div className="info-item">
              <label>Fecha de nacimiento:</label>
              <div className="info-content">
                <input 
                  type="date" 
                  value={usuario.fechaNacimiento ? new Date(usuario.fechaNacimiento).toISOString().split('T')[0] : ''}
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
  );
}