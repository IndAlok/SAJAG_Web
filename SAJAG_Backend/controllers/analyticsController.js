const prisma = require('../config/db');

const getStats = async (req, res) => {
  try {
    const [totalPrograms, totalParticipants, totalPartners, stateStats, statusStats] = await Promise.all([
      prisma.trainingProgram.count(),
      prisma.trainingProgram.aggregate({
        _sum: { participants: true },
      }),
      prisma.trainingPartner.count(),
      prisma.trainingProgram.groupBy({
        by: ['state'],
        _count: { state: true },
      }),
      prisma.trainingProgram.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
    ]);

    const completedPrograms = statusStats.find(s => s.status === 'Completed')?._count?.status || 0;
    const ongoingPrograms = statusStats.find(s => s.status === 'Ongoing')?._count?.status || 0;
    const plannedPrograms = statusStats.find(s => s.status === 'Planned')?._count?.status || 0;

    res.json({
      success: true,
      data: {
        totalTrainings: totalPrograms,
        totalParticipants: totalParticipants._sum.participants || 0,
        activePartners: totalPartners,
        statesCovered: stateStats.length,
        completedPrograms,
        ongoingPrograms,
        plannedPrograms,
        completionRate: totalPrograms > 0 ? Math.round((completedPrograms / totalPrograms) * 100) : 0,
      },
    });
  } catch (error) {
    console.error('GetStats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getThematicCoverage = async (req, res) => {
  try {
    const themeStats = await prisma.trainingProgram.groupBy({
      by: ['theme'],
      _count: { theme: true },
      _sum: { participants: true },
    });

    const data = themeStats.map(t => ({
      name: t.theme,
      value: t._count.theme,
      participants: t._sum.participants || 0,
    }));

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('GetThematicCoverage error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getGeographicSpread = async (req, res) => {
  try {
    const stateStats = await prisma.trainingProgram.groupBy({
      by: ['state'],
      _count: { state: true },
      _sum: { participants: true },
    });

    const data = stateStats.map(s => ({
      state: s.state,
      count: s._count.state,
      participants: s._sum.participants || 0,
    }));

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('GetGeographicSpread error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getPartnerLeaderboard = async (req, res) => {
  try {
    const partners = await prisma.trainingPartner.findMany({
      include: {
        programs: {
          select: {
            participants: true,
            feedbackScore: true,
          },
        },
        _count: {
          select: { programs: true },
        },
      },
      orderBy: {
        programs: {
          _count: 'desc',
        },
      },
      take: 20,
    });

    const data = partners.map(p => {
      const totalParticipants = p.programs.reduce((sum, pr) => sum + (pr.participants || 0), 0);
      const avgFeedback = p.programs.length > 0
        ? p.programs.filter(pr => pr.feedbackScore).reduce((sum, pr) => sum + pr.feedbackScore, 0) / p.programs.filter(pr => pr.feedbackScore).length
        : 0;

      return {
        id: p.id,
        name: p.name,
        type: p.type,
        programsCount: p._count.programs,
        totalParticipants,
        avgFeedback: Math.round(avgFeedback * 10) / 10,
      };
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('GetPartnerLeaderboard error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getStatusDistribution = async (req, res) => {
  try {
    const statusStats = await prisma.trainingProgram.groupBy({
      by: ['status'],
      _count: { status: true },
      _sum: { participants: true },
    });

    const data = statusStats.map(s => ({
      status: s.status,
      count: s._count.status,
      participants: s._sum.participants || 0,
    }));

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('GetStatusDistribution error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getStats, getThematicCoverage, getGeographicSpread, getPartnerLeaderboard, getStatusDistribution };
