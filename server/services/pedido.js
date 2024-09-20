const Pedido = require('../models/pedido');

const obtenerPedidos = async () => {
  return await Pedido.find();
};

const obtenerPedidoPorId = async (id) => {
  return await Pedido.findById(id);
};

const crearPedido = async (data) => {
  const nuevoPedido = new Pedido(data);
  return await nuevoPedido.save();
};

const actualizarPedido = async (id, data) => {
  return await Pedido.findByIdAndUpdate(id, data, { new: true });
};

const eliminarPedido = async (id) => {
  return await Pedido.findByIdAndDelete(id);
};

module.exports = {
  obtenerPedidos,
  obtenerPedidoPorId,
  crearPedido,
  actualizarPedido,
  eliminarPedido,
};
