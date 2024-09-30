// Importación del servicio de pedidos y el DTO correspondiente
const pedidoService = require('../services/order');
const PedidoDTO = require('../dto/pedidoDto');

/**
 * Controlador para gestionar las operaciones relacionadas con los pedidos.
 */

/**
 * Obtiene todos los pedidos.
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de respuesta utilizado para enviar la respuesta al cliente.
 */
const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoService.obtenerPedidos(); // Llama al servicio para obtener todos los pedidos
    res.status(200).json(pedidos.map(pedido => new PedidoDTO(pedido))); // Devuelve los pedidos mapeados al DTO
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener pedidos', error }); // Manejo de errores
  }
};

/**
 * Obtiene un pedido específico por su ID.
 * @param {Object} req - El objeto de la solicitud que contiene el ID del pedido en req.params.
 * @param {Object} res - El objeto de respuesta.
 */
const obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await pedidoService.obtenerPedidoPorId(req.params.id); // Busca el pedido por ID
    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' }); // Manejo de pedido no encontrado
    }
    res.status(200).json(new PedidoDTO(pedido)); // Devuelve el pedido encontrado mapeado al DTO
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el pedido', error }); // Manejo de errores
  }
};

/**
 * Crea un nuevo pedido.
 * @param {Object} req - El objeto de la solicitud que contiene los datos del nuevo pedido en req.body.
 * @param {Object} res - El objeto de respuesta.
 */
const crearPedido = async (req, res) => {
  try {
    const nuevoPedido = await pedidoService.crearPedido(req.body); // Llama al servicio para crear un nuevo pedido
    res.status(201).json(new PedidoDTO(nuevoPedido)); // Devuelve el nuevo pedido mapeado al DTO
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el pedido', error }); // Manejo de errores
  }
};

/**
 * Actualiza un pedido específico por su ID.
 * @param {Object} req - El objeto de la solicitud que contiene el ID del pedido en req.params y los nuevos datos en req.body.
 * @param {Object} res - El objeto de respuesta.
 */
const actualizarPedido = async (req, res) => {
  try {
    const pedidoActualizado = await pedidoService.actualizarPedido(req.params.id, req.body); // Actualiza el pedido
    if (!pedidoActualizado) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' }); // Manejo de pedido no encontrado
    }
    res.status(200).json(new PedidoDTO(pedidoActualizado)); // Devuelve el pedido actualizado mapeado al DTO
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el pedido', error }); // Manejo de errores
  }
};

/**
 * Elimina un pedido específico por su ID.
 * @param {Object} req - El objeto de la solicitud que contiene el ID del pedido en req.params.
 * @param {Object} res - El objeto de respuesta.
 */
const eliminarPedido = async (req, res) => {
  try {
    const pedidoEliminado = await pedidoService.eliminarPedido(req.params.id); // Llama al servicio para eliminar el pedido
    if (!pedidoEliminado) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' }); // Manejo de pedido no encontrado
    }
    res.status(204).send(); // Respuesta sin contenido para eliminación exitosa
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el pedido', error }); // Manejo de errores
  }
};

// Exportación de las funciones del controlador
module.exports = {
  obtenerPedidos,
  obtenerPedidoPorId,
  crearPedido,
  actualizarPedido,
  eliminarPedido,
};
