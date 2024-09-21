const Taller = require('../models/workshop');

class TallerService {
  async getAll() {
    return await Taller.find();
  }

  async getById(id) {
    return await Taller.findById(id);
  }

  async create(data) {
    const taller = new Taller(data);
    return await taller.save();
  }

  async update(id, data) {
    return await Taller.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Taller.findByIdAndDelete(id);
  }
}

module.exports = new TallerService();
