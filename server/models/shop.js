const mongoose = require('mongoose');

const TiendaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, index: true },
  descripcion: { type: String },
  video: { type: String },
  qr: { type: String },
  productos: [{
    imagen: { type: String },
    nombre: { type: String, required: true, index: true },
    dimensiones: { type: String },
    descripcion: { type: String },
    disponibilidad: { type: Number, required: true, min: 0 },
    descuento: { type: Number, default: 0 },
    tipo: { type: String, enum: ['bordado', 'ceramica'] }
  }],
  talleres: [{
    nombre: { type: String, required: true, index: true },
    publicoObjetivo: { type: String },
    duracion: { type: Number },
    fechaInicio: { type: Date },
    horario: { type: String },
    materiales: [String],
    modalidad: { type: String, enum: ['presencial', 'virtual'] },
    lugar: { type: String }
  }]
});

const Tienda = mongoose.model('Tienda', TiendaSchema);
module.exports = Tienda;
