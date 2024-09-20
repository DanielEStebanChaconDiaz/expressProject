const express = require('express');
const router = express.Router();
const tallerController = require('../controller/tallerController');
const { validateCreate, validateUpdate, validateId } = require('../validator/tallerValidator');

router.get('/', tallerController.getAll);
router.get('/:id', validateId, tallerController.getById);
router.post('/', validateCreate, tallerController.create);
router.put('/:id', validateUpdate, tallerController.update);
router.delete('/:id', validateId, tallerController.delete);

module.exports = router;
