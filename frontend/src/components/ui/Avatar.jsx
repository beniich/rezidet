import clsx from 'clsx';

const sizes = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl'
};

const palette = [
  'bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-orange-500',
  'bg-pink-500', 'bg-indigo-500', 'bg-red-500', 'bg-teal-500',
  'bg-amber-500', 'bg-cyan-500'
];

export function Avatar({ user, size = 'md', className }) {
  if (!user) return null;
  const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || '??';
  const colorIdx = (user.id?.charCodeAt(0) ?? 0) % palette.length;

  return (
    <div
      title={`${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()}
      className={clsx(
        'rounded-full flex items-center justify-center text-white font-bold shrink-0 overflow-hidden',
        sizes[size],
        !user.avatar && palette[colorIdx],
        className
      )}
    >
      {user.avatar
        ? <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
        : initials
      }
    </div>
  );
}

export function AvatarGroup({ users = [], max = 4, size = 'sm' }) {
  const visible = users.slice(0, max);
  const remaining = users.length - visible.length;
  return (
    <div className="flex -space-x-2">
      {visible.map((u, i) => (
        <Avatar key={u.id ?? i} user={u} size={size} className="border-2 border-white dark:border-slate-800" />
      ))}
      {remaining > 0 && (
        <div className={clsx(
          'rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center',
          'text-slate-600 dark:text-slate-300 font-bold border-2 border-white dark:border-slate-800',
          sizes[size]
        )}>
          +{remaining}
        </div>
      )}
    </div>
  );
}
