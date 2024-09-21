const servicioProducto = require('../services/product');

class ControladorProducto {
  async crearProducto(req, res) {
    try {
      const producto = await servicioProducto.crearProducto(req.body);
      res.status(201).json(producto);
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  }

  async obtenerProducto(req, res) {
    try {
      const producto = await servicioProducto.obtenerProductoPorId(req.params.id);
      if (producto) {
        res.json(producto);
      } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }

  async actualizarProducto(req, res) {
    try {
      const producto = await servicioProducto.actualizarProducto(req.params.id, req.body);
      if (producto) {
        res.json(producto);
      } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarProducto(req, res) {
    try {
      const producto = await servicioProducto.eliminarProducto(req.params.id);
      if (producto) {
        res.json({ mensaje: 'Producto eliminado exitosamente' });
      } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerTodosLosProductos(req, res) {
    try {
      const productos = await servicioProducto.obtenerTodosLosProductos();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }
}

module.exports = new ControladorProducto();