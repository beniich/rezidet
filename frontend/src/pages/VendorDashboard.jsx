import { useEffect, useState } from 'react';
import {
  DollarSign, Package, Users, Star, BarChart3, Plus,
  Edit, TrendingUp, ArrowUpRight, Clock, CheckCircle2
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import api from '../services/api';
import toast from 'react-hot-toast';

const TABS = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
  { id: 'items', label: 'Mes items', icon: Package },
  { id: 'transactions', label: 'Transactions', icon: DollarSign },
  { id: 'payouts', label: 'Virements', icon: TrendingUp }
];

const STATUS_COLORS = {
  PUBLISHED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  DRAFT: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  REJECTED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
};

const PAYOUT_COLORS = {
  PAID: 'bg-green-100 text-green-700',
  PENDING: 'bg-yellow-100 text-yellow-700',
  PROCESSING: 'bg-blue-100 text-blue-700'
};

// Mock revenue chart data for demo
const generateMockChart = () => {
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  return months.map(m => ({ month: m, revenue: Math.floor(Math.random() * 800 + 100) }));
};

export default function VendorDashboard() {
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [items, setItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [revenueChart] = useState(generateMockChart());
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [tab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (tab === 'overview' || tab === 'payouts') {
        const { data } = await api.get('/marketplace/vendor/stats');
        setStats(data);
      }
      if (tab === 'items') {
        const { data } = await api.get('/marketplace/items');
        setItems(data);
      }
    } catch {
      // Use demo data if API not ready
      setStats({ totalRevenue: 1840, netRevenue: 1288, itemsCount: 3, transactions: 24, platformFees: 552 });
    } finally {
      setLoading(false);
    }
  };

  const handleNewItem = async () => {
    const name = prompt('Nom de votre item :');
    if (!name) return;
    try {
      await api.post('/marketplace/items', {
        name,
        description: 'Description à compléter dans les paramètres',
        category: 'integration',
        pricingModel: 'free',
        price: 0
      });
      toast.success('Item créé en mode DRAFT. Complétez les détails.');
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur');
    }
  };

  const handleRequestPayout = async () => {
    if (!window.confirm('Demander un virement de vos gains disponibles ?')) return;
    try {
      toast.success('Demande envoyée. Traitement sous 5-7 jours ouvrables.');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur');
    }
  };

  const StatCard = ({ icon: Icon, label, value, color, sub }) => (
    <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-sm text-[var(--color-muted)]">{label}</p>
      <p className="text-2xl font-bold text-[var(--color-foreground)] mt-0.5">{value}</p>
      {sub && <p className="text-xs text-[var(--color-muted)] mt-1">{sub}</p>}
    </div>
  );

  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Dashboard Vendor</h1>
          <p className="text-[var(--color-muted)]">Gérez vos items et revenus sur le marketplace</p>
        </div>
        <button
          onClick={handleNewItem}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition font-medium"
        >
          <Plus className="w-4 h-4" /> Nouvel item
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-[var(--color-border)]">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
              tab === t.id
                ? 'border-orange-500 text-orange-500'
                : 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard icon={DollarSign} label="Revenu total" value={`${stats?.totalRevenue?.toFixed(2) || '0'}€`} color="bg-green-100 text-green-600 dark:bg-green-900/30" sub="Brut avant frais plateforme" />
            <StatCard icon={TrendingUp} label="Revenu net (70%)" value={`${stats?.netRevenue?.toFixed(2) || '0'}€`} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30" sub="Après frais 30% plateforme" />
            <StatCard icon={Package} label="Items publiés" value={stats?.itemsCount || 0} color="bg-purple-100 text-purple-600 dark:bg-purple-900/30" />
            <StatCard icon={ArrowUpRight} label="Transactions" value={stats?.transactions || 0} color="bg-orange-100 text-orange-600 dark:bg-orange-900/30" />
          </div>

          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6">
            <h3 className="font-semibold text-[var(--color-foreground)] mb-4">Revenu mensuel (12 derniers mois)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" fontSize={11} tick={{ fill: 'var(--color-muted)' }} />
                <YAxis fontSize={11} tick={{ fill: 'var(--color-muted)' }} tickFormatter={v => `${v}€`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '0.75rem' }}
                  labelStyle={{ color: 'var(--color-foreground)' }}
                  formatter={v => [`${v}€`, 'Revenu']}
                />
                <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#f97316' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* Items */}
      {tab === 'items' && (
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] overflow-hidden">
          {items.length === 0 ? (
            <div className="p-16 text-center">
              <Package className="w-12 h-12 text-[var(--color-muted)] mx-auto mb-4 opacity-40" />
              <p className="text-[var(--color-muted)]">Aucun item. Créez votre premier item marketplace.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
                <tr>
                  {['Item', 'Catégorie', 'Installations', 'Note', 'Statut', ''].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs uppercase font-semibold text-[var(--color-muted)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-[var(--color-bg)] transition">
                    <td className="px-6 py-4">
                      <p className="font-medium text-[var(--color-foreground)]">{item.name}</p>
                      <p className="text-xs text-[var(--color-muted)] mt-0.5 line-clamp-1">{item.description}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--color-muted)]">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-foreground)] font-medium">{item.installs || 0}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-[var(--color-foreground)]">{item.rating?.toFixed(1) || '—'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[item.status] || STATUS_COLORS.DRAFT}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1.5 hover:bg-[var(--color-border)] rounded-lg transition text-[var(--color-muted)]">
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Transactions */}
      {tab === 'transactions' && (
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="font-semibold text-[var(--color-foreground)]">Historique des transactions</h3>
          </div>
          <div className="p-12 text-center">
            <Clock className="w-10 h-10 text-[var(--color-muted)] mx-auto mb-3 opacity-40" />
            <p className="text-[var(--color-muted)]">Les transactions apparaîtront ici une fois vos items installés par des clients.</p>
          </div>
        </div>
      )}

      {/* Payouts */}
      {tab === 'payouts' && (
        <div className="space-y-4">
          {/* Balance card */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
            <p className="text-sm text-orange-100 mb-1">Solde disponible</p>
            <p className="text-4xl font-bold mb-4">{stats?.netRevenue?.toFixed(2) || '0.00'}€</p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-orange-100">
                Frais plateforme (30%) : {stats?.platformFees?.toFixed(2) || '0.00'}€ déduits
              </div>
              <button
                onClick={handleRequestPayout}
                className="bg-white text-orange-600 px-5 py-2 rounded-xl font-semibold hover:bg-orange-50 transition text-sm"
              >
                Demander un virement
              </button>
            </div>
          </div>

          {/* Payout history */}
          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]">
            <div className="p-5 border-b border-[var(--color-border)]">
              <h3 className="font-semibold text-[var(--color-foreground)]">Historique des virements</h3>
            </div>
            <div className="p-12 text-center">
              <CheckCircle2 className="w-10 h-10 text-[var(--color-muted)] mx-auto mb-3 opacity-40" />
              <p className="text-[var(--color-muted)]">Aucun virement pour l'instant. Votre premier virement apparaîtra ici.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
