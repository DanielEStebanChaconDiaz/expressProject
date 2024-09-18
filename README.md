### **Aplicación de Compra y Venta de Artesanías**

### **Descripción del Proyecto**

El proyecto consiste en el desarrollo de una **Aplicación de Compra y Venta de Artesanías**. Esta aplicación tiene como objetivo conectar a artesanos de **Bucaramanga** con compradores interesados en productos artesanales únicos y auténticos. La plataforma será solicitada y gestionada por **Campuslands**, una empresa comprometida con la promoción y comercialización de productos locales, artesanales y tecnológicos.

**Problema:**

A pesar de la rica tradición artesanal en Bucaramanga, los artesanos locales enfrentan dificultades significativas para comercializar sus productos de manera efectiva. Entre los principales problemas se encuentran:

1. **Limitada Visibilidad y Alcance**: Los artesanos suelen operar en mercados locales limitados y tienen pocas oportunidades para exponer sus productos a un público más amplio. La falta de visibilidad impide que sus artesanías lleguen a compradores fuera de su área geográfica inmediata.
2. **Dificultades en la Gestión de Ventas**: La venta de artesanías a menudo requiere una gestión compleja de inventarios, precios y pedidos. Los artesanos a menudo carecen de las herramientas necesarias para manejar estas tareas de manera eficiente, lo que puede llevar a errores en el stock y pérdidas de ventas.
3. **Falta de Acceso a Recursos de Comercialización**: Los artesanos no siempre tienen acceso a recursos o plataformas que les permitan promocionar sus productos adecuadamente. Esto incluye la falta de una presencia en línea efectiva y la incapacidad de ofrecer descuentos o promociones a sus clientes.
4. **Comunicación Ineficiente con Compradores**: Los compradores interesados en artesanías a menudo encuentran difícil comunicarse directamente con los artesanos para obtener información adicional o resolver dudas sobre los productos. Esto puede llevar a una experiencia de compra frustrante y a la pérdida de ventas potenciales.

### **Características Principales**

1. **Gestión de Usuarios**
- **Registro e Inicio de Sesión**: Los usuarios (artesanos y compradores) pueden registrarse y acceder a sus cuentas.
   
- **Perfiles de Usuario (Compradores):**
   - **Actualización de Información**: Los compradores pueden actualizar su información personal, como nombre, dirección, y correo electrónico.
  
   - **Actualización de Foto de Perfil**: Los compradores pueden cambiar su foto de perfil.
  
   - Lista de Favoritos:
  
     - **Favoritos de Artesanías**: Los compradores pueden marcar productos artesanales como favoritos y ver una lista de estos productos en su perfil.
    - **Favoritos de Talleres**: Los compradores pueden marcar talleres como favoritos y ver una lista de estos talleres en su perfil.
     
  - **Historial de Compras**: Los compradores pueden revisar su historial de compras, incluyendo detalles de cada pedido.
   
  - **Talleres Inscritos**: Los compradores pueden ver los talleres en los que están inscritos.
     
   - **Lista de Cupones**: Los compradores pueden ver y gestionar los cupones que tienen disponibles para canjear.
  
   - **Chat con Artesanos**: Los compradores pueden iniciar y mantener un chat con artesanos relacionados con los talleres a los que están inscritos, facilitando la comunicación sobre productos y talleres.

2. **Gestión de Productos**

   - **Listado de Productos**: La información de los productos será cargada manualmente en la base de datos por el administrador del sistema. Cada producto incluye nombre, descripción, precio, categoría, fotos y stock disponible.
   - **Visualización de Productos**: Los compradores pueden ver los productos listados con detalles y fotos.
   - **Cupones de Descuento**: Los artesanos pueden crear cupones que ofrecen descuentos para los productos.

3. **Búsqueda y Filtrado**

   - **Búsqueda de Productos**: Permite buscar productos por nombre o descripción.

   - **Filtrado de Productos:**
     - **Por Categorías**: Filtra productos por categorías definidas (por ejemplo, cerámica, textiles, joyería).
     
   - **Filtrado de Talleres**: Permite buscar y filtrar talleres artesanales por ubicación, tipo de artesanía, modalidad, y otros criterios relevantes.
   
