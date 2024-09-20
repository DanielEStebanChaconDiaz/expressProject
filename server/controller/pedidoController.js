const pedidoService = require('../services/pedido');
const PedidoDTO = require('../dto/pedidoDto');

const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoService.obtenerPedidos();
    res.status(200).json(pedidos.map(pedido => new PedidoDTO(pedido)));
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener pedidos', error });
  }
};

const obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await pedidoService.obtenerPedidoPorId(req.params.id);
    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    res.status(200).json(new PedidoDTO(pedido));
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el pedido', error });
  }
};

const crearPedido = async (req, res) => {
  try {
    const nuevoPedido = await pedidoService.crearPedido(req.body);
    res.status(201).json(new PedidoDTO(nuevoPedido));
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el pedido', error });
  }
};

const actualizarPedido = async (req, res) => {
  try {
    const pedidoActualizado = await pedidoService.actualizarPedido(req.params.id, req.body);
    if (!pedidoActualizado) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    res.status(200).json(new PedidoDTO(pedidoActualizado));
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el pedido', error });
  }
};

const eliminarPedido = async (req, res) => {
  try {
    const pedidoEliminado = await pedidoService.eliminarPedido(req.params.id);
    if (!pedidoEliminado) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el pedido', error });
  }
};

module.exports = {
  obtenerPedidos,
  obtenerPedidoPorId,
  crearPedido,
  actualizarPedido,
  eliminarPedido,
};
