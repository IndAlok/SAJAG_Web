const express = require('express');
const { body } = require('express-validator');
const {
  createPartner,
  getPartners,
  getPartner,
  updatePartner,
  deletePartner,
} = require('../controllers/partnerController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const partnerValidation = [
  body('name').trim().notEmpty().withMessage('Partner name is required'),
  body('type').trim().notEmpty().withMessage('Partner type is required'),
];

router.get('/', getPartners);
router.get('/:id', getPartner);

router.post('/', protect, partnerValidation, createPartner);
router.put('/:id', protect, updatePartner);
router.delete('/:id', protect, deletePartner);

module.exports = router;