4. **Carrito y Proceso de Compra**

   - **Carrito de Compras**: Los compradores pueden añadir productos al carrito y revisar los detalles antes de proceder al pago.

   - **Aplicación de Cupones:**
   - **Cupones Asignados**: Los compradores pueden ingresar códigos de cupones que han sido asignados a su perfil (por ejemplo, cupones promocionales específicos para ellos).
     - **Cupones Generales**: También pueden ingresar códigos de cupones generales disponibles para todos los compradores (por ejemplo, cupones para descuentos en talleres).

   - **Proceso de Pago**: Integración opcional con una pasarela de pago para completar las transacciones de forma segura.
   
5. **Comunicación**
   - **Mensajes Directos**: Los compradores y artesanos pueden intercambiar mensajes para resolver dudas o discutir detalles sobre los productos.
   
6. **Talleres Artesanales**

   - **Perfil de Talleres:**
     - **Modalidades:** Los talleres pueden ser presenciales o virtuales. La información específica de cada modalidad se detallará, incluyendo:
     - **Modalidad Presencial**: Información sobre la ubicación, fecha y hora, y requisitos para asistir en persona.
       - **Modalidad Virtual**: Enlace para la participación en línea, plataforma utilizada, y requisitos tecnológicos.
     
     - **Fechas:**
     - **Fecha de Inicio y Fin**: Las fechas en las que el taller comenzará y terminará.
       - **Duración**: La duración total del taller (por ejemplo, número de sesiones o duración en horas).
     
     - **Materiales:**
     - **Materiales Proporcionados**: Lista de materiales que el taller proporcionará a los participantes.
       - **Materiales Necesarios**: Lista de materiales que los participantes deberán traer o tener disponibles para el taller.

     - **Documental sobre Talleres**: Ofrece un enlace o integración para ver un documental que muestre el proceso artesanal, la historia del taller, o entrevistas con los artesanos.

### **Estructura de Datos**

- Usuarios
  - `_id` (ObjectId) - Identificador único del usuario.
  - `nombre` (String) - Nombre del usuario.
  - `correo` (String) - Correo electrónico del usuario (único).
  - `contraseña` (String) - Contraseña del usuario (hash).
  - `fotoPerfil` (String) - URL de la foto de perfil del usuario.
  - `direccion` (String) - Dirección del usuario.
  - `telefono` (String) - Número de teléfono del usuario.
  - `tipo` (String) - Tipo de usuario (comprador, artesano).
  - `favoritos` (Array de ObjectIds) - Lista de productos y talleres favoritos (referencias a `Productos` y `Talleres`).
  - `compras` (Array de ObjectIds) - Lista de identificadores de compras realizadas (referencias a `Pedidos`).
  - `talleresInscritos` (Array de ObjectIds) - Lista de identificadores de talleres en los que está inscrito (referencias a `Talleres`).
  - `cupones` (Array de ObjectIds) - Lista de cupones asignados al perfil del usuario (referencias a `Cupones`).

- Productos
  - `_id` (ObjectId) - Identificador único del producto.
  - `nombre` (String) - Nombre del producto.
  - `descripcion` (String) - Descripción del producto.
  - `precio` (Decimal) - Precio del producto.
  - `categoria` (String) - Categoría del producto.
  - `fotos` (Array de Strings) - URLs de las fotos del producto.
  - `stock` (Integer) - Cantidad disponible del producto.
  - `artesanoId` (ObjectId) - Identificador del artesano que vende el producto (referencia a `Usuarios`).

- Pedidos

  - `_id` (ObjectId) - Identificador único del pedido.

  - `usuarioId` (ObjectId) - Identificador del usuario que realizó el pedido (referencia a `Usuarios`).

  - `productos` (Array de Objetos) - Lista de productos en el pedido.
  - `productoId` (ObjectId) - Identificador del producto (referencia a `Productos`).
     - `cantidad` (Integer) - Cantidad del producto.
  - `precio` (Decimal) - Precio del producto al momento de la compra.
    
  - `total` (Decimal) - Total del pedido.
  
