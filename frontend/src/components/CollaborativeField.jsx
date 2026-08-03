import { useEffect, useRef, useState } from 'react';
import { CollaborationDoc } from '../../lib/crdt/yjs-adapter';
import { motion } from 'framer-motion';

export function CollaborativeField({ 
  resourceType, 
  resourceId, 
  fieldName, 
  initialValue = '',
  placeholder = '',
  multiline = false,
  className = '',
  currentUser
}) {
  const docRef = useRef(null);
  const inputRef = useRef(null);
  const [value, setValue] = useState(initialValue);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [cursors, setCursors] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    
    const roomId = `${resourceType}:${resourceId}`;
    const doc = new CollaborationDoc(roomId, currentUser);
    docRef.current = doc;

    const text = doc.getText(fieldName);
    
    if (text.length === 0 && initialValue) {
      text.insert(0, initialValue);
    }
    setValue(text.toString());

    text.observe(() => {
      setValue(text.toString());
    });

    doc.onPresenceChange(() => {
      const states = Array.from(doc.provider.awareness.getStates().values());
      const remote = states.filter(s => s.user?.id !== currentUser.id).map(s => s.user);
      setRemoteUsers(remote);
      
      const cursorStates = states
        .filter(s => s.cursor && s.user?.id !== currentUser.id)
        .map(s => ({ user: s.user, anchor: s.cursor.anchor, head: s.cursor.head }));
      setCursors(cursorStates);
    });

    return () => doc.destroy();
  }, [resourceId, fieldName, currentUser]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    const oldValue = value;
    if (!docRef.current) return;
    const text = docRef.current.getText(fieldName);
    
    if (newValue.length > oldValue.length && newValue.startsWith(oldValue)) {
      text.insert(oldValue.length, newValue.slice(oldValue.length));
    } else if (newValue.length < oldValue.length && oldValue.startsWith(newValue)) {
      text.delete(newValue.length, oldValue.length - newValue.length);
    } else {
      const diffStart = findDiff(oldValue, newValue);
      let diffEndOld = oldValue.length - 1;
      let diffEndNew = newValue.length - 1;
      while (diffEndOld > diffStart && diffEndNew > diffStart && oldValue[diffEndOld] === newValue[diffEndNew]) {
        diffEndOld--;
        diffEndNew--;
      }
      const deleteLen = diffEndOld - diffStart + 1;
      const insertStr = newValue.slice(diffStart, diffEndNew + 1);
      if (deleteLen > 0) text.delete(diffStart, deleteLen);
      if (insertStr) text.insert(diffStart, insertStr);
    }
    
    const e2 = inputRef.current;
    if (e2 && docRef.current?.provider) {
      docRef.current.provider.awareness.setLocalStateField('cursor', {
        anchor: e2.selectionStart,
        head: e2.selectionEnd
      });
    }
  };

  const findDiff = (a, b) => {
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return i;
  };

  return (
    <div className={`relative ${className}`}>
      {multiline ? (
        <textarea
          ref={inputRef}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={4}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
        />
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
        />
      )}

      {remoteUsers.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="absolute -top-3 right-2 flex -space-x-1.5">
          {remoteUsers.slice(0, 3).map((u, i) => (
            <div key={u.id} className="relative z-10 w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white" style={{ backgroundColor: u.color }}>
              {u.name?.[0] || '?'}
            </div>
          ))}
          {remoteUsers.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-slate-200 text-xs flex items-center justify-center border-2 border-white z-0">
              +{remoteUsers.length - 3}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
