class CollaborationService {
  constructor(io) {
    this.io = io;

    io.on('connection', (socket) => {
      socket.on('join-workspace', ({ organizationId, userId, userInfo }) => {
        const room = `org:${organizationId}`;
        socket.join(room);
        socket.data = { organizationId, userId, userInfo };

        // Notify others of presence
        socket.broadcast.to(room).emit('presence-update', { userId, userInfo, status: 'online' });

        // Send current presence list to newcomer
        const sockets = io.sockets.adapter.rooms.get(room) ?? new Set();
        const presentUsers = [...sockets]
          .map(sid => io.sockets.sockets.get(sid))
          .filter(s => s?.data?.userId)
          .map(s => ({ userId: s.data.userId, userInfo: s.data.userInfo }));
        socket.emit('presence-list', presentUsers);
      });

      // Shared cursor
      socket.on('cursor-move', ({ x, y, page }) => {
        const room = `org:${socket.data?.organizationId}`;
        if (!room) return;
        socket.broadcast.to(room).emit('cursor-move', {
          userId: socket.data.userId, userInfo: socket.data.userInfo, x, y, page
        });
      });

      // Editing lock (optimistic)
      socket.on('edit-start', ({ resourceType, resourceId }) => {
        const room = `org:${socket.data?.organizationId}`;
        socket.broadcast.to(room).emit('edit-start', {
          userId: socket.data.userId, userInfo: socket.data.userInfo, resourceType, resourceId
        });
      });

      socket.on('edit-end', ({ resourceType, resourceId }) => {
        const room = `org:${socket.data?.organizationId}`;
        socket.broadcast.to(room).emit('edit-end', { userId: socket.data.userId, resourceType, resourceId });
      });

      // Real-time data changes
      socket.on('update', ({ event, ...data }) => {
        const room = `org:${socket.data?.organizationId}`;
        socket.broadcast.to(room).emit('data-change', { event, data });
      });

      // Activity comment live
      socket.on('comment-add', (data) => {
        const room = `org:${socket.data?.organizationId}`;
        io.to(room).emit('comment-add', {
          ...data,
          userId: socket.data.userId,
          userInfo: socket.data.userInfo,
          timestamp: Date.now()
        });
      });

      socket.on('disconnect', () => {
        if (socket.data?.organizationId) {
          const room = `org:${socket.data.organizationId}`;
          io.to(room).emit('presence-update', { userId: socket.data.userId, status: 'offline' });
        }
      });
    });
  }

  /**
   * Notify a data change to an organization room
   */
  notifyChange(organizationId, event, data) {
    this.io.to(`org:${organizationId}`).emit('data-change', { event, data });
  }
}

module.exports = CollaborationService;
