const tallerService = require('../services/workshop');
const TallerDTO = require('../dto/tallerDto');

class TallerController {
  async getAll(req, res) {
    const talleres = await tallerService.getAll();
    res.json(talleres.map(taller => new TallerDTO(taller)));
  }

  async getById(req, res) {
    const taller = await tallerService.getById(req.params.id);
    if (!taller) {
      return res.status(404).json({ message: 'Taller no encontrado' });
    }
    res.json(new TallerDTO(taller));
  }

  async create(req, res) {
    const taller = await tallerService.create(req.body);
    res.status(201).json(new TallerDTO(taller));
  }

  async update(req, res) {
    const taller = await tallerService.update(req.params.id, req.body);
    if (!taller) {
      return res.status(404).json({ message: 'Taller no encontrado' });
    }
    res.json(new TallerDTO(taller));
  }

  async delete(req, res) {
      const taller = await tallerService.getById(req.params.id);
      if (!taller) {
        return res.status(404).json({ message: 'Taller no encontrado' });
      }
      await tallerService.delete(req.params.id);
      res.status(204).send();
  }
}

module.exports = new TallerController();
