const { body, query, validationResult } = require('express-validator');
const { Parser } = require('json2csv');
const prisma = require('../config/database');

const TYPE_LABELS = {
  LEAD: 'Lead', PROSPECT: 'Prospect', CUSTOMER: 'Client', PARTNER: 'Partenaire', VENDOR: 'Fournisseur'
};

exports.create = [
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
  body('email').optional({ checkFalsy: true }).isEmail(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const orgId = req.crm.organizationId;

      // Verifier limite plan
      const org = await prisma.cRMOrganization.findUnique({ where: { id: orgId } });
      const count = await prisma.cRMContact.count({ where: { organizationId: orgId } });
      if (org.plan === 'FREE' && count >= org.maxContacts) {
        return res.status(402).json({
          error: `Limite atteinte (${org.maxContacts} contacts). Passez au plan superieur.`
        });
      }

      const { tags, ...rest } = req.body;
      const contact = await prisma.cRMContact.create({
        data: {
          ...rest,
          tags: tags ? JSON.stringify(tags) : null,
          organizationId: orgId,
          ownerId: req.crm.userId
        },
        include: { owner: { select: { firstName: true, lastName: true } } }
      });

      await prisma.cRMActivityLog.create({
        data: {
          organizationId: orgId,
          userId: req.crm.userId,
          action: 'CREATE',
          entity: 'contact',
          entityId: contact.id
        }
      });

      res.status(201).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.getAll = async (req, res) => {
  try {
    const { search, type, status, page = 1, limit = 25 } = req.query;
    const orgId = req.crm.organizationId;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { organizationId: orgId };
    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
        { company: { contains: search } }
      ];
    }
    if (type) where.type = type;
    if (status) where.status = status;

    const [contacts, total, byTypeRaw] = await Promise.all([
      prisma.cRMContact.findMany({
        where,
        include: {
          owner: { select: { firstName: true, lastName: true } },
          _count: { select: { deals: true, activities: true } }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.cRMContact.count({ where }),
      prisma.cRMContact.groupBy({
        by: ['type'],
        where: { organizationId: orgId },
        _count: { type: true }
      })
    ]);

    const byType = byTypeRaw.reduce((acc, t) => { acc[t.type] = t._count.type; return acc; }, {});

    res.json({
      contacts,
      pagination: {
        total, page: parseInt(page), limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      stats: { total, byType }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const contact = await prisma.cRMContact.findFirst({
      where: { id: req.params.id, organizationId: req.crm.organizationId },
      include: {
        owner: { select: { firstName: true, lastName: true } },
        deals: { orderBy: { createdAt: 'desc' }, take: 5 },
        activities: { orderBy: { createdAt: 'desc' }, take: 10 }
      }
    });
    if (!contact) return res.status(404).json({ error: 'Contact introuvable' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { tags, ...rest } = req.body;
    const contact = await prisma.cRMContact.update({
      where: { id: req.params.id },
      data: {
        ...rest,
        tags: tags !== undefined ? JSON.stringify(tags) : undefined,
        updatedAt: new Date()
      }
    });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await prisma.cRMContact.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.exportCSV = async (req, res) => {
  try {
    const contacts = await prisma.cRMContact.findMany({
      where: { organizationId: req.crm.organizationId },
      include: { owner: { select: { firstName: true, lastName: true } } }
    });

    const fields = [
      { label: 'Prenom', value: 'firstName' },
      { label: 'Nom', value: 'lastName' },
      { label: 'Email', value: 'email' },
      { label: 'Telephone', value: 'phone' },
      { label: 'Entreprise', value: 'company' },
      { label: 'Poste', value: 'jobTitle' },
      { label: 'Type', value: 'type' },
      { label: 'Statut', value: 'status' },
      { label: 'Source', value: 'source' },
      { label: 'Ville', value: 'city' },
      { label: 'Pays', value: 'country' },
      { label: 'Proprietaire', value: row => `${row.owner.firstName} ${row.owner.lastName}` },
      { label: 'Cree le', value: row => new Date(row.createdAt).toISOString().split('T')[0] }
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(contacts);

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=contacts-${Date.now()}.csv`);
    res.send('\uFEFF' + csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
