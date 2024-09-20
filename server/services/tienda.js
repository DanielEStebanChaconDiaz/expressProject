const Tienda = require('../models/tienda');

class TiendaService {
  async getAll() {
    return await Tienda.find();
  }

  async getById(id) {
    return await Tienda.findById(id);
  }

  async create(data) {
    const tienda = new Tienda(data);
    return await tienda.save();
  }

  async update(id, data) {
    return await Tienda.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Tienda.findByIdAndDelete(id);
  }
}

module.exports = new TiendaService();
