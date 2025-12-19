const { validationResult } = require('express-validator');
const prisma = require('../config/db');

const getPartners = async (req, res) => {
  try {
    const { type, page = 1, limit = 50 } = req.query;

    const where = {};
    if (type) where.type = type;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [partners, total] = await Promise.all([
      prisma.trainingPartner.findMany({
        where,
        orderBy: { name: 'asc' },
        skip,
        take: parseInt(limit),
        include: {
          _count: {
            select: { programs: true },
          },
        },
      }),
      prisma.trainingPartner.count({ where }),
    ]);

    const formattedPartners = partners.map(p => ({
      id: p.id,
      name: p.name,
      type: p.type,
      contactPerson: p.contactPerson,
      contactEmail: p.contactEmail,
      contactPhone: p.contactPhone,
      address: p.address,
      programsCount: p._count.programs,
      createdAt: p.createdAt,
    }));

    res.json({
      success: true,
      data: formattedPartners,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('GetPartners error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getPartner = async (req, res) => {
  try {
    const partner = await prisma.trainingPartner.findUnique({
      where: { id: req.params.id },
      include: {
        programs: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { programs: true },
        },
      },
    });

    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }

    res.json({
      success: true,
      data: {
        ...partner,
        programsCount: partner._count.programs,
      },
    });
  } catch (error) {
    console.error('GetPartner error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createPartner = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, type, contactPerson, contactEmail, contactPhone, address } = req.body;

    const existing = await prisma.trainingPartner.findUnique({
      where: { name },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Partner with this name already exists',
      });
    }

    const partner = await prisma.trainingPartner.create({
      data: {
        name,
        type,
        contactPerson,
        contactEmail,
        contactPhone,
        address,
      },
    });

    res.status(201).json({
      success: true,
      data: partner,
    });
  } catch (error) {
    console.error('CreatePartner error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updatePartner = async (req, res) => {
  try {
    const { name, type, contactPerson, contactEmail, contactPhone, address } = req.body;

    const existing = await prisma.trainingPartner.findUnique({
      where: { id: req.params.id },
    });

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (type !== undefined) updateData.type = type;
    if (contactPerson !== undefined) updateData.contactPerson = contactPerson;
    if (contactEmail !== undefined) updateData.contactEmail = contactEmail;
    if (contactPhone !== undefined) updateData.contactPhone = contactPhone;
    if (address !== undefined) updateData.address = address;

    const partner = await prisma.trainingPartner.update({
      where: { id: req.params.id },
      data: updateData,
    });

    res.json({
      success: true,
      data: partner,
    });
  } catch (error) {
    console.error('UpdatePartner error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deletePartner = async (req, res) => {
  try {
    const existing = await prisma.trainingPartner.findUnique({
      where: { id: req.params.id },
    });

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }

    await prisma.trainingProgram.updateMany({
      where: { partnerId: req.params.id },
      data: { partnerId: null },
    });

    await prisma.trainingPartner.delete({
      where: { id: req.params.id },
    });

    res.json({
      success: true,
      message: 'Partner deleted successfully',
    });
  } catch (error) {
    console.error('DeletePartner error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getPartners, getPartner, createPartner, updatePartner, deletePartner };