- `fecha` (Date) - Fecha del pedido.
  
- `estado` (String) - Estado del pedido (pendiente, enviado, entregado).

- Talleres
  - `_id` (ObjectId) - Identificador único del taller.
  - `nombre` (String) - Nombre del taller.
  - `descripcion` (String) - Descripción del taller.
  - `modalidad` (String) - Modalidad del taller (presencial, virtual).
  - `fechaInicio` (Date) - Fecha de inicio del taller.
  - `fechaFin` (Date) - Fecha de fin del taller.
  - `duracion` (String) - Duración del taller.
  - `materialesProporcionados` (Array de Strings) - Materiales que el taller proporciona.
  - `materialesRequeridos` (Array de Strings) - Materiales que los participantes deben traer.
  - `documental` (String) - URL del documental sobre el taller (opcional).
  - `artesanoId` (ObjectId) - Identificador del artesano que organiza el taller (referencia a `Usuarios`).

- Cupones
  - `_id` (ObjectId) - Identificador único del cupón.
  - `codigo` (String) - Código del cupón.
  - `descuento` (Decimal) - Valor del descuento del cupón.
  - `tipo` (String) - Tipo de cupón (general, asignado a usuario).
  - `fechaExpiracion` (Date) - Fecha de expiración del cupón.
  - `usuarioId` (ObjectId) - Identificador del usuario al que está asignado el cupón (opcional, referencia a `Usuarios`).

- Mensajes
  - `_id` (ObjectId) - Identificador único del mensaje.
  - `remitenteId` (ObjectId) - Identificador del usuario que envió el mensaje (referencia a `Usuarios`).
  - `receptorId` (ObjectId) - Identificador del usuario que recibe el mensaje (referencia a `Usuarios`).
  - `contenido` (String) - Contenido del mensaje.
  - `fecha` (Date) - Fecha y hora del mensaje.
  - 

### **Tecnologías y Herramientas**

- **Backend**: Express.js para manejar las rutas y la lógica del servidor.

- **Base de Datos**: MongoDB para almacenar datos de usuarios, productos, pedidos, talleres, cupones y mensajes.

- Frontend:

  - **Opcional**: Frameworks como React.js, Vue.js, o Angular para construir la interfaz de usuario.
  - **Alternativa**: HTML, CSS y JavaScript puro si se prefiere una implementación más sencilla.
  
- Autenticación:

  - **Passport.js**: Se utilizará `Passport.js` para la autenticación de usuarios mediante Facebook, Discord, y Google. Se implementará la lógica necesaria para manejar las sesiones de autenticación social.
  - **JSON Web Tokens (JWT)**: Para el registro manual de usuarios, se generarán tokens JWT utilizando `jsonwebtoken`. Estos tokens se almacenarán en la base de datos MongoDB para permitir la autenticación y autorización de usuarios.
  - **express-session**: Se utilizará `express-session` para gestionar la sesión del usuario, estableciendo un tiempo de expiración para las sesiones. Cada vista deberá verificar si la sesión sigue activa; de lo contrario, el usuario será redirigido a la vista de inicio de sesión.
  
- **Pagos**: Integración opcional con una pasarela de pago como Stripe o PayPal para manejar transacciones de forma segura.

- **Almacenamiento de Archivos**: Opcionalmente, usar AWS S3, Cloudinary o similar para almacenar y servir imágenes de productos; puede ser reemplazado por almacenamiento local si se prefiere.

- **Documental**: YouTube, Vimeo o cualquier plataforma de video para alojar los documentales, con integración mediante enlaces o reproductores embebidos.

### **Pasos para Implementar el Proyecto**

1. **Configuración del Entorno**
   - Configura un nuevo proyecto de Express y MongoDB.
   - Establece el esquema de la base de datos y crea modelos para usuarios, productos, pedidos, talleres, cupones y mensajes.
