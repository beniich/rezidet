import { useCollaboration } from '../hooks/useCollaboration';
import { AvatarGroup } from './ui/Avatar';
import { motion } from 'framer-motion';

export function PresenceBar({ organizationId, currentUser }) {
  const { presence } = useCollaboration(organizationId, currentUser);
  const online = [...presence.values()].filter(u => u.status === 'online' && u.id !== currentUser?.id);

  if (online.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full shadow-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <AvatarGroup users={online} max={5} size="xs" />
      <span className="text-xs text-[var(--color-muted)] font-medium">
        {online.length} en ligne
      </span>
    </motion.div>
  );
}
