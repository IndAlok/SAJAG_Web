const { validationResult } = require('express-validator');
const prisma = require('../config/db');

const getPrograms = async (req, res) => {
  try {
    const { status, theme, state, district, partnerId, page = 1, limit = 10, sort = 'createdAt', order = 'desc' } = req.query;

    const where = {};
    if (status) where.status = status;
    if (theme) where.theme = theme;
    if (state) where.state = state;
    if (district) where.district = district;
    if (partnerId) where.partnerId = partnerId;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [programs, total] = await Promise.all([
      prisma.trainingProgram.findMany({
        where,
        include: {
          partner: {
            select: { id: true, name: true, type: true },
          },
          createdBy: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: { [sort]: order },
        skip,
        take: parseInt(limit),
      }),
      prisma.trainingProgram.count({ where }),
    ]);

    const formattedPrograms = programs.map(p => ({
      id: p.id,
      title: p.title,
      theme: p.theme,
      status: p.status,
      state: p.state,
      district: p.district,
      startDate: p.startDate,
      endDate: p.endDate,
      participants: p.participants,
      feedbackScore: p.feedbackScore,
      description: p.description,
      location: p.latitude && p.longitude ? { lat: p.latitude, lon: p.longitude } : null,
      address: p.address,
      partnerId: p.partnerId,
      partnerName: p.partner?.name,
      partnerType: p.partner?.type,
      createdBy: p.createdBy,
      createdAt: p.createdAt,
    }));

    res.json({
      success: true,
      data: formattedPrograms,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('GetPrograms error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getProgram = async (req, res) => {
  try {
    const program = await prisma.trainingProgram.findUnique({
      where: { id: req.params.id },
      include: {
        partner: true,
        createdBy: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    res.json({
      success: true,
      data: {
        ...program,
        location: program.latitude && program.longitude ? { lat: program.latitude, lon: program.longitude } : null,
        partnerName: program.partner?.name,
        partnerType: program.partner?.type,
      },
    });
  } catch (error) {
    console.error('GetProgram error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createProgram = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, theme, status, state, district, startDate, endDate, location, address, partnerId, participants, feedbackScore, description } = req.body;

    const program = await prisma.trainingProgram.create({
      data: {
        title,
        theme,
        status: status || 'Planned',
        state,
        district,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        latitude: location?.lat || null,
        longitude: location?.lon || null,
        address,
        partnerId: partnerId || null,
        participants: participants || 0,
        feedbackScore: feedbackScore || null,
        description,
        createdById: req.user.id,
      },
      include: {
        partner: true,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        ...program,
        location: program.latitude && program.longitude ? { lat: program.latitude, lon: program.longitude } : null,
        partnerName: program.partner?.name,
        partnerType: program.partner?.type,
      },
    });
  } catch (error) {
    console.error('CreateProgram error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateProgram = async (req, res) => {
  try {
    const { title, theme, status, state, district, startDate, endDate, location, address, partnerId, participants, feedbackScore, description } = req.body;

    const existing = await prisma.trainingProgram.findUnique({
      where: { id: req.params.id },
    });

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (theme !== undefined) updateData.theme = theme;
    if (status !== undefined) updateData.status = status;
    if (state !== undefined) updateData.state = state;
    if (district !== undefined) updateData.district = district;
    if (startDate !== undefined) updateData.startDate = new Date(startDate);
    if (endDate !== undefined) updateData.endDate = new Date(endDate);
    if (location !== undefined) {
      updateData.latitude = location?.lat || null;
      updateData.longitude = location?.lon || null;
    }
    if (address !== undefined) updateData.address = address;
    if (partnerId !== undefined) updateData.partnerId = partnerId || null;
    if (participants !== undefined) updateData.participants = participants;
    if (feedbackScore !== undefined) updateData.feedbackScore = feedbackScore;
    if (description !== undefined) updateData.description = description;

    const program = await prisma.trainingProgram.update({
      where: { id: req.params.id },
      data: updateData,
      include: {
        partner: true,
      },
    });

    res.json({
      success: true,
      data: {
        ...program,
        location: program.latitude && program.longitude ? { lat: program.latitude, lon: program.longitude } : null,
        partnerName: program.partner?.name,
        partnerType: program.partner?.type,
      },
    });
  } catch (error) {
    console.error('UpdateProgram error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteProgram = async (req, res) => {
  try {
    const existing = await prisma.trainingProgram.findUnique({
      where: { id: req.params.id },
    });

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    await prisma.trainingProgram.delete({
      where: { id: req.params.id },
    });

    res.json({
      success: true,
      message: 'Program deleted successfully',
    });
  } catch (error) {
    console.error('DeleteProgram error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getPrograms, getProgram, createProgram, updateProgram, deleteProgram };
