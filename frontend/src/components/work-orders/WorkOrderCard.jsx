import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, AlertTriangle, MessageSquare, Wrench } from 'lucide-react';
import clsx from 'clsx';
import { Avatar } from '../ui/Avatar';

export function WorkOrderCard({ workOrder, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: workOrder.id, data: workOrder });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const priorityColors = {
    LOW: 'bg-slate-100 text-slate-700',
    MEDIUM: 'bg-blue-100 text-blue-700',
    HIGH: 'bg-orange-100 text-orange-700',
    CRITICAL: 'bg-red-100 text-red-700 border border-red-200'
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(workOrder)}
      className={clsx(
        'bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700',
        'shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing mb-3 group select-none'
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={clsx('text-[10px] font-bold px-2 py-0.5 rounded-full', priorityColors[workOrder.priority] || priorityColors.LOW)}>
          {workOrder.priority}
        </span>
        <span className="text-xs text-slate-400 font-mono">#{workOrder.id.substring(0,6)}</span>
      </div>
      
      <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-1.5 leading-tight group-hover:text-blue-600 transition-colors">
        {workOrder.title}
      </h4>
      
      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
        <Wrench className="w-3.5 h-3.5" />
        <span className="truncate max-w-[140px]">{workOrder.asset?.name || 'Général'}</span>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1" title="Date d'échéance">
            <Clock className="w-3 h-3" />
            <span>{new Date(workOrder.dueDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}</span>
          </div>
          {workOrder._count?.comments > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              <span>{workOrder._count.comments}</span>
            </div>
          )}
        </div>
        
        {workOrder.assignedToUser && (
          <Avatar user={workOrder.assignedToUser} size="xs" className="ring-2 ring-white dark:ring-slate-800 shadow-sm" />
        )}
      </div>
    </div>
  );
}
