const tallerService = require('../services/workshop');
const TallerDTO = require('../dto/tallerDto');

class TallerController {
  /**
   * Obtiene todos los talleres.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  async getAll(req, res) {
    try {
      const talleres = await tallerService.getAll();
      res.json(talleres.map(taller => new TallerDTO(taller)));
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener talleres', error: error.message });
    }
  }

  /**
   * Obtiene un taller por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  async getById(req, res) {
    try {
      const taller = await tallerService.getById(req.params.id);
      if (!taller) {
        return res.status(404).json({ message: 'Taller no encontrado' });
      }
      res.json(new TallerDTO(taller));
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el taller', error: error.message });
    }
  }

  /**
   * Crea un nuevo taller.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  async create(req, res) {
    try {
      const taller = await tallerService.create(req.body);
      res.status(201).json(new TallerDTO(taller));
    } catch (error) {
      res.status(400).json({ message: 'Error al crear el taller', error: error.message });
    }
  }

  /**
   * Actualiza un taller existente.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  async update(req, res) {
    try {
      const taller = await tallerService.update(req.params.id, req.body);
      if (!taller) {
        return res.status(404).json({ message: 'Taller no encontrado' });
      }
      res.json(new TallerDTO(taller));
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar el taller', error: error.message });
    }
  }

  /**
   * Elimina un taller por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  async delete(req, res) {
    try {
      const taller = await tallerService.getById(req.params.id);
      if (!taller) {
        return res.status(404).json({ message: 'Taller no encontrado' });
      }
      await tallerService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el taller', error: error.message });
    }
  }
}

module.exports = new TallerController();
