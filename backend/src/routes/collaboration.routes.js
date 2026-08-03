const express = require('express');
const router = express.Router();
const prisma = require('../config/database');
const { authMiddleware } = require('../middleware/auth.middleware');

// Get team presence for current tenant
router.get('/organization', authMiddleware, async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const users = await prisma.user.findMany({
      where: { tenantId, isActive: true },
      select: {
        id: true, firstName: true, lastName: true, email: true,
        role: true, avatar: true,
        presence: true
      }
    });
    const result = users.map(u => ({
      userId: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      role: u.role,
      avatar: u.avatar,
      status: u.presence?.status || 'offline',
      statusMessage: u.presence?.statusMessage || null,
      statusEmoji: u.presence?.statusEmoji || null,
      currentPage: u.presence?.currentPage || null,
      lastActiveAt: u.presence?.lastActiveAt || null
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update own presence
router.patch('/me', authMiddleware, async (req, res) => {
  try {
    const { status, statusMessage, statusEmoji } = req.body;
    const presence = await prisma.userPresence.upsert({
      where: { userId: req.user.id },
      update: { status, statusMessage, statusEmoji, lastActiveAt: new Date() },
      create: { userId: req.user.id, status: status || 'online', statusMessage, statusEmoji }
    });
    res.json(presence);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET asset comments
router.get('/assets/:assetId/comments', authMiddleware, async (req, res) => {
  try {
    const comments = await prisma.assetComment.findMany({
      where: { assetId: req.params.assetId },
      include: {
        author: { select: { id: true, firstName: true, lastName: true, avatar: true } }
      },
      orderBy: { createdAt: 'asc' }
    });
    res.json(comments.map(c => ({ ...c, mentions: JSON.parse(c.mentions || '[]') })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new comment
router.post('/assets/:assetId/comments', authMiddleware, async (req, res) => {
  try {
    const { content, parentId, positionX, positionY, mentions = [] } = req.body;
    const comment = await prisma.assetComment.create({
      data: {
        assetId: req.params.assetId,
        content, parentId, positionX, positionY,
        authorId: req.user.id,
        mentions: JSON.stringify(mentions)
      },
      include: {
        author: { select: { id: true, firstName: true, lastName: true, avatar: true } }
      }
    });
    const commentOut = { ...comment, mentions };
    
    // Broadcast via socket
    const io = req.app.get('io');
    if (io) {
      io.to(`asset:${req.params.assetId}`).emit('comment:new', commentOut);
    }
    
    res.status(201).json(commentOut);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH resolve comment
router.patch('/assets/comments/:id/resolve', authMiddleware, async (req, res) => {
  try {
    const comment = await prisma.assetComment.update({
      where: { id: req.params.id },
      data: { resolved: true, resolvedById: req.user.id, resolvedAt: new Date() }
    });
    const io = req.app.get('io');
    if (io) io.to(`asset:${comment.assetId}`).emit('comment:resolved', { id: comment.id });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE comment
router.delete('/assets/comments/:id', authMiddleware, async (req, res) => {
  try {
    const comment = await prisma.assetComment.findUnique({ where: { id: req.params.id } });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    if (comment.authorId !== req.user.id && req.user.role !== 'ADMIN' && req.user.role !== 'SUPERADMIN') {
      return res.status(403).json({ error: 'Non autorisé' });
    }
    await prisma.assetComment.delete({ where: { id: req.params.id } });
    const io = req.app.get('io');
    if (io) io.to(`asset:${comment.assetId}`).emit('comment:deleted', { id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET team list
router.get('/team', authMiddleware, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { tenantId: req.user.tenantId, isActive: true },
      select: { id: true, firstName: true, lastName: true, email: true, role: true, avatar: true }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
