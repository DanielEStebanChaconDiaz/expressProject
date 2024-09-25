const express = require('express');
const router = express.Router();
const tiendaController = require('../controller/shopController');
const { validateCreate, validateUpdate, validateId } = require('../validator/tiendaValidator');

router.get('/', tiendaController.getAll);
router.get('/:id', validateId, tiendaController.getById);
router.post('/', validateCreate, tiendaController.create);
router.put('/:id', validateUpdate, tiendaController.update);
router.delete('/:id', validateId, tiendaController.delete);

module.exports = router;
