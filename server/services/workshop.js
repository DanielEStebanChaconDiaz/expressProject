const Taller = require('../models/workshop');
const Tienda = require('../models/shop');
class TallerService {
  async getAll() {
    return await Taller.find();
  }

  async getById(id) {
    return await Taller.findById(id);
  }

  async create(data) {
    const taller = new Taller(data);

    await Tienda.updateOne(
      { _id: taller.tiendaId },
      { $push: { talleres: taller._id } }
    );

    return await taller.save();
  }

  async update(id, data) {
    return await Taller.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
     const taller=await Taller.findByIdAndDelete(id);
    if (taller) {
      await Tienda.updateOne(
        { talleres: id },
        { $pull: { talleres: id } }
      );
    }
    
    return null;
  }
}

module.exports = new TallerService();
