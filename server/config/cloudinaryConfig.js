// Importación de módulos necesarios
const cloudinary = require('cloudinary').v2; // Biblioteca para interactuar con la API de Cloudinary
const multer = require('multer'); // Middleware para manejar la subida de archivos
const stream = require('stream'); // Módulo para manejar flujos de datos

// Configuración de Cloudinary con las credenciales desde variables de entorno
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Nombre del espacio en Cloudinary
  api_key: process.env.CLOUDINARY_API_KEY,       // Clave API para autenticar
  api_secret: process.env.CLOUDINARY_API_SECRET   // Secreto API para autenticar
});

// Configuración del almacenamiento en memoria para multer
const storage = multer.memoryStorage(); // Almacenamiento temporal en memoria
const upload = multer({ storage }); // Middleware de multer para manejar las subidas

/**
 * Función para subir un archivo a Cloudinary.
 * @param {Object} file - Objeto que representa el archivo a subir, debe contener un buffer.
 * @returns {Promise<Object>} - Devuelve una promesa que se resuelve con el resultado de la subida a Cloudinary.
 */
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    // Creación de un flujo de tipo PassThrough para manejar el buffer del archivo
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer); // Finaliza el flujo con el buffer del archivo

    // Subida del flujo a Cloudinary
    bufferStream.pipe(cloudinary.uploader.upload_stream({
      folder: 'profile_pictures', // Carpeta de destino en Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'], // Formatos de archivo permitidos
      transformation: [{ width: 500, height: 500, crop: 'limit' }] // Transformaciones a aplicar a la imagen
    }, (error, result) => {
      if (error) {
        // Si ocurre un error, se rechaza la promesa
        return reject(error);
      }
      // Si la subida es exitosa, se resuelve la promesa con el resultado
      resolve(result);
    }));
  });
};

// Exportación de los módulos necesarios para su uso en otras partes de la aplicación
module.exports = { cloudinary, upload, uploadToCloudinary };
