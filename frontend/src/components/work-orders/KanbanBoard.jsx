import { useState, useMemo, useEffect } from 'react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { WorkOrderCard } from './WorkOrderCard';
import { useCollaboration } from '../../hooks/useCollaboration';
import { useAuthStore } from '../../store/authStore';
import { Avatar } from '../ui/Avatar';

const COLUMNS = [
  { id: 'PENDING', title: 'À faire' },
  { id: 'IN_PROGRESS', title: 'En cours' },
  { id: 'COMPLETED', title: 'Terminé' },
  { id: 'CANCELLED', title: 'Annulé' }
];

export function KanbanBoard({ workOrders = [], onStatusChange, onWorkOrderClick }) {
  const [items, setItems] = useState(workOrders);
  const [activeItem, setActiveItem] = useState(null);
  const { user } = useAuthStore();
  const { editing } = useCollaboration(user?.organizationId, user);

  useEffect(() => {
    setItems(workOrders);
  }, [workOrders]);

  const columns = useMemo(() => {
    const cols = { PENDING: [], IN_PROGRESS: [], COMPLETED: [], CANCELLED: [] };
    items.forEach(wo => {
      if (cols[wo.status]) cols[wo.status].push(wo);
      else cols.PENDING.push(wo); // fallback
    });
    return cols;
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (e) => {
    const { active } = e;
    setActiveItem(items.find(i => i.id === active.id));
  };

  const handleDragOver = (e) => {
    const { active, over } = e;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find columns
    const activeWo = items.find(i => i.id === activeId);
    if (!activeWo) return;

    const overCol = COLUMNS.find(c => c.id === overId)?.id || items.find(i => i.id === overId)?.status;
    
    if (activeWo.status !== overCol && overCol) {
      setItems(prev => prev.map(wo => wo.id === activeId ? { ...wo, status: overCol } : wo));
    }
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    setActiveItem(null);
    if (!over) return;
    
    const activeWo = items.find(i => i.id === active.id);
    const originalWo = workOrders.find(i => i.id === active.id);
    
    if (activeWo && originalWo && activeWo.status !== originalWo.status) {
      onStatusChange(activeWo.id, activeWo.status);
    }
  };

  return (
    <div className="flex h-full gap-4 overflow-x-auto pb-4 px-1">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {COLUMNS.map(col => (
          <div key={col.id} className="flex-1 min-w-[300px] max-w-[350px] flex flex-col bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            {/* Column Header */}
            <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                {col.title}
                <span className="bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs px-2 py-0.5 rounded-full font-medium">
                  {columns[col.id].length}
                </span>
              </h3>
            </div>

            {/* Column Body */}
            <div className="flex-1 p-3 overflow-y-auto">
              <SortableContext
                id={col.id}
                items={columns[col.id].map(i => i.id)}
                strategy={verticalListSortingStrategy}
              >
                {columns[col.id].map(wo => {
                  const isEditing = editing.get(`workorder:${wo.id}`);
                  return (
                    <div key={wo.id} className="relative">
                      {isEditing && isEditing.userId !== user?.id && (
                        <div className="absolute -top-3 -right-2 z-10 flex items-center gap-1 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse">
                          <Avatar user={isEditing.userInfo} size="xs" className="w-3 h-3" />
                          édite
                        </div>
                      )}
                      <WorkOrderCard workOrder={wo} onClick={onWorkOrderClick} />
                    </div>
                  );
                })}
              </SortableContext>
            </div>
          </div>
        ))}

        <DragOverlay>
          {activeItem ? <WorkOrderCard workOrder={activeItem} onClick={() => {}} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
