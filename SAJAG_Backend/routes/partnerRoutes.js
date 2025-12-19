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

// Validation rules
const createPartnerValidation = [
  body('name').trim().notEmpty().withMessage('Partner name is required'),
  body('type')
    .isIn(['NIDM', 'ATI', 'NGO', 'GoI Ministry'])
    .withMessage('Invalid partner type'),
];

// All routes are protected
router.use(protect);

router
  .route('/')
  .post(createPartnerValidation, createPartner)
  .get(getPartners);

router
  .route('/:id')
  .get(getPartner)
  .put(updatePartner)
  .delete(deletePartner);

module.exports = router;
