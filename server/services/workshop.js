const Taller = require('../models/workshop');
const Tienda = require('../models/shop');
const TallerDTO = require('../dto/tallerDto');

/**
 * Clase TallerService
 * Proporciona métodos para gestionar talleres en la aplicación.
 */
class TallerService {
  /**
   * Obtiene todos los talleres de la base de datos.
   * @returns {Promise<Array>} - Devuelve un array de talleres.
   */
  async getAll() {
    return await Taller.find();
  }

  /**
   * Obtiene un taller específico por su ID.
   * @param {String} id - Identificador único del taller.
   * @returns {Promise<Object|null>} - Devuelve el taller encontrado o null si no existe.
   */
  async getById(id) {
    return await Taller.findById(id);
  }

  /**
   * Crea un nuevo taller y lo asocia a una tienda.
   * @param {Object} data - Objeto con la información del taller.
   * @returns {Promise<Object>} - Devuelve el taller creado.
   */
  async create(data) {
    const taller = new Taller(data);

    await Tienda.updateOne(
      { _id: taller.tiendaId },
      { $push: { talleres: taller._id } }
    );

    return await taller.save();
  }

  /**
   * Actualiza un taller existente por su ID.
   * @param {String} id - Identificador único del taller.
   * @param {Object} data - Objeto con los datos actualizados del taller.
   * @returns {Promise<Object|null>} - Devuelve el taller actualizado o null si no existe.
   */
  async update(id, data) {
    return await Taller.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Elimina un taller específico por su ID y lo quita de la tienda correspondiente.
   * @param {String} id - Identificador único del taller.
   * @returns {Promise<Object|null>} - Devuelve null si se eliminó correctamente.
   */
  async delete(id) {
    const taller = await Taller.findByIdAndDelete(id);
    if (taller) {
      await Tienda.updateOne(
        { talleres: id },
        { $pull: { talleres: id } }
      );
    }

    return null;
  }

  /**
   * Busca talleres por nombre utilizando una búsqueda de texto.
   * @param {String} nombre - Nombre del taller a buscar.
   * @returns {Promise<Array>} - Devuelve un array de talleres que coinciden con la búsqueda.
   */
  async buscarPorNombre(nombre) {
    const talleres = await Taller.find({ 
      $text: { 
        $search: nombre,
        $caseSensitive: false,
        $diacriticSensitive: false
      } 
    }, { 
      score: { $meta: "textScore" } 
    })
    .sort({ score: { $meta: "textScore" } })
    .lean()
    .exec();

    return talleres.map(taller => new TallerDTO(taller));
  }
}

// Exporta una instancia de TallerService
module.exports = new TallerService();
