const prisma = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const leases = await prisma.lease.findMany({
      include: {
        building: { select: { name: true } }
      }
    });
    res.json(leases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
