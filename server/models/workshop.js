const mongoose = require('mongoose');

// Definición del esquema para los talleres
const TallerSchema = new mongoose.Schema({
  // Nombre del taller (obligatorio y con índice)
  nombre: { type: String, required: true, index: true },
  
  // Descripción del taller (opcional)
  descripcion: { type: String },
  
  // Público objetivo del taller (opcional)
  publicoObjetivo: { type: String },
  
  // Duración del taller en horas (opcional)
  duracion: { type: Number },
  
  // Fecha de inicio del taller (obligatoria)
  fechaInicio: { type: Date, required: true },
  
  // Fecha de finalización del taller (obligatoria)
  fechaFin: { type: Date, required: true },
  
  // Horario del taller (opcional)
  horario: { type: String },
  
  // Materiales necesarios para el taller
  materiales: [String],
  
  // Modalidad del taller (presencial o virtual, obligatorio)
  modalidad: { type: String, enum: ['presencial', 'virtual'], required: true },
  
  // Lugar donde se realizará el taller (opcional)
  lugar: { type: String },
  
  // URL del documental asociado al taller (opcional)
  documental: { type: String },
  imagen: { type: String },
  video: { type: String}
});

// Crear un índice de texto en el nombre del taller para búsquedas eficientes
TallerSchema.index({ nombre: 'text' });

// Creación del modelo de Taller
const Taller = mongoose.model('Taller', TallerSchema);

// Exportación del modelo para su uso en otras partes de la aplicación
module.exports = Taller;
