const Pedido = require('../models/order');

/**
 * Obtiene todos los pedidos de la base de datos.
 * @returns {Promise<Array>} - Devuelve un array de pedidos.
 */
const obtenerPedidos = async () => {
  return await Pedido.find();
};

/**
 * Obtiene un pedido específico por su ID.
 * @param {String} id - Identificador único del pedido.
 * @returns {Promise<Object|null>} - Devuelve el pedido encontrado o null si no existe.
 */
const obtenerPedidoPorId = async (id) => {
  return await Pedido.findById(id);
};

/**
 * Crea un nuevo pedido en la base de datos.
 * @param {Object} data - Objeto con la información del pedido (detalles, cliente, etc.).
 * @returns {Promise<Object>} - Devuelve el nuevo pedido creado.
 */
const crearPedido = async (data) => {
  const nuevoPedido = new Pedido(data);
  return await nuevoPedido.save();
};

/**
 * Actualiza un pedido existente por su ID.
 * @param {String} id - Identificador único del pedido.
 * @param {Object} data - Objeto con los datos actualizados del pedido.
 * @returns {Promise<Object|null>} - Devuelve el pedido actualizado o null si no existe.
 */
const actualizarPedido = async (id, data) => {
  return await Pedido.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Elimina un pedido específico por su ID.
 * @param {String} id - Identificador único del pedido.
 * @returns {Promise<Object|null>} - Devuelve el pedido eliminado o null si no existe.
 */
const eliminarPedido = async (id) => {
  return await Pedido.findByIdAndDelete(id);
};

// Exporta las funciones de manejo de pedidos
module.exports = {
  obtenerPedidos,
  obtenerPedidoPorId,
  crearPedido,
  actualizarPedido,
  eliminarPedido,
};
