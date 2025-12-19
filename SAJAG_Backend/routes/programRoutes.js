const express = require('express');
const { body } = require('express-validator');
const {
  createProgram,
  getPrograms,
  getProgram,
  updateProgram,
  deleteProgram,
} = require('../controllers/programController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules for creating a program
const createProgramValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('theme').trim().notEmpty().withMessage('Theme is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('location.coordinates')
    .isArray({ min: 2, max: 2 })
    .withMessage('Coordinates must be an array of [longitude, latitude]'),
  body('address').trim().notEmpty().withMessage('Address is required'),
];

// All routes are protected
router.use(protect);

router
  .route('/')
  .post(createProgramValidation, createProgram)
  .get(getPrograms);

router
  .route('/:id')
  .get(getProgram)
  .put(updateProgram)
  .delete(deleteProgram);

module.exports = router;
