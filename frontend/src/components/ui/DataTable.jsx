import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search, Download } from 'lucide-react';
import { Button } from './Button';
import { EmptyState } from './EmptyState';
import clsx from 'clsx';

export function DataTable({
  data = [],
  columns = [],
  searchable = true,
  selectable = false,
  pageSize = 25,
  onExport,
  emptyState,
  onRowClick
}) {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(row =>
      columns.some(col => String(row[col.key] ?? '').toLowerCase().includes(q))
    );
  }, [data, search, columns]);

  const sorted = useMemo(() => {
    if (!sortConfig.key) return filtered;
    const { key, direction } = sortConfig;
    return [...filtered].sort((a, b) => {
      const aVal = a[key], bVal = b[key];
      if (aVal === bVal) return 0;
      return (aVal > bVal ? 1 : -1) * (direction === 'asc' ? 1 : -1);
    });
  }, [filtered, sortConfig]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    setPage(1);
  };

  const toggleSelect = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const allSelected = paginated.length > 0 && paginated.every(r => selected.has(r.id));

  return (
    <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] overflow-hidden">
      {/* Toolbar */}
      {(searchable || onExport || selectable) && (
        <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-3">
          {searchable && (
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)]" />
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Rechercher..."
                className="w-full pl-9 pr-3 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-foreground)] focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none placeholder:text-[var(--color-muted)]"
              />
            </div>
          )}
          {selectable && selected.size > 0 && (
            <span className="text-sm text-[var(--color-muted)] shrink-0">
              {selected.size} sélectionné{selected.size > 1 ? 's' : ''}
            </span>
          )}
          {onExport && (
            <Button variant="secondary" size="sm" leftIcon={<Download className="w-4 h-4" />} onClick={onExport}>
              Exporter
            </Button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
            <tr>
              {selectable && (
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={e => setSelected(e.target.checked ? new Set(paginated.map(r => r.id)) : new Set())}
                    className="rounded"
                  />
                </th>
              )}
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  className={clsx(
                    'px-4 py-3 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider select-none',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                    col.sortable !== false && 'cursor-pointer hover:text-[var(--color-foreground)] transition'
                  )}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortConfig.key === col.key && (
                      sortConfig.direction === 'asc'
                        ? <ChevronUp className="w-3 h-3" />
                        : <ChevronDown className="w-3 h-3" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  {emptyState ?? <EmptyState title="Aucun résultat" description="Aucune donnée à afficher" />}
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <tr
                  key={row.id ?? i}
                  className={clsx(
                    'transition hover:bg-[var(--color-bg)]',
                    onRowClick && 'cursor-pointer',
                    selected.has(row.id) && 'bg-blue-500/5'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <input type="checkbox" checked={selected.has(row.id)} onChange={() => toggleSelect(row.id)} className="rounded" />
                    </td>
                  )}
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className={clsx(
                        'px-4 py-3 text-sm text-[var(--color-foreground)]',
                        col.align === 'right' && 'text-right',
                        col.align === 'center' && 'text-center'
                      )}
                    >
                      {col.render ? col.render(row) : (row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-[var(--color-border)] flex items-center justify-between text-sm">
          <span className="text-[var(--color-muted)]">
            {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} sur {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Précédent</Button>
            <span className="px-3 text-[var(--color-muted)]">{page}/{totalPages}</span>
            <Button variant="ghost" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Suivant</Button>
          </div>
        </div>
      )}
    </div>
  );
}
