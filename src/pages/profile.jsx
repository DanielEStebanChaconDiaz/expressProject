import '../styles/profile.css'
import Header from '../components/header'
import Footer from '../components/footer'
import editIcon from '../../public/img/edit-profile.svg';  // Imagen de edición

export default function Profile(){
    return(
        <div className='profile-container'>
            <Header/>
            <main>
        <div className="profile-page">
          <div className="profile-picture">
            <h3>Foto de perfil</h3>
            <img src="https://via.placeholder.com/100" alt="Perfil" className='foto-profile' />
            <button className="edit-button">
              <img src={editIcon} alt="Editar" className="icon-image" />
            </button>
          </div>
          
          <div className="profile-info">
            <div className="info-item">
              <label>Usuario:</label>
              <div className="info-content">
                <input type="text" value="Sara.Martin9" readOnly className='input'/>
                <img src={editIcon} alt="Editar" className="icon-image" />
              </div>
            </div>

            <div className="info-item">
              <label>Correo:</label>
              <div className="info-content">
                <input type="email" value="SMBY1996@gmail.com" readOnly className='input'/>
                <img src={editIcon} alt="Editar" className="icon-image" />
              </div>
            </div>

            <div className="info-item">
              <label>Celular:</label>
              <div className="info-content">
                <input type="tel"value="+1"className='telefono' />
                <input type="tel" placeholder="Añadir número de celular" className='input' />
                <img src={editIcon} alt="Editar" className="icon-image" />
              </div>
            </div>

            <div className="info-item">
              <label>Sexo:</label>
              <div className="info-content">
                <input type="text" value="F" readOnly className='telefono' />
                <img src={editIcon} alt="Editar" className="icon-image" />
              <label>Fecha de nacimiento:</label>
                <input type="date" value="1996-09-15" readOnly className='fecha'/>
                <img src={editIcon} alt="Editar" className="icon-image" />
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