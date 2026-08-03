import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Check, Reply, Trash2, Smile } from 'lucide-react';
import api from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';
import io from 'socket.io-client';

export function AssetComments({ assetId, assetName }) {
  const [comments, setComments] = useState([]);
  const [team, setTeam] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [mentionSearch, setMentionSearch] = useState(null);
  const { user } = useAuthStore();
  const inputRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!assetId) return;
    load();
    loadTeam();
    const base = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8081';
    const s = io(base);
    socketRef.current = s;
    s.emit('join-asset', { assetId });
    s.on('comment:new', c => setComments(prev => [...prev, c]));
    s.on('comment:deleted', ({ id }) => setComments(prev => prev.filter(c => c.id !== id)));
    s.on('comment:resolved', ({ id }) => setComments(prev => prev.map(c => c.id === id ? { ...c, resolved: true } : c)));
    return () => { s.emit('leave-asset', { assetId }); s.disconnect(); };
  }, [assetId]);

  const load = async () => {
    try {
      const { data } = await api.get(`/assets/${assetId}/comments`);
      setComments(data);
    } catch {}
  };

  const loadTeam = async () => {
    try {
      const { data } = await api.get('/team');
      setTeam(data);
    } catch {}
  };

  const handleChange = (e) => {
    const v = e.target.value;
    setNewComment(v);
    const lastAt = v.lastIndexOf('@');
    if (lastAt >= 0 && !v.slice(lastAt).includes(' ')) {
      setMentionSearch({ query: v.slice(lastAt + 1), position: lastAt });
    } else {
      setMentionSearch(null);
    }
  };

  const insertMention = (u) => {
    const before = newComment.slice(0, mentionSearch.position);
    const after = newComment.slice(mentionSearch.position + mentionSearch.query.length + 1);
    setNewComment(`${before}@${u.firstName} ${u.lastName} ${after}`);
    setMentionSearch(null);
    inputRef.current?.focus();
  };

  const extractMentions = (text) => {
    return team
      .filter(u => text.includes(`@${u.firstName} ${u.lastName}`))
      .map(u => u.id);
  };

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await api.post(`/assets/${assetId}/comments`, {
        content: newComment,
        parentId: replyTo?.id || null,
        mentions: extractMentions(newComment)
      });
      setNewComment('');
      setReplyTo(null);
    } catch { toast.error('Erreur lors de l\'envoi'); }
  };

  const handleResolve = async (id) => {
    await api.patch(`/assets/comments/${id}/resolve`).catch(() => {});
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce commentaire ?')) return;
    await api.delete(`/assets/comments/${id}`).catch(() => {});
  };

  const roots = comments.filter(c => !c.parentId);
  const getReplies = (pid) => comments.filter(c => c.parentId === pid);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-4 border-b flex items-center gap-2 bg-slate-50">
        <MessageCircle className="w-4 h-4 text-slate-500" />
        <h3 className="font-semibold text-slate-700 text-sm">
          Commentaires ({comments.filter(c => !c.resolved).length})
        </h3>
      </div>

      <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
        {roots.length === 0 ? (
          <p className="text-center text-slate-400 py-6 text-sm">Aucun commentaire.</p>
        ) : roots.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            replies={getReplies(comment.id)}
            onReply={() => setReplyTo(comment)}
            onResolve={() => handleResolve(comment.id)}
            onDelete={() => handleDelete(comment.id)}
            currentUser={user}
          />
        ))}
      </div>

      <AnimatePresence>
        {replyTo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-2 bg-blue-50 border-t text-xs flex items-center justify-between"
          >
            <span className="text-blue-700">↩ Réponse à <strong>{replyTo.author?.firstName}</strong></span>
            <button onClick={() => setReplyTo(null)} className="text-blue-500 hover:text-blue-700">Annuler</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mentionSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 py-2 bg-slate-50 border-t"
          >
            {team
              .filter(u => `${u.firstName} ${u.lastName}`.toLowerCase().includes(mentionSearch.query.toLowerCase()))
              .slice(0, 5)
              .map(u => (
                <button key={u.id} onClick={() => insertMention(u)}
                  className="w-full flex items-center gap-2 p-1.5 hover:bg-white rounded text-sm text-left"
                >
                  <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 text-[10px] flex items-center justify-center font-bold">
                    {u.firstName[0]}
                  </div>
                  {u.firstName} {u.lastName}
                </button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-3 border-t flex gap-2">
        <input
          ref={inputRef}
          value={newComment}
          onChange={handleChange}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
          placeholder={`Commenter... (@mention)`}
          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-400 outline-none"
        />
        <button
          onClick={handleSubmit}
          disabled={!newComment.trim()}
          className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-40 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function CommentItem({ comment, replies, onReply, onResolve, onDelete, currentUser }) {
  const [showReplies, setShowReplies] = useState(false);

  const renderContent = (text) =>
    text.split(/(@\w+ \w+)/g).map((part, i) =>
      part.startsWith('@')
        ? <span key={i} className="text-blue-600 font-medium bg-blue-50 px-1 rounded text-xs">{part}</span>
        : <span key={i}>{part}</span>
    );

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      className={`p-3 rounded-xl ${comment.resolved ? 'bg-green-50 opacity-60' : 'bg-slate-50'}`}
    >
      <div className="flex items-start gap-2">
        <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 text-xs flex items-center justify-center font-bold shrink-0">
          {comment.author?.firstName?.[0] || '?'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-800">{comment.author?.firstName} {comment.author?.lastName}</span>
            <span className="text-[10px] text-slate-400">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: fr })}
            </span>
            {comment.resolved && (
              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Résolu</span>
            )}
          </div>
          <p className="text-sm text-slate-700">{renderContent(comment.content)}</p>
          <div className="flex items-center gap-3 mt-2 text-[11px]">
            <button onClick={onReply} className="text-slate-500 hover:text-slate-700 flex items-center gap-1">
              <Reply className="w-3 h-3" />Répondre
            </button>
            {replies.length > 0 && (
              <button onClick={() => setShowReplies(!showReplies)} className="text-blue-500">
                {showReplies ? 'Masquer' : `${replies.length} réponse${replies.length > 1 ? 's' : ''}`}
              </button>
            )}
            {!comment.resolved && currentUser?.id !== comment.authorId && (
              <button onClick={onResolve} className="text-green-600 flex items-center gap-1">
                <Check className="w-3 h-3" />Résoudre
              </button>
            )}
            {currentUser?.id === comment.authorId && (
              <button onClick={onDelete} className="text-red-400 hover:text-red-600 ml-auto">
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
          {showReplies && replies.length > 0 && (
            <div className="mt-2 space-y-2 border-l-2 border-slate-200 pl-3">
              {replies.map(r => (
                <CommentItem key={r.id} comment={r} replies={[]} onReply={() => {}} onResolve={() => {}} onDelete={() => {}} currentUser={currentUser} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
