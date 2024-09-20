const tiendaService = require('../services/tienda');
const TiendaDTO = require('../dto/tiendaDto');

class TiendaController {
  async getAll(req, res) {
    const tiendas = await tiendaService.getAll();
    res.json(tiendas.map(tienda => new TiendaDTO(tienda)));
  }

  async getById(req, res) {
    const tienda = await tiendaService.getById(req.params.id);
    if (!tienda) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }
    res.json(new TiendaDTO(tienda));
  }

  async create(req, res) {
    const tienda = await tiendaService.create(req.body);
    res.status(201).json(new TiendaDTO(tienda));
  }

  async update(req, res) {
    const tienda = await tiendaService.update(req.params.id, req.body);
    if (!tienda) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }
    res.json(new TiendaDTO(tienda));
  }

  async delete(req, res) {
    const tienda = await tiendaService.delete(req.params.id);
    if (!tienda) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }
    res.status(204).send();
  }
}

module.exports = new TiendaController();
