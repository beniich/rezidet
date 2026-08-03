import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';

export class CollaborationDoc {
  constructor(roomId, user) {
    this.doc = new Y.Doc();
    this.roomId = roomId;
    this.user = user;

    this.persistence = new IndexeddbPersistence(roomId, this.doc);
    
    this.persistence.whenSynced.then(() => {
      const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8081';
      this.provider = new WebsocketProvider(
        wsUrl,
        roomId,
        this.doc,
        { params: { userId: user.id, userName: `${user.firstName} ${user.lastName}` } }
      );
      
      this.provider.awareness.setLocalStateField('user', {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        color: generateColor(user.id)
      });
    });
  }

  getMap(name = 'data') {
    return this.doc.getMap(name);
  }

  getArray(name = 'items') {
    return this.doc.getArray(name);
  }

  getText(name = 'content') {
    return this.doc.getText(name);
  }

  observe(callback) {
    this.doc.on('update', callback);
  }

  onPresenceChange(callback) {
    if (!this.provider) return;
    this.provider.awareness.on('change', callback);
  }

  destroy() {
    this.provider?.destroy();
    this.doc.destroy();
  }
}

function generateColor(userId) {
  const colors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
  let sum = 0;
  for(let i=0; i<userId.length; i++) sum += userId.charCodeAt(i);
  return colors[sum % colors.length];
}
