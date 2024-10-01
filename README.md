# Aplicación de Compra y Venta de Artesanías - Ruraqmaki

## Descripción del Proyecto

Ruraqmaki es una innovadora plataforma de comercio electrónico diseñada para conectar a talentosos artesanos de Bucaramanga con compradores apasionados por productos artesanales únicos y auténticos. Desarrollada para Campuslands, esta aplicación busca revolucionar la forma en que se promocionan y comercializan los productos locales y artesanales, aprovechando la tecnología para preservar y difundir la rica herencia cultural de la región.

## Características Principales

1. Gestión Avanzada de Usuarios
   - Registro e inicio de sesión seguros (para artesanos y compradores)
   - Perfiles de usuario personalizables con avatares
   - Listas de favoritos para artesanías y talleres
   - Historial detallado de compras y participación en talleres
   - Sistema de chat en tiempo real entre compradores y artesanos
2. Catálogo Interactivo de Productos
   - Listado dinámico y visualización inmersiva de productos artesanales
   - Sistema de cupones y descuentos personalizados
3. Búsqueda y Filtrado Inteligentes
   - Motor de búsqueda avanzado para productos y talleres
   - Filtrado multinivel por categorías, materiales, y técnicas artesanales
4. Proceso de Compra Optimizado
   - Carrito de compras intuitivo
   - Aplicación flexible de cupones y promociones
   - Integración segura con pasarelas de pago (pendiente de implementación)
5. Plataforma de Talleres Artesanales
   - Perfiles detallados de talleres con galería multimedia
   - Soporte para modalidades presenciales y virtuales
   - Gestión integral de materiales, fechas y capacidad
6. Sistema de Comunicación Multicanal
   - Mensajería directa entre usuarios
   - Chatbot inteligente para asistencia inmediata
   - Notificaciones personalizadas sobre productos, talleres y promociones

## Tecnologías Utilizadas

### Backend

- Node.js
- Express.js
- MongoDB (con Mongoose para modelado de datos)
- Passport.js (para autenticación multifactor)
- Socket.io (para funcionalidades en tiempo real)
- Express-session (para manejo seguro de sesiones)

### Frontend

- React (con hooks para manejo de estado)
- Vite (para una construcción y desarrollo rápidos)
- Axios (para comunicación HTTP con el backend)
- Socket.io-client (para conectividad en tiempo real)

### Seguridad y Almacenamiento

- HTTPS con certificados SSL personalizados
- Cloudinary (para gestión y optimización de imágenes)
- Bcrypt (para el hash seguro de contraseñas)

### Autenticación de Terceros

- Google OAuth 2.0
- Facebook Login
- Discord OAuth2

## Instalación y Configuración

1. Clonar el Repositorio

   ```bash
   git clone https://github.com/DanielEStebanChaconDiaz/expressProject
   cd expressProject
   ```

2. Instalar Dependencias

   ```bash
   npm i
   ```

3. Configurar Variables de Entorno

   Crea un archivo 

   ```
   .env
   ```

    en la raíz del proyecto con las siguientes variables:

   ```bash
   MONGODB_URI=mongodb://fabian2211882:BrubUvYfe6s1ezgA@ac-cpqs4xx-shard-00-00.rkeidbv.mongodb.net:27017,ac-cpqs4xx-shard-00-01.rkeidbv.mongodb.net:27017,ac-cpqs4xx-shard-00-02.rkeidbv.mongodb.net:27017/ruraqmaki?replicaSet=atlas-3zhe6w-shard-0&ssl=true&authSource=admin 
   EXPRESS_HOST=localhost
   EXPRESS_PORT=3000
   VITE_PORT_FRONTEND=5000
   VITE_HOST='localhost'
   GOOGLE_CLIENT_ID=242794292570-vgf4v8m51itvh303bm48vqkpld0q26og.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=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
   GOOGLE_CALLBACK_URL=https://localhost:3000/auth/google/callback
   FACEBOOK_CLIENT_ID=829548615960947
   FACEBOOK_CLIENT_SECRET=e9368faa950467df500ba685a484fd98
   FACEBOOK_CALLBACK_URL=https://localhost:3000/auth/facebook/callback
   SESSION_SECRET=mondongoconpan
   DISCORD_CLIENT_ID=1283809129856766128
   DISCORD_CLIENT_SECRET=WCR0BulzRFYnER1Qrw-LiiFODb-Ctz7W
   DISCORD_CALLBACK_URL=https://localhost:3000/auth/discord/callback
   CLOUDINARY_CLOUD_NAME=djboefzvj
   CLOUDINARY_API_KEY=399755179944178
   CLOUDINARY_API_SECRET=YXNQOCmRYB5XwuNTUaKq498c-0o
   ```

4. **Configurar Certificados SSL** Coloca tus archivos `private.key` y `certificate.crt` en el directorio `server/`.

5. Iniciar el Servidor de Desarrollo

   ```bash
   npm run start  # Inicia el servidor backend
   npm run dev    # Inicia el servidor de desarrollo frontend
   ```

## Características de Seguridad

- **HTTPS**: Toda la comunicación está encriptada usando SSL/TLS.
- **Manejo Seguro de Sesiones**: Utilizamos express-session con cookies seguras y httpOnly.
- **Autenticación Robusta**: Implementación de Passport.js para autenticación local y de terceros.
- **Protección contra CSRF**: Implementada a nivel de sesión y en formularios críticos.
- **Sanitización de Entradas**: Validación y limpieza de todas las entradas de usuario.

## Uso

Accede a la aplicación en `https://localhost:5000` para el frontend y `https://localhost:3000` para la API.

### Guía Rápida:

1. **Registro/Inicio de Sesión**: Utiliza tu correo o las opciones de redes sociales.
2. **Explora el Catálogo**: Navega por las categorías o usa la búsqueda avanzada.
3. **Participa en Talleres**: Inscríbete en talleres virtuales o presenciales.
4. **Realiza Compras**: Añade productos al carrito y completa el proceso de pago.
5. **Interactúa**: Usa el chat para comunicarte con artesanos o el soporte.

## Equipo de Desarrollo

- Camilo Esteban Concha Torres - Desarrollador Backend
- Fabian Yesid Romero Serrano - Desarrollador Backend
- Karen Yiseth Pinto Espejo - Desarrolladora Frontend
- Daniel Esteban Chacon Diaz - Desarrollador Frontend