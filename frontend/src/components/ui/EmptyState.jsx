import { Button } from './Button';

export function EmptyState({ icon: Icon, title, description, action, actionLabel, illustration }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {illustration ?? (Icon && (
        <div className="w-16 h-16 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl flex items-center justify-center mb-5 shadow-sm">
          <Icon className="w-8 h-8 text-[var(--color-muted)]" />
        </div>
      ))}
      <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--color-muted)] max-w-sm mb-6">{description}</p>
      )}
      {action && actionLabel && (
        <Button onClick={action}>{actionLabel}</Button>
      )}
    </div>
  );
}
