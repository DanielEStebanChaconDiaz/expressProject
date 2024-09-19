const express = require('express');
const Tienda = require('../models/shop');
const router = express.Router();

// Crear una nueva tienda
router.post('/tiendas', async (req, res) => {
  try {
    const nuevaTienda = new Tienda(req.body);
    await nuevaTienda.save();
    res.status(201).json(nuevaTienda);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las tiendas
router.get('/tiendas', async (req, res) => {
  try {
    const tiendas = await Tienda.find();
    res.json(tiendas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una tienda por ID
router.get('/tiendas/:id', async (req, res) => {
  try {
    const tienda = await Tienda.findById(req.params.id);
    if (!tienda) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }
    res.json(tienda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una tienda por ID
router.put('/tiendas/:id', async (req, res) => {
  try {
    const tiendaActualizada = await Tienda.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tiendaActualizada) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }
    res.json(tiendaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una tienda por ID
router.delete('/tiendas/:id', async (req, res) => {
  try {
    const tiendaEliminada = await Tienda.findByIdAndDelete(req.params.id);
    if (!tiendaEliminada) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
