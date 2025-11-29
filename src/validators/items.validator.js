const { body, param } = require('express-validator');

const createItem = [
  body('title').isString().withMessage('title must be a string').notEmpty().withMessage('title is required'),
  body('description').optional().isString().withMessage('description must be a string')
];

const updateItem = [
  param('id').exists().withMessage('id is required'),
  body('title').optional().isString(),
  body('description').optional().isString()
];

const idParam = [param('id').exists().withMessage('id is required')];

module.exports = { createItem, updateItem, idParam };
