const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PresenceService {
  constructor(io) {
    this.io = io;
    this.heartbeats = new Map();
    this.setupSocketHandlers();
    setInterval(() => this.checkInactive(), 30000);
  }

  setupSocketHandlers() {
    this.io.on('connection', (socket) => {
      socket.on('presence:update', async (data) => {
        if (!socket.data.userId) return;
        const { status, statusMessage, statusEmoji, currentPage, currentResource, device } = data;
        await this.updatePresence(socket.data.userId, {
          status, statusMessage, statusEmoji, currentPage, currentResource,
          device, socketId: socket.id, lastActiveAt: new Date()
        });
        const roomId = `org:${socket.data.tenantId}`;
        this.io.to(roomId).emit('presence:changed', {
          userId: socket.data.userId, status, statusMessage, statusEmoji, currentPage, currentResource
        });
      });

      socket.on('heartbeat', () => {
        if (!socket.data.userId) return;
        this.heartbeats.set(socket.data.userId, Date.now());
        prisma.userPresence.update({
          where: { userId: socket.data.userId },
          data: { lastActiveAt: new Date() }
        }).catch(() => {});
      });

      socket.on('disconnect', () => {
        if (socket.data.userId) this.markOffline(socket.data.userId);
      });
    });
  }

  async updatePresence(userId, data) {
    return prisma.userPresence.upsert({
      where: { userId },
      update: data,
      create: { userId, status: data.status || 'online', ...data }
    });
  }

  async markOffline(userId) {
    await prisma.userPresence.update({
      where: { userId },
      data: { status: 'offline', lastActiveAt: new Date() }
    }).catch(() => {});
  }

  async checkInactive() {
    const now = Date.now();
    const presences = await prisma.userPresence.findMany({
      where: { status: { not: 'offline' } }
    });
    for (const p of presences) {
      const diff = now - new Date(p.lastActiveAt).getTime();
      let newStatus = p.status;
      if (diff > 15 * 60 * 1000) newStatus = 'offline';
      else if (diff > 5 * 60 * 1000 && p.status === 'online') newStatus = 'away';
      if (newStatus !== p.status) {
        await prisma.userPresence.update({ where: { userId: p.userId }, data: { status: newStatus } });
      }
    }
  }

  async getTeamPresence(tenantId) {
    const users = await prisma.user.findMany({
      where: { tenantId, isActive: true },
      select: {
        id: true, firstName: true, lastName: true, email: true,
        role: true, avatar: true,
        presence: true
      }
    });
    return users.map(u => ({
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
  }
}

module.exports = PresenceService;