2. **Desarrollo del Backend**
   - Implementa las rutas y controladores para gestionar usuarios, productos, pedidos, talleres, cupones y mensajes.
   - Configura la autenticación de usuarios utilizando `Passport.js` para la autenticación social (Facebook, Discord, Google) y `jsonwebtoken` para generar tokens JWT para el registro manual. Implementa `express-session` para gestionar las sesiones y asegurar que cada vista verifique la validez de la sesión.
   - Implementa la lógica para la creación, aplicación y validación de cupones en el carrito y el proceso de pago.
   - Implementa la lógica para el filtrado de productos por categorías.
   - Implementa la integración con la pasarela de pago (opcional).
3. **Desarrollo del Frontend**
   - Diseña la interfaz de usuario utilizando los diseños proporcionados en el [archivo de Figma](https://www.figma.com/community/file/1268395877483237972).
   - Crea páginas para la visualización de productos, perfiles de usuario (compradores), carrito de compras, proceso de pago, perfil de talleres y aplicación de cupones.
   - Implementa funcionalidades para ingresar y aplicar cupones en el carrito de compras.
   - Implementa filtros para productos por categoría.
   - Implementa funcionalidades de búsqueda y visualización de documentales.
   - Implementa la lista de favoritos para artesanías y talleres.
   - Integra con el backend para mostrar datos dinámicos y manejar interacciones del usuario.
4. **Integración de Funcionalidades**
   - Integra el almacenamiento de imágenes para productos (opcional).
   - Configura el sistema de mensajería para la comunicación entre compradores y artesanos.
   - Implementa el perfil de talleres con detalles sobre modalidades, fechas, duración y materiales.
   - Implementa la funcionalidad para crear, gestionar y canjear cupones.
   - Implementa la lista de favoritos para artesanías y talleres.
5. **Pruebas y Despliegue**
   - Realiza pruebas funcionales y de integración para asegurar que todas las funcionalidades trabajan como se espera.
   - Despliega la aplicación en un servidor o en la nube (como Heroku, AWS, o DigitalOcean) si se desea. (Opcional)
6. **Mantenimiento y Mejoras**
   - Monitorea el rendimiento de la aplicación y recopila retroalimentación de los usuarios.
   - Realiza actualizaciones y mejoras continuas basadas en la retroalimentación y en las necesidades cambiantes.

### **Posibles Mejoras Futuras**

- **Integración con Redes Sociales**: Permitir compartir productos y documentales en plataformas sociales.
- **Sistema de Recompensas**: Implementar un sistema de recompensas o fidelización para compradores frecuentes.
- **Promociones y Ofertas Especiales**: Implementar promociones temporales y ofertas especiales adicionales.



### **Rúbrica Evaluativa para la Aplicación de Compra y Venta de Artesanías**

#### **1. Funcionalidad del Backend (30%)**

- **0**: No se ha implementado ninguna funcionalidad del backend.

- **25**: Implementación básica del backend; algunas funcionalidades están incompletas o no funcionan como se esperaba.

- **50**: Funcionalidades del backend implementadas en su mayoría, pero con errores o faltantes que afectan la experiencia del usuario.

- **75**: Funcionalidades del backend están completas y funcionan bien, pero puede haber algunos detalles menores que necesitan ajustes.

- **100:** El backend está completamente implementado y funciona sin errores. Todos los requisitos funcionales están cumplidos, incluyendo:
  - **Gestión de usuarios**: Registro, autenticación, perfiles.
  - **Gestión de productos**: Listado, filtrado, búsqueda.
  - **Gestión de pedidos**: Creación y seguimiento.
  - **Gestión de talleres**: Modalidades, fechas, duración, materiales.
  - **Gestión de cupones**: Creación, aplicación, validación.

#### **2. Desarrollo del Frontend (25%)**

- **0**: No se ha desarrollado el frontend.

- **25**: Desarrollo frontend básico; la interfaz es funcional pero tiene muchos problemas de usabilidad y diseño.

- **50**: El frontend está desarrollado y la interfaz es funcional, pero hay problemas significativos de usabilidad o diseño.

- **75**: El frontend está bien desarrollado con una interfaz funcional y en su mayoría amigable, pero podría mejorarse en algunos aspectos.

- **100:** El frontend está completamente desarrollado con una interfaz de usuario atractiva, funcional y amigable, siguiendo los diseños proporcionados. Incluye:
  - **Páginas de productos**: Visualización y detalles.
  - **Perfil de usuario**: Información, favoritos, historial de compras.
  - **Carrito de compras**: Funcionalidad completa, aplicación de cupones.
  - **Perfil de talleres**: Detalles sobre talleres, modalidades, materiales.
  - **Filtros y búsqueda**: Implementación efectiva y fácil de usar.

#### **3. Integración de Funcionalidades (20%)**

- **0**: No se ha integrado ninguna funcionalidad adicional.

- **25**: Algunas funcionalidades adicionales están integradas, pero con fallos o falta de cohesión.

- **50**: Las funcionalidades adicionales están integradas y funcionan mayormente, pero hay problemas de integración menores.

- **75**: Las funcionalidades adicionales están bien integradas y funcionan correctamente, aunque pueden haber detalles menores a mejorar.

- **100:** Todas las funcionalidades adicionales están completamente integradas y funcionan sin errores. Incluye:
  - **Aplicación de cupones**: Asignados a perfiles, cupones generales.
  - **Mensajes directos**: Comunicación entre compradores y artesanos.
  - **Lista de favoritos**: Artesanías y talleres.
  - **Documentales sobre talleres**: Integración y visualización.

#### **4. Pruebas y Despliegue (15%)**

- **0**: No se han realizado pruebas ni se ha desplegado la aplicación.

- **25**: Se han realizado algunas pruebas básicas, pero la aplicación tiene errores importantes y no se ha desplegado.

- **50**: La aplicación ha pasado pruebas funcionales básicas y ha sido desplegada, pero con errores menores que afectan la experiencia.

- **75**: La aplicación ha sido bien probada y desplegada, con pocos errores menores.

- **100:** La aplicación ha sido exhaustivamente probada y desplegada correctamente. Todos los errores han sido solucionados y el rendimiento es óptimo. Incluye:
- **Pruebas funcionales**: Validación de todas las funcionalidades.
  - **Pruebas de integración**: Verificación de la interacción entre módulos.
- **Despliegue**: Opcional, pero realizado en un entorno de servidor o nube.

#### **5. Documentación y Presentación (10%)**

- **0**: No se ha proporcionado documentación ni presentación.

- **25**: Documentación y presentación mínimas; falta información importante o no está bien organizada.

- **50**: Documentación y presentación adecuadas, pero pueden mejorar en detalle o claridad.

- **75**: Documentación y presentación bien hechas, con información clara y organizada.

- **100:** Documentación completa y presentación profesional, con toda la información necesaria y bien organizada. Incluye:
- **Documentación técnica**: Detalles del código, arquitectura, configuración.
  - **Manual de usuario**: Guía para usuarios finales.
- **Presentación**: Claridad y profesionalismo en la exposición del proyecto.

#### **6. Innovación y Mejora Continua (10%)**

- **0**: No se ha mostrado innovación o esfuerzo en la mejora continua.

- **25**: Algunas ideas innovadoras o mejoras están presentes, pero son limitadas o poco desarrolladas.

- **50**: Se han implementado ideas innovadoras y mejoras, pero de forma parcial o no completamente efectiva.

- **75**: Ideas innovadoras y mejoras están bien implementadas y aportan valor significativo al proyecto.

- **100:** El proyecto demuestra una gran innovación y mejora continua, aportando soluciones creativas y eficientes que mejoran significativamente la experiencia del usuario. Incluye:
  - **Innovaciones tecnológicas**: Nuevas tecnologías o enfoques utilizados.
  - **Mejoras en la experiencia del usuario**: Mejoras basadas en retroalimentación.