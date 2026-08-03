import { useEffect, useState } from 'react';
import { Search, Download, Star, Package } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const categories = [
  { id: 'integration', name: 'Intégrations', emoji: '🔌' },
  { id: 'template', name: 'Templates', emoji: '📋' },
  { id: 'workflow', name: 'Workflows', emoji: '⚙️' },
  { id: 'report', name: 'Rapports', emoji: '📊' },
  { id: 'service', name: 'Services', emoji: '🎯' }
];

export default function Marketplace() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/marketplace/items', {
      params: { category: category !== 'all' ? category : undefined, search: search || undefined }
    }).then(({ data }) => {
      setItems(data);
      setLoading(false);
    }).catch(() => {
      setItems([]);
      setLoading(false);
    });
  }, [category, search]);

  const handleInstall = async (itemId) => {
    try {
      const { data } = await api.post(`/marketplace/items/${itemId}/install`, {});
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.success('✅ Installé avec succès !');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur lors de l\'installation');
    }
  };

  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Marketplace</h1>
        <p className="text-[var(--color-muted)]">Intégrations, templates et services pour étendre votre espace de travail</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)]" />
        <input
          placeholder="Rechercher dans le marketplace..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        <button
          onClick={() => setCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${
            category === 'all'
              ? 'bg-orange-500 text-white'
              : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] hover:border-orange-400'
          }`}
        >
          Tout
        </button>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${
              category === c.id
                ? 'bg-orange-500 text-white'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] hover:border-orange-400'
            }`}
          >
            {c.emoji} {c.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-12 h-12 mx-auto text-[var(--color-muted)] mb-4 opacity-40" />
          <p className="text-[var(--color-muted)]">Aucun item disponible pour le moment</p>
          <p className="text-sm text-[var(--color-muted)] mt-1 opacity-60">Les vendors peuvent soumettre des intégrations ici</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(item => (
            <div key={item.id} className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden hover:shadow-lg hover:border-orange-400/50 transition group">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 flex items-center justify-center text-5xl">
                {item.iconUrl ? (
                  <img src={item.iconUrl} alt={item.name} className="w-16 h-16 object-contain" />
                ) : '📦'}
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">{item.category}</span>
                  <div className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {item.rating?.toFixed(1) || '—'}
                  </div>
                </div>

                <h3 className="font-bold text-[var(--color-foreground)] mb-1 group-hover:text-orange-500 transition">{item.name}</h3>
                <p className="text-sm text-[var(--color-muted)] line-clamp-2 mb-3">{item.description}</p>

                <div className="flex items-center justify-between text-xs text-[var(--color-muted)] mb-3">
                  <span>Par {item.vendor?.name || 'Anonyme'}</span>
                  <span>{item.installs?.toLocaleString() || 0} installations</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
                  <div>
                    {item.price === 0 ? (
                      <span className="text-green-500 font-bold text-sm">Gratuit</span>
                    ) : (
                      <span className="font-bold text-[var(--color-foreground)]">
                        {item.price?.toFixed(2)}€
                        {item.pricingModel === 'subscription' && <span className="text-xs text-[var(--color-muted)] font-normal">/mois</span>}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleInstall(item.id)}
                    className="flex items-center gap-1.5 bg-orange-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-orange-600 transition"
                  >
                    <Download className="w-3 h-3" />
                    Installer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
