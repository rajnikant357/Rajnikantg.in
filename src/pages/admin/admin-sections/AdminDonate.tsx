import React, { useState } from 'react';
import { Save, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { useAdminData, DonateTier, SponsorTier } from '../../../context/AdminDataContext';

interface Props { isDarkMode: boolean; }

export const AdminDonate: React.FC<Props> = ({ isDarkMode }) => {
  const { data, updateDonateTiers, updateSponsorTiers } = useAdminData();
  const [donateTiers, setDonateTiers] = useState<DonateTier[]>([...data.donateTiers]);
  const [sponsorTiers, setSponsorTiers] = useState<SponsorTier[]>([...data.sponsorTiers]);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'donate' | 'sponsor'>('donate');

  const inputCls = `bg-transparent border-0 border-b-2 w-full px-1 py-0.5 font-hand text-lg outline-none transition-colors ${
    isDarkMode
      ? 'border-slate-600 focus:border-blue-400 text-slate-200 placeholder:text-slate-500'
      : 'border-slate-300 focus:border-blue-500 text-slate-800 placeholder:text-slate-400'
  } placeholder:italic`;

  const labelCls = `font-hand text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`;

  const handleSave = () => {
    updateDonateTiers(donateTiers);
    updateSponsorTiers(sponsorTiers);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const emptyDonateTier = (): DonateTier => ({
    id: `tier-${Date.now()}`,
    name: '',
    price: '',
    emoji: '🎁',
    description: '',
    perks: [''],
  });

  const emptySponsorTier = (): SponsorTier => ({
    id: `sponsor-${Date.now()}`,
    name: '',
    price: '',
    emoji: '⭐',
    description: '',
    perks: [''],
    highlight: false,
  });

  // ── Donate Tier Card ────────────────────────────────────────────────────────
  const renderDonateTierCard = (tier: DonateTier, idx: number) => (
    <div key={tier.id} className={`mb-4 p-5 border-2 border-dashed ${isDarkMode ? 'border-slate-600' : 'border-slate-300'}`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`font-marker text-xl ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
          {tier.emoji} {tier.name || 'Untitled Tier'}
        </span>
        <button
          onClick={() => setDonateTiers(prev => prev.filter((_, i) => i !== idx))}
          className="flex items-center gap-1 px-3 py-1 bg-red-200 hover:bg-red-300 text-red-900 border border-red-400 font-hand font-bold text-sm transform hover:rotate-1 transition-all"
        >
          <Trash2 size={14} /> Remove
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {[
          { label: 'Emoji', key: 'emoji' as const, ph: '☕' },
          { label: 'Name', key: 'name' as const, ph: 'Buy me a Coffee' },
          { label: 'Price', key: 'price' as const, ph: '₹150' },
          { label: 'ID/Slug', key: 'id' as const, ph: 'coffee' },
        ].map(({ label, key, ph }) => (
          <div key={key}>
            <label className={labelCls}>{label}</label>
            <input
              className={inputCls}
              value={tier[key]}
              onChange={e => setDonateTiers(prev =>
                prev.map((t, i) => i === idx ? { ...t, [key]: e.target.value } : t)
              )}
              placeholder={ph}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className={labelCls}>Description</label>
        <input
          className={inputCls}
          value={tier.description}
          onChange={e => setDonateTiers(prev =>
            prev.map((t, i) => i === idx ? { ...t, description: e.target.value } : t)
          )}
          placeholder="Short description of this tier"
        />
      </div>

      <div>
        <label className={labelCls}>Perks (one per line)</label>
        {tier.perks.map((perk, pi) => (
          <div key={pi} className="flex items-center gap-2 mt-1">
            <input
              className={inputCls}
              value={perk}
              onChange={e => {
                const perks = [...tier.perks];
                perks[pi] = e.target.value;
                setDonateTiers(prev => prev.map((t, i) => i === idx ? { ...t, perks } : t));
              }}
              placeholder={`Perk ${pi + 1}`}
            />
            <button
              onClick={() => setDonateTiers(prev =>
                prev.map((t, i) => i === idx ? { ...t, perks: t.perks.filter((_, fi) => fi !== pi) } : t)
              )}
              className="text-red-400 hover:text-red-600"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button
          onClick={() => setDonateTiers(prev =>
            prev.map((t, i) => i === idx ? { ...t, perks: [...t.perks, ''] } : t)
          )}
          className={`mt-2 text-sm font-hand font-bold flex items-center gap-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
        >
          <Plus size={14} /> Add perk
        </button>
      </div>
    </div>
  );

  // ── Sponsor Tier Card ───────────────────────────────────────────────────────
  const renderSponsorTierCard = (tier: SponsorTier, idx: number) => (
    <div key={tier.id} className={`mb-4 p-5 border-2 ${tier.highlight ? 'border-pink-400' : 'border-dashed'} ${isDarkMode ? 'border-slate-600' : 'border-slate-300'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`font-marker text-xl ${isDarkMode ? 'text-pink-300' : 'text-pink-600'}`}>
            {tier.emoji} {tier.name || 'Untitled Sponsor Tier'}
          </span>
          {tier.highlight && (
            <span className="bg-pink-100 text-pink-800 text-xs font-hand font-bold px-2 py-0.5 border border-pink-300">
              ⭐ Featured
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1 font-hand text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={tier.highlight ?? false}
              onChange={e => setSponsorTiers(prev =>
                prev.map((t, i) => i === idx ? { ...t, highlight: e.target.checked } : t)
              )}
            />
            <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Featured</span>
          </label>
          <button
            onClick={() => setSponsorTiers(prev => prev.filter((_, i) => i !== idx))}
            className="flex items-center gap-1 px-3 py-1 bg-red-200 hover:bg-red-300 text-red-900 border border-red-400 font-hand font-bold text-sm transform hover:rotate-1 transition-all"
          >
            <Trash2 size={14} /> Remove
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {[
          { label: 'Emoji', key: 'emoji' as const, ph: '🤝' },
          { label: 'Name', key: 'name' as const, ph: 'Partner' },
          { label: 'Price', key: 'price' as const, ph: '₹4,999/mo' },
          { label: 'ID/Slug', key: 'id' as const, ph: 'partner' },
        ].map(({ label, key, ph }) => (
          <div key={key}>
            <label className={labelCls}>{label}</label>
            <input
              className={inputCls}
              value={tier[key] as string}
              onChange={e => setSponsorTiers(prev =>
                prev.map((t, i) => i === idx ? { ...t, [key]: e.target.value } : t)
              )}
              placeholder={ph}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className={labelCls}>Description</label>
        <input
          className={inputCls}
          value={tier.description}
          onChange={e => setSponsorTiers(prev =>
            prev.map((t, i) => i === idx ? { ...t, description: e.target.value } : t)
          )}
          placeholder="Short description of this sponsor tier"
        />
      </div>

      <div>
        <label className={labelCls}>Perks</label>
        {tier.perks.map((perk, pi) => (
          <div key={pi} className="flex items-center gap-2 mt-1">
            <input
              className={inputCls}
              value={perk}
              onChange={e => {
                const perks = [...tier.perks];
                perks[pi] = e.target.value;
                setSponsorTiers(prev => prev.map((t, i) => i === idx ? { ...t, perks } : t));
              }}
              placeholder={`Perk ${pi + 1}`}
            />
            <button
              onClick={() => setSponsorTiers(prev =>
                prev.map((t, i) => i === idx ? { ...t, perks: t.perks.filter((_, fi) => fi !== pi) } : t)
              )}
              className="text-red-400 hover:text-red-600"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button
          onClick={() => setSponsorTiers(prev =>
            prev.map((t, i) => i === idx ? { ...t, perks: [...t.perks, ''] } : t)
          )}
          className={`mt-2 text-sm font-hand font-bold flex items-center gap-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
        >
          <Plus size={14} /> Add perk
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-marker text-3xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          💰 Donate & Sponsor Tiers
        </h2>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-1.5 bg-green-200 hover:bg-green-300 text-green-900 border border-green-400 font-hand font-bold text-lg transform hover:-rotate-1 transition-all"
        >
          <Save size={16} /> Save All
        </button>
      </div>

      {saved && (
        <div className="mb-4 bg-green-100 border-l-4 border-green-500 p-3 font-hand text-green-800 text-lg">
          ✅ Tiers saved!
        </div>
      )}

      {/* Tabs */}
      <div className={`flex gap-3 mb-6 border-b-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        {(['donate', 'sponsor'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-hand font-bold text-lg transition-all border-b-2 -mb-0.5 ${
              activeTab === tab
                ? (isDarkMode ? 'border-blue-400 text-blue-300' : 'border-blue-500 text-blue-600')
                : (isDarkMode ? 'border-transparent text-slate-400 hover:text-slate-200' : 'border-transparent text-slate-500 hover:text-slate-700')
            }`}
          >
            {tab === 'donate' ? '✏️ Donate Tiers' : '🤝 Sponsor Tiers'}
          </button>
        ))}
      </div>

      {activeTab === 'donate' && (
        <div>
          {donateTiers.map((tier, idx) => (
            renderDonateTierCard(tier, idx)
          ))}
          <button
            onClick={() => setDonateTiers(prev => [...prev, emptyDonateTier()])}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 border border-yellow-400 font-hand font-bold text-lg transform hover:-rotate-1 transition-all"
          >
            <Plus size={16} /> Add Donate Tier
          </button>
        </div>
      )}

      {activeTab === 'sponsor' && (
        <div>
          {sponsorTiers.map((tier, idx) => (
            renderSponsorTierCard(tier, idx)
          ))}
          <button
            onClick={() => setSponsorTiers(prev => [...prev, emptySponsorTier()])}
            className="flex items-center gap-2 px-4 py-2 bg-pink-200 hover:bg-pink-300 text-pink-900 border border-pink-400 font-hand font-bold text-lg transform hover:rotate-1 transition-all"
          >
            <Plus size={16} /> Add Sponsor Tier
          </button>
        </div>
      )}
    </div>
  );
};
