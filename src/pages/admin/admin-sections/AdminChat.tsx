import React, { useState } from 'react';
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useAdminData, AdminIntent, AdminKnowledgeEntry } from '../../../context/AdminDataContext';

interface Props { isDarkMode: boolean; }

export const AdminChat: React.FC<Props> = ({ isDarkMode }) => {
  const { data, updateChatIntents, updateChatKnowledge } = useAdminData();
  const [intents, setIntents] = useState<AdminIntent[]>([...data.chatIntents]);
  const [knowledge, setKnowledge] = useState<AdminKnowledgeEntry[]>([...data.chatKnowledge]);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'intents' | 'knowledge'>('intents');
  const [openIntent, setOpenIntent] = useState<number | null>(null);

  const inputCls = `bg-transparent border-0 border-b-2 w-full px-1 py-0.5 font-hand text-lg outline-none transition-colors ${
    isDarkMode
      ? 'border-slate-600 focus:border-blue-400 text-slate-200 placeholder:text-slate-500'
      : 'border-slate-300 focus:border-blue-500 text-slate-800 placeholder:text-slate-400'
  } placeholder:italic`;

  const labelCls = `font-hand text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`;

  const handleSave = () => {
    updateChatIntents(intents);
    updateChatKnowledge(knowledge);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const emptyIntent = (): AdminIntent => ({
    name: `CUSTOM_${Date.now()}`,
    description: '',
    type: 'fixed',
    patterns: [''],
    response: '',
  });

  const emptyKnowledge = (): AdminKnowledgeEntry => ({
    id: `kb_${Date.now()}`,
    topic: '',
    language: 'en',
    text: '',
  });

  // ── Intent Editor ────────────────────────────────────────────────────────────
  const renderIntentEditor = (intent: AdminIntent, idx: number) => {
    const isOpen = openIntent === idx;
    const update = (changes: Partial<AdminIntent>) =>
      setIntents(prev => prev.map((it, i) => i === idx ? { ...it, ...changes } : it));

    return (
      <div key={intent.name + idx} className={`mb-3 border-2 ${isDarkMode ? 'border-slate-600' : 'border-slate-300'}`}>
        <div
          className={`flex items-center justify-between px-4 py-3 cursor-pointer ${
            isDarkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'
          } transition-colors`}
          onClick={() => setOpenIntent(isOpen ? null : idx)}
        >
          <div className="flex items-center gap-3">
            <span className={`font-marker text-lg ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              {intent.name}
            </span>
            <span className={`font-hand text-sm px-2 py-0.5 ${
              intent.type === 'fixed'
                ? (isDarkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700')
                : (isDarkMode ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-700')
            }`}>
              {intent.type}
            </span>
            <span className={`font-hand text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {intent.description} • {intent.patterns.length} patterns
            </span>
          </div>
          <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setIntents(prev => prev.filter((_, i) => i !== idx))}
              className="text-red-400 hover:text-red-600 px-2 py-1"
            >
              <Trash2 size={14} />
            </button>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>

        {isOpen && (
          <div className={`px-6 py-5 ${isDarkMode ? 'bg-slate-800/50' : 'bg-white'}`}>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className={labelCls}>Intent Name (ALL_CAPS)</label>
                <input className={inputCls} value={intent.name}
                  onChange={e => update({ name: e.target.value.toUpperCase() })}
                  placeholder="GREETING" />
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <input className={inputCls} value={intent.description}
                  onChange={e => update({ description: e.target.value })}
                  placeholder="Brief description" />
              </div>
            </div>

            <div className="mb-4">
              <label className={labelCls}>Type</label>
              <div className="flex gap-4 mt-1">
                {(['fixed', 'retrieval'] as const).map(t => (
                  <label key={t} className="flex items-center gap-1 font-hand text-lg cursor-pointer">
                    <input type="radio" name={`type-${idx}`} value={t} checked={intent.type === t}
                      onChange={() => update({ type: t })} />
                    <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            {intent.type === 'retrieval' && (
              <div className="mb-4">
                <label className={labelCls}>Topic (for retrieval)</label>
                <input className={inputCls} value={intent.topic ?? ''}
                  onChange={e => update({ topic: e.target.value })}
                  placeholder="projects_overview" />
              </div>
            )}

            <div className="mb-4">
              <label className={labelCls}>Pattern Phrases (one per entry)</label>
              {intent.patterns.map((p, pi) => (
                <div key={pi} className="flex items-center gap-2 mt-1">
                  <input
                    className={inputCls}
                    value={p}
                    onChange={e => {
                      const patterns = [...intent.patterns];
                      patterns[pi] = e.target.value;
                      update({ patterns });
                    }}
                    placeholder={`Pattern ${pi + 1}`}
                  />
                  <button
                    onClick={() => update({ patterns: intent.patterns.filter((_, fi) => fi !== pi) })}
                    className="text-red-400 hover:text-red-600 shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => update({ patterns: [...intent.patterns, ''] })}
                className={`mt-2 text-sm font-hand font-bold flex items-center gap-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
              >
                <Plus size={14} /> Add pattern
              </button>
            </div>

            {intent.type === 'fixed' && (
              <div>
                <label className={labelCls}>Response Text (supports \n for newlines)</label>
                <textarea
                  className={`${inputCls} resize-none h-28 mt-1`}
                  value={intent.response ?? ''}
                  onChange={e => update({ response: e.target.value })}
                  placeholder={"Hi! I'm Paper Pots 🪴..."}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // ── Knowledge Entry Editor ───────────────────────────────────────────────────
  const renderKnowledgeEditor = (entry: AdminKnowledgeEntry, idx: number) => {
    const update = (changes: Partial<AdminKnowledgeEntry>) =>
      setKnowledge(prev => prev.map((e, i) => i === idx ? { ...e, ...changes } : e));

    return (
      <div key={entry.id + idx} className={`mb-4 p-4 border-2 border-dashed ${isDarkMode ? 'border-slate-600' : 'border-slate-300'}`}>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`font-hand font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {entry.id || 'New Entry'}
            </span>
            <span className={`font-hand text-sm px-2 py-0.5 ${
              entry.language === 'en'
                ? (isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700')
                : (isDarkMode ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-700')
            }`}>
              {entry.language === 'en' ? '🇬🇧 EN' : '🇮🇳 HI'}
            </span>
          </div>
          <button
            onClick={() => setKnowledge(prev => prev.filter((_, i) => i !== idx))}
            className="text-red-400 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-3">
          <div>
            <label className={labelCls}>Entry ID</label>
            <input className={inputCls} value={entry.id}
              onChange={e => update({ id: e.target.value })}
              placeholder="topic_lang" />
          </div>
          <div>
            <label className={labelCls}>Topic</label>
            <input className={inputCls} value={entry.topic}
              onChange={e => update({ topic: e.target.value })}
              placeholder="projects_overview" />
          </div>
          <div>
            <label className={labelCls}>Language</label>
            <select
              className={`${inputCls} cursor-pointer`}
              value={entry.language}
              onChange={e => update({ language: e.target.value as 'en' | 'hi' })}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Knowledge Text</label>
          <textarea
            className={`${inputCls} resize-none h-20 mt-1`}
            value={entry.text}
            onChange={e => update({ text: e.target.value })}
            placeholder="Knowledge content for retrieval..."
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-marker text-3xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          🪴 Chat Bot Editor
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
          ✅ Chat data saved! ({intents.length} intents, {knowledge.length} knowledge entries)
        </div>
      )}

      <div className={`mb-4 p-4 border-l-4 border-yellow-400 ${isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
        <p className={`font-hand text-lg ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
          🤖 <strong>Paper Pots</strong> uses pattern matching on user messages. Intents define what to respond, Knowledge entries store facts for retrieval-type intents.
        </p>
      </div>

      {/* Tabs */}
      <div className={`flex gap-3 mb-6 border-b-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        {[
          { id: 'intents', label: `💬 Intents (${intents.length})` },
          { id: 'knowledge', label: `📚 Knowledge (${knowledge.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 font-hand font-bold text-lg transition-all border-b-2 -mb-0.5 ${
              activeTab === tab.id
                ? (isDarkMode ? 'border-blue-400 text-blue-300' : 'border-blue-500 text-blue-600')
                : (isDarkMode ? 'border-transparent text-slate-400 hover:text-slate-200' : 'border-transparent text-slate-500 hover:text-slate-700')
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'intents' && (
        <div>
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => { setIntents(prev => [...prev, emptyIntent()]); setOpenIntent(intents.length); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-200 hover:bg-blue-300 text-blue-900 border border-blue-400 font-hand font-bold text-lg transform hover:-rotate-1 transition-all"
            >
              <Plus size={16} /> Add Intent
            </button>
          </div>
          {intents.map((intent, idx) => (
            renderIntentEditor(intent, idx)
          ))}
        </div>
      )}

      {activeTab === 'knowledge' && (
        <div>
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setKnowledge(prev => [...prev, emptyKnowledge()])}
              className="flex items-center gap-2 px-4 py-2 bg-blue-200 hover:bg-blue-300 text-blue-900 border border-blue-400 font-hand font-bold text-lg transform hover:-rotate-1 transition-all"
            >
              <Plus size={16} /> Add Entry
            </button>
          </div>
          {knowledge.map((entry, idx) => (
            renderKnowledgeEditor(entry, idx)
          ))}
        </div>
      )}
    </div>
  );
};
