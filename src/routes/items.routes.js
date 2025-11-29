const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.controller');
const auth = require('../middlewares/auth.middleware');
const { createItem, updateItem, idParam } = require('../validators/items.validator');
const { validationResult } = require('express-validator');

function runValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}

router.get('/', itemsController.list);
router.get('/:id', idParam, runValidation, itemsController.getById);
router.post('/', createItem, runValidation, auth, itemsController.createItem);
router.put('/:id', updateItem, runValidation, auth, itemsController.updateItem);
router.patch('/:id', updateItem, runValidation, auth, itemsController.updateItem);
router.delete('/:id', idParam, runValidation, auth, itemsController.deleteItem);

module.exports = router;
