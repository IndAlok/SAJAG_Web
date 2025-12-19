const express = require('express');
const router = express.Router();
const prisma = require('../config/db');

router.get('/db', async (req, res) => {
  try {
    const prog = await prisma.trainingProgram.findFirst();
    res.json({ success: true, data: prog ? prog.id : null });
  } catch (error) {
    console.error('Health DB check error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
