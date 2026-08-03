import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

let globalSocket = null;

export function useCollaboration(organizationId, currentUser) {
  const [presence, setPresence] = useState(new Map());
  const [editing, setEditing] = useState(new Map());
  const [dataChanges, setDataChanges] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!organizationId || !currentUser) return;

    // Reuse socket if already connected
    if (!globalSocket || globalSocket.disconnected) {
      globalSocket = io({ autoConnect: true });
    }
    socketRef.current = globalSocket;
    const socket = socketRef.current;

    socket.emit('join-workspace', {
      organizationId,
      userId: currentUser.id,
      userInfo: { id: currentUser.id, firstName: currentUser.firstName, lastName: currentUser.lastName }
    });

    socket.on('presence-update', ({ userId, userInfo, status }) => {
      setPresence(prev => { const m = new Map(prev); m.set(userId, { ...userInfo, status }); return m; });
    });

    socket.on('presence-list', (users) => {
      const m = new Map();
      users.forEach(u => m.set(u.userId, { ...u.userInfo, status: 'online' }));
      setPresence(m);
    });

    socket.on('edit-start', ({ userId, userInfo, resourceType, resourceId }) => {
      const key = `${resourceType}:${resourceId}`;
      setEditing(prev => { const m = new Map(prev); m.set(key, { userId, userInfo }); return m; });
    });

    socket.on('edit-end', ({ resourceType, resourceId }) => {
      const key = `${resourceType}:${resourceId}`;
      setEditing(prev => { const m = new Map(prev); m.delete(key); return m; });
    });

    socket.on('data-change', (change) => setDataChanges(change));

    return () => {
      socket.off('presence-update');
      socket.off('presence-list');
      socket.off('edit-start');
      socket.off('edit-end');
      socket.off('data-change');
    };
  }, [organizationId, currentUser?.id]);

  const startEditing = (resourceType, resourceId) => {
    socketRef.current?.emit('edit-start', { resourceType, resourceId });
  };

  const stopEditing = (resourceType, resourceId) => {
    socketRef.current?.emit('edit-end', { resourceType, resourceId });
  };

  const broadcastChange = (event, data) => {
    socketRef.current?.emit('update', { event, ...data });
  };

  return { presence, editing, dataChanges, startEditing, stopEditing, broadcastChange };
}
