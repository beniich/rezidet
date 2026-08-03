import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, CheckCircle2, User, Wrench, MessageSquare, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { useState } from 'react';
import { useCollaboration } from '../../hooks/useCollaboration';
import { useAuthStore } from '../../store/authStore';

export function WorkOrderDrawer({ workOrder, open, onClose, onUpdate }) {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuthStore();
  const { broadcastChange, presence } = useCollaboration(user?.organizationId, user);

  if (!workOrder) return null;

  const handleStatusChange = (newStatus) => {
    onUpdate(workOrder.id, { status: newStatus });
    broadcastChange('workorder_status', { id: workOrder.id, status: newStatus });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    // Mock for now. In real app, call API
    setNewComment('');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%', boxShadow: '-20px 0 25px -5px rgba(0, 0, 0, 0)' }}
            animate={{ x: 0, boxShadow: '-20px 0 25px -5px rgba(0, 0, 0, 0.1)' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col border-l border-slate-200 dark:border-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-500">#{workOrder.id.substring(0, 8)}</span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {workOrder.status}
                </span>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{workOrder.title}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{workOrder.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Calendar className="w-3 h-3" /> Échéance</div>
                  <div className="font-medium text-sm text-slate-900 dark:text-white">
                    {new Date(workOrder.dueDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Wrench className="w-3 h-3" /> Actif</div>
                  <div className="font-medium text-sm text-slate-900 dark:text-white">
                    {workOrder.asset?.name || 'Non spécifié'}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Assignation</h3>
                {workOrder.assignedToUser ? (
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <Avatar user={workOrder.assignedToUser} />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {workOrder.assignedToUser.firstName} {workOrder.assignedToUser.lastName}
                      </div>
                      <div className="text-xs text-slate-500">{workOrder.assignedToUser.email}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-sm text-slate-500">Non assigné</span>
                    <Button variant="outline" size="xs">Assigner</Button>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
                  Commentaires
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs px-2 py-0.5 rounded-full">
                    {workOrder.comments?.length || 0}
                  </span>
                </h3>
                
                <div className="space-y-4 mb-4">
                  {workOrder.comments?.length > 0 ? (
                    workOrder.comments.map((comment, idx) => (
                      <div key={idx} className="flex gap-3">
                        <Avatar user={comment.user} size="sm" />
                        <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg rounded-tl-none border border-slate-200 dark:border-slate-800">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                              {comment.user.firstName}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(comment.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{comment.text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400 text-center py-4">Aucun commentaire</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                    className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    onKeyDown={e => e.key === 'Enter' && handleAddComment()}
                  />
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    Envoyer
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleStatusChange(workOrder.status === 'IN_PROGRESS' ? 'PENDING' : 'IN_PROGRESS')}
              >
                {workOrder.status === 'IN_PROGRESS' ? 'Mettre en attente' : 'Démarrer'}
              </Button>
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => handleStatusChange('COMPLETED')}
                disabled={workOrder.status === 'COMPLETED'}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Marquer résolu
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
