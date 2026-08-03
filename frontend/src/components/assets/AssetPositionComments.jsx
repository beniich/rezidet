import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AssetPositionComments({ comments, onAddComment, onJumpToComment }) {
  const [showInput, setShowInput] = useState(null);
  const [text, setText] = useState('');

  const handleCanvasClick = (e) => {
    if (e.target !== e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setShowInput({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const submitComment = async () => {
    if (!text.trim() || !showInput) return;
    await onAddComment({ positionX: showInput.x, positionY: showInput.y, content: text });
    setText('');
    setShowInput(null);
  };

  return (
    <div className="absolute inset-0 z-10" onClick={handleCanvasClick}>
      {comments.filter(c => c.positionX && c.positionY).map(c => (
        <motion.button
          key={c.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute z-10"
          style={{ left: c.positionX, top: c.positionY }}
          onClick={(e) => {
            e.stopPropagation();
            onJumpToComment(c);
          }}
        >
          <div className="relative group">
            <div className="w-8 h-8 rounded-full border-2 border-white shadow-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs ring-2 ring-yellow-400">
              {c.author?.firstName?.[0] || '?'}
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
              {c.content}
            </div>
          </div>
        </motion.button>
      ))}

      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute z-20"
            style={{ left: showInput.x, top: showInput.y }}
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-3 w-64 overflow-hidden relative">
              <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-t border-l border-slate-200 transform rotate-45" />
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submitComment()}
                placeholder="Commenter ici..."
                autoFocus
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => { setShowInput(null); setText(''); }}
                  className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={submitComment}
                  className="px-3 py-1.5 text-xs font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors shadow-sm"
                >
                  Poster
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
