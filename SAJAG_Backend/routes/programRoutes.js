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

const createProgramValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('theme').trim().notEmpty().withMessage('Theme is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
];

router.get('/', getPrograms);
router.get('/:id', getProgram);

router.post('/', protect, createProgramValidation, createProgram);
router.put('/:id', protect, updateProgram);
router.delete('/:id', protect, deleteProgram);

module.exports = router;
