import { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Launchpad() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Mock
    setProjects([
      { id: '1', name: 'DeFi Protocol', symbol: 'DFP', status: 'LIVE', description: 'Next generation decentralized finance.', totalRaised: 150000, hardCap: 500000, softCap: 100000, pricePerToken: 0.1, tgePercent: 20, vestingMonths: 12, participants: 342 }
    ]);
  }, []);

  const handleContribute = (id, amount) => {
    toast.success(`✅ Contribution de ${amount} USDC !`);
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <Rocket className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-2xl font-bold">Launchpad IDO</h1>
          <p className="text-[var(--color-muted)]">Investissez dans les meilleurs projets early-stage</p>
        </div>
      </div>
      <div className="space-y-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} onContribute={handleContribute} />
        ))}
      </div>
    </div>
  );
}

const ProjectCard = ({ project, onContribute }) => {
  const [amount, setAmount] = useState('100');
  const progress = (project.totalRaised / project.hardCap) * 100;
  
  return (
    <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] overflow-hidden">
      <div className="bg-purple-50 dark:bg-purple-900/10 p-4 flex items-center justify-between border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white dark:bg-purple-800 rounded-full flex items-center justify-center text-2xl font-bold text-purple-600 dark:text-purple-100 shadow-sm border border-purple-100 dark:border-purple-700">
            {project.symbol[0]}
          </div>
          <div>
            <h3 className="font-bold text-lg">{project.name}</h3>
            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">{project.symbol}</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
          {project.status}
        </span>
      </div>
      <div className="p-6">
        <p className="text-sm text-[var(--color-muted)] mb-4">{project.description}</p>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>${project.totalRaised.toLocaleString()} / ${project.hardCap.toLocaleString()}</span>
            <span className="font-medium text-purple-600">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6 text-center">
          <div className="p-3 bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-muted)] mb-1">Prix</p>
            <p className="font-bold">${project.pricePerToken}</p>
          </div>
          <div className="p-3 bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-muted)] mb-1">TGE</p>
            <p className="font-bold">{project.tgePercent}%</p>
          </div>
          <div className="p-3 bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-muted)] mb-1">Vesting</p>
            <p className="font-bold">{project.vestingMonths}m</p>
          </div>
        </div>
        {project.status === 'LIVE' && (
          <div className="flex gap-2">
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-1/3 px-4 py-3 border border-[var(--color-border)] bg-[var(--color-bg)] rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" min="100" />
            <button onClick={() => onContribute(project.id, amount)} className="flex-1 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-bold transition">Contribuer</button>
          </div>
        )}
      </div>
    </div>
  );
};
