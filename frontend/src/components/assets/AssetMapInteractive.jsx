import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RotateCcw, Lock, Unlock, Move } from 'lucide-react';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';
import api from '../../services/api';

const GRID = 20;
const CANVAS_W = 900;
const CANVAS_H = 550;

const CATEGORY_ICONS = {
  HVAC: '❄️', Electrical: '⚡', IT: '💻', Security: '🔒',
  Furniture: '🪑', Plumbing: '🚿', Lighting: '💡'
};

const STATUS_COLORS = {
  OPERATIONAL: '#3b82f6',
  MAINTENANCE:  '#f97316',
  BREAKDOWN:    '#ef4444',
  DECOMMISSIONED: '#94a3b8'
};

function snap(val) {
  return Math.round(val / GRID) * GRID;
}

export function AssetMapInteractive({ building, spaces = [], assets = [], onSave, readOnly = false }) {
  const canvasRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [positions, setPositions] = useState({});
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const init = {};
    assets.forEach((a, i) => {
      init[a.id] = { x: a.positionX ?? 60 + (i % 10) * 80, y: a.positionY ?? 60 + Math.floor(i / 10) * 90 };
    });
    setPositions(init);
  }, [assets]);

  const onMouseDown = (e, asset) => {
    if (!editMode) return;
    e.preventDefault();
    setDragging(asset);
    const rect = canvasRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left - (positions[asset.id]?.x ?? 0),
      y: e.clientY - rect.top  - (positions[asset.id]?.y ?? 0)
    });
    setSelected(asset.id);
  };

  const onMouseMove = (e) => {
    if (!dragging || !editMode) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const nx = Math.max(0, Math.min(CANVAS_W - 40, snap(e.clientX - rect.left - dragOffset.x)));
    const ny = Math.max(0, Math.min(CANVAS_H - 40, snap(e.clientY - rect.top  - dragOffset.y)));
    setPositions(p => ({ ...p, [dragging.id]: { x: nx, y: ny } }));
    setHasChanges(true);
  };

  const onMouseUp = () => setDragging(null);

  const handleSave = async () => {
    try {
      const updates = Object.entries(positions).map(([id, pos]) => ({ assetId: id, positionX: pos.x, positionY: pos.y }));
      await api.post('/assets/positions', { positions: updates });
      toast.success('Positions sauvegardées ✅');
      setHasChanges(false);
      onSave?.(positions);
    } catch { toast.error('Erreur lors de la sauvegarde'); }
  };

  const handleReset = () => {
    const init = {};
    assets.forEach((a, i) => {
      init[a.id] = { x: a.positionX ?? 60 + (i % 10) * 80, y: a.positionY ?? 60 + Math.floor(i / 10) * 90 };
    });
    setPositions(init);
    setHasChanges(false);
  };

  const selectedAsset = selected ? assets.find(a => a.id === selected) : null;

  return (
    <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">{building?.name ?? 'Plan interactif'}</h3>
          <span className="text-xs text-[var(--color-muted)] bg-[var(--color-bg)] border border-[var(--color-border)] px-2 py-0.5 rounded-full">
            {assets.length} équipement{assets.length > 1 ? 's' : ''}
          </span>
        </div>
        {!readOnly && (
          <div className="flex items-center gap-2">
            <Button variant={editMode ? 'primary' : 'secondary'} size="sm"
              leftIcon={editMode ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              onClick={() => setEditMode(e => !e)}>
              {editMode ? 'Verrouiller' : 'Modifier'}
            </Button>
            {editMode && <>
              <Button variant="ghost" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="w-4 h-4" />}>Reset</Button>
              <Button size="sm" disabled={!hasChanges} onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>Sauvegarder</Button>
            </>}
          </div>
        )}
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="relative select-none"
        style={{ height: CANVAS_H, background: '#f8fafc', cursor: editMode ? 'crosshair' : 'default' }}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: '100%', height: CANVAS_H }}>
          <defs>
            <pattern id="dot-grid" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#cbd5e1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>

        {/* Building outline */}
        <div className="absolute inset-6 border-2 border-dashed border-slate-300 rounded-xl pointer-events-none" />

        {/* Spaces (light overlay) */}
        {spaces.map((s, i) => {
          const x = 80 + (i % 8) * 95;
          const y = 80 + Math.floor(i / 8) * 110;
          return (
            <div key={s.id} className="absolute rounded-lg border border-slate-200 bg-white/70"
              style={{ left: x, top: y, width: 80, height: 85 }}>
              <p className="text-[9px] font-bold text-center pt-2 text-slate-600 truncate px-1">{s.name}</p>
              <p className="text-[8px] text-center text-slate-400">{s.occupancy ?? 0}/{s.capacity ?? 0}</p>
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: s.status === 'occupied' ? '#f97316' : '#22c55e' }} />
            </div>
          );
        })}

        {/* Assets */}
        {assets.map(asset => {
          const pos = positions[asset.id];
          if (!pos) return null;
          const isSelected = selected === asset.id;
          const isDraggingThis = dragging?.id === asset.id;
          return (
            <motion.div
              key={asset.id}
              className="absolute flex items-center justify-center rounded-xl text-white font-bold text-base shadow-md"
              style={{
                left: pos.x, top: pos.y, width: 44, height: 44,
                background: STATUS_COLORS[asset.status] ?? '#64748b',
                cursor: editMode ? 'move' : 'pointer',
                zIndex: isDraggingThis ? 50 : isSelected ? 10 : 1,
                outline: isSelected ? '3px solid #3b82f6' : 'none',
                outlineOffset: 3,
                transform: isDraggingThis ? 'scale(1.15)' : 'scale(1)',
                transition: isDraggingThis ? 'none' : 'transform 0.15s'
              }}
              onMouseDown={e => onMouseDown(e, asset)}
              onClick={() => setSelected(asset.id)}
            >
              {CATEGORY_ICONS[asset.category] ?? '📦'}
              {asset.healthScore < 50 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
              )}
            </motion.div>
          );
        })}

        {/* Selected asset info panel */}
        {selectedAsset && (
          <div className="absolute bottom-4 left-4 bg-[var(--color-surface)] rounded-xl p-4 shadow-xl border border-[var(--color-border)] w-60 z-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm">{selectedAsset.name}</h4>
              <button onClick={() => setSelected(null)} className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] text-lg leading-none">×</button>
            </div>
            <p className="text-xs text-[var(--color-muted)] mb-3 font-mono">{selectedAsset.serialNumber ?? '—'}</p>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <span className="text-[var(--color-muted)]">Statut:</span>
              <span className="font-medium">{selectedAsset.status}</span>
              <span className="text-[var(--color-muted)]">Santé:</span>
              <span className="font-medium">{selectedAsset.healthScore ?? '—'}%</span>
              <span className="text-[var(--color-muted)]">Position:</span>
              <span className="font-mono">{positions[selectedAsset.id]?.x},{positions[selectedAsset.id]?.y}</span>
            </div>
          </div>
        )}

        {/* Edit mode badge */}
        {editMode && (
          <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow">
            <Move className="w-3 h-3" /> Mode édition activé
          </div>
        )}

        {/* Unsaved changes badge */}
        {hasChanges && (
          <div className="absolute top-3 right-3 bg-amber-100 border border-amber-300 text-amber-800 px-3 py-1.5 rounded-lg text-xs font-medium shadow">
            ● Non sauvegardé
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg p-2.5 text-xs space-y-1 border border-[var(--color-border)]">
          {Object.entries(STATUS_COLORS).map(([k, c]) => (
            <div key={k} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: c }} />
              <span className="text-[var(--color-muted)]">{k}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
