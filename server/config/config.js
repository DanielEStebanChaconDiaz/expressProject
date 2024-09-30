// Importación del módulo mongoose para interactuar con MongoDB
const mongoose = require('mongoose');

/**
 * Función asíncrona para conectar a la base de datos MongoDB.
 * Utiliza las credenciales y la URI proporcionadas en las variables de entorno.
 * @returns {Promise<void>} - Devuelve una promesa que se resuelve cuando la conexión se establece con éxito.
 */
const connectDB = async () => {
  try {
    // Establece la conexión a MongoDB utilizando la URI de la variable de entorno
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, // Utiliza el nuevo parser de URL
      useUnifiedTopology: true // Usa la nueva topología de conexión de MongoDB
    });
    console.log('MongoDB connected successfully'); // Mensaje de éxito en la conexión
  } catch (err) {
    // Si ocurre un error durante la conexión, se captura y se imprime en la consola
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Finaliza el proceso con un código de error
  }
};

// Exportación de la función connectDB para su uso en otras partes de la aplicación
module.exports = connectDB;
