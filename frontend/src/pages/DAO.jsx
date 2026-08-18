import { useEffect, useState } from 'react';
import { Vote, Users, TrendingUp, CheckCircle2, Clock, XCircle } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function DAO() {
  const [proposals, setProposals] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Mocked data for demo
    setStats({ voters: 450, activeProposals: 2, participation: 18, executed: 12 });
    setProposals([
      { id: '1', title: 'Intégration réseau Base', status: 'ACTIVE', description: 'Ajouter le support du layer 2 Base pour les paiements.', forVotes: 150000, againstVotes: 12000, endsAt: new Date(Date.now() + 86400000) },
      { id: '2', title: 'Augmenter staking APY', status: 'EXECUTED', description: 'Passer de 1% à 2% le yield de base.', forVotes: 500000, againstVotes: 1000, endsAt: new Date(Date.now() - 86400000) }
    ]);
  }, []);

  const handleVote = (id, support) => {
    toast.success('Vote enregistré !');
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Vote className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold">REZIDET DAO</h1>
            <p className="text-[var(--color-muted)]">Gouvernance décentralisée par les holders de tokens</p>
          </div>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium">Nouvelle proposition</button>
      </div>

      {stats && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard icon={Users} label="Votants" value={stats.voters} color="blue" />
          <StatCard icon={Vote} label="Propositions actives" value={stats.activeProposals} color="indigo" />
          <StatCard icon={TrendingUp} label="Participation" value={`${stats.participation}%`} color="green" />
          <StatCard icon={CheckCircle2} label="Exécutées" value={stats.executed} color="purple" />
        </div>
      )}

      <div className="space-y-4">
        {proposals.map(p => (
          <ProposalCard key={p.id} proposal={p} onVote={handleVote} />
        ))}
      </div>
    </div>
  );
}

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-[var(--color-surface)] rounded-xl p-5 border border-[var(--color-border)]">
    <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400 mb-3`} />
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm text-[var(--color-muted)]">{label}</p>
  </div>
);

const ProposalCard = ({ proposal, onVote }) => {
  const total = proposal.forVotes + proposal.againstVotes;
  const forPercent = total > 0 ? (proposal.forVotes / total) * 100 : 0;
  const againstPercent = total > 0 ? (proposal.againstVotes / total) * 100 : 0;

  return (
    <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg">{proposal.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full font-bold ${proposal.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
              {proposal.status}
            </span>
          </div>
          <p className="text-sm text-[var(--color-muted)] mb-2">{proposal.description}</p>
          <p className="text-xs text-[var(--color-muted)] flex items-center gap-2">
            <Clock className="w-3 h-3" />
            {proposal.status === 'ACTIVE' ? 'Vote en cours' : 'Terminé'}
          </p>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-green-600 font-medium">Pour: {proposal.forVotes.toLocaleString()}</span>
          <span className="text-red-600 font-medium">Contre: {proposal.againstVotes.toLocaleString()}</span>
        </div>
        <div className="flex h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="bg-green-500" style={{ width: `${forPercent}%` }} />
          <div className="bg-red-500" style={{ width: `${againstPercent}%` }} />
        </div>
      </div>
      {proposal.status === 'ACTIVE' && (
        <div className="flex gap-2">
          <button onClick={() => onVote(proposal.id, 1)} className="flex-1 bg-green-500/10 text-green-600 border border-green-500/20 py-2 rounded-lg hover:bg-green-500 hover:text-white transition flex items-center justify-center gap-2 font-medium"><CheckCircle2 className="w-4 h-4" /> Voter Pour</button>
          <button onClick={() => onVote(proposal.id, 0)} className="flex-1 bg-red-500/10 text-red-600 border border-red-500/20 py-2 rounded-lg hover:bg-red-500 hover:text-white transition flex items-center justify-center gap-2 font-medium"><XCircle className="w-4 h-4" /> Voter Contre</button>
        </div>
      )}
    </div>
  );
};
