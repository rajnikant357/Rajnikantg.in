import React, { useState } from 'react';
import { Save, Plus, Trash2, RotateCcw } from 'lucide-react';
import { useAdminData, AboutInfo } from '../../../context/AdminDataContext';

interface Props { isDarkMode: boolean; }

export const AdminAbout: React.FC<Props> = ({ isDarkMode }) => {
  const { data, updateAbout } = useAdminData();
  const [form, setForm] = useState<AboutInfo>({ ...data.about });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'summary' | 'goals' | 'skills' | 'education' | 'achievements' | 'journey' | 'networks'
  >('summary');

  const inputCls = `bg-transparent border-0 border-b-2 w-full px-1 py-0.5 font-hand text-lg outline-none transition-colors ${
    isDarkMode
      ? 'border-slate-600 focus:border-blue-400 text-slate-200 placeholder:text-slate-500'
      : 'border-slate-300 focus:border-blue-500 text-slate-800 placeholder:text-slate-400'
  } placeholder:italic`;

  const labelCls = `font-hand text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`;

  const handleSave = () => {
    updateAbout(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Generic array of strings editor
  const StringArrayEditor = ({
    label, value, onChange
  }: { label: string, value: string[], onChange: (v: string[]) => void }) => (
    <div className="mb-6">
      <label className={labelCls}>{label}</label>
      {value.map((item, i) => (
        <div key={i} className="flex items-center gap-2 mt-1">
          <input
            className={inputCls}
            value={item}
            onChange={e => { const arr = [...value]; arr[i] = e.target.value; onChange(arr); }}
            placeholder={`Line ${i + 1}`}
          />
          <button
            onClick={() => onChange(value.filter((_, fi) => fi !== i))}
            className="text-red-400 hover:text-red-600 shrink-0"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...value, ''])}
        className={`mt-2 text-sm font-hand font-bold flex items-center gap-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
      >
        <Plus size={14} /> Add line
      </button>
    </div>
  );

  const tabs = [
    { id: 'summary', label: '👋 Summary' },
    { id: 'goals', label: '🚀 Goals' },
    { id: 'skills', label: '⚡ Skills' },
    { id: 'education', label: '🎓 Education' },
    { id: 'achievements', label: '🏆 Achievements' },
    { id: 'journey', label: '🛣️ Journey' },
    { id: 'networks', label: '🌐 Networks' },
  ] as const;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-marker text-3xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          👤 About Editor
        </h2>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-1.5 bg-green-200 hover:bg-green-300 text-green-900 border border-green-400 font-hand font-bold text-lg transform hover:-rotate-1 transition-all"
        >
          <Save size={16} /> Save
        </button>
      </div>

      {saved && (
        <div className="mb-4 bg-green-100 border-l-4 border-green-500 p-3 font-hand text-green-800 text-lg">
          ✅ About section saved!
        </div>
      )}

      {/* Sub-tabs */}
      <div className={`flex flex-wrap gap-2 mb-6 pb-4 border-b-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1 font-hand font-bold text-sm transition-all transform hover:-rotate-1 border ${
              activeTab === tab.id
                ? (isDarkMode ? 'bg-blue-700 text-blue-100 border-blue-500' : 'bg-blue-500 text-white border-blue-600')
                : (isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-600 hover:bg-slate-100')
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`p-6 border-2 border-dashed ${isDarkMode ? 'border-slate-600' : 'border-slate-300'}`}>

        {activeTab === 'summary' && (
          <StringArrayEditor
            label="Summary Lines (each line = one paragraph)"
            value={form.summary}
            onChange={v => setForm(f => ({ ...f, summary: v }))}
          />
        )}

        {activeTab === 'goals' && (
          <StringArrayEditor
            label="Future Goals Lines"
            value={form.futureGoals}
            onChange={v => setForm(f => ({ ...f, futureGoals: v }))}
          />
        )}

        {activeTab === 'skills' && (
          <>
            <StringArrayEditor
              label="Tech Stack Items"
              value={form.techStack}
              onChange={v => setForm(f => ({ ...f, techStack: v }))}
            />
            <StringArrayEditor
              label="Hobbies"
              value={form.hobbies}
              onChange={v => setForm(f => ({ ...f, hobbies: v }))}
            />
          </>
        )}

        {activeTab === 'achievements' && (
          <StringArrayEditor
            label="Achievements"
            value={form.achievements}
            onChange={v => setForm(f => ({ ...f, achievements: v }))}
          />
        )}

        {activeTab === 'education' && (
          <div>
            {form.education.map((edu, i) => (
              <div key={i} className={`mb-6 p-4 border-2 border-dashed ${isDarkMode ? 'border-slate-600' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className={`font-hand font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Education #{i + 1}
                  </label>
                  <button onClick={() => setForm(f => ({ ...f, education: f.education.filter((_, fi) => fi !== i) }))}
                    className="text-red-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="mb-2">
                  <label className={labelCls}>Degree / Level</label>
                  <input className={inputCls} value={edu.degree}
                    onChange={e => { const arr = [...form.education]; arr[i] = { ...arr[i], degree: e.target.value }; setForm(f => ({ ...f, education: arr })); }}
                    placeholder="B.Tech in Computer Science" />
                </div>
                <div className="mb-2">
                  <label className={labelCls}>Institution</label>
                  <input className={inputCls} value={edu.institution}
                    onChange={e => { const arr = [...form.education]; arr[i] = { ...arr[i], institution: e.target.value }; setForm(f => ({ ...f, education: arr })); }}
                    placeholder="College Name, City" />
                </div>
                <div className="mb-2">
                  <label className={labelCls}>Period</label>
                  <input className={inputCls} value={edu.period}
                    onChange={e => { const arr = [...form.education]; arr[i] = { ...arr[i], period: e.target.value }; setForm(f => ({ ...f, education: arr })); }}
                    placeholder="2022 – 2026 (Current)" />
                </div>
                <div>
                  <label className={labelCls}>Note</label>
                  <input className={inputCls} value={edu.note}
                    onChange={e => { const arr = [...form.education]; arr[i] = { ...arr[i], note: e.target.value }; setForm(f => ({ ...f, education: arr })); }}
                    placeholder="Focusing on..." />
                </div>
              </div>
            ))}
            <button
              onClick={() => setForm(f => ({ ...f, education: [...f.education, { institution: '', degree: '', period: '', note: '' }] }))}
              className={`flex items-center gap-1 font-hand font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
            >
              <Plus size={16} /> Add Education Entry
            </button>
          </div>
        )}

        {activeTab === 'journey' && (
          <div>
            {form.journey.map((step, i) => (
              <div key={i} className={`mb-6 p-4 border-2 border-dashed ${isDarkMode ? 'border-slate-600' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className={`font-hand font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Step #{i + 1}
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 font-hand text-sm">
                      <input
                        type="checkbox"
                        checked={step.isPulse ?? false}
                        onChange={e => { const arr = [...form.journey]; arr[i] = { ...arr[i], isPulse: e.target.checked }; setForm(f => ({ ...f, journey: arr })); }}
                      />
                      <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Current (pulsing dot)</span>
                    </label>
                    <button onClick={() => setForm(f => ({ ...f, journey: f.journey.filter((_, fi) => fi !== i) }))}
                      className="text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <label className={labelCls}>Step Title</label>
                  <input className={inputCls} value={step.title}
                    onChange={e => { const arr = [...form.journey]; arr[i] = { ...arr[i], title: e.target.value }; setForm(f => ({ ...f, journey: arr })); }}
                    placeholder="The Beginning" />
                </div>
                <div>
                  <label className={labelCls}>Body Text</label>
                  <textarea className={`${inputCls} resize-none h-20`} value={step.body}
                    onChange={e => { const arr = [...form.journey]; arr[i] = { ...arr[i], body: e.target.value }; setForm(f => ({ ...f, journey: arr })); }}
                    placeholder="What happened during this stage..." />
                </div>
              </div>
            ))}
            <button
              onClick={() => setForm(f => ({ ...f, journey: [...f.journey, { title: '', body: '' }] }))}
              className={`flex items-center gap-1 font-hand font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
            >
              <Plus size={16} /> Add Journey Step
            </button>
          </div>
        )}

        {activeTab === 'networks' && (
          <div>
            {form.networks.map((net, i) => (
              <div key={i} className={`mb-4 p-4 border-2 border-dashed ${isDarkMode ? 'border-slate-600' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className={`font-hand font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Network #{i + 1}</label>
                  <button onClick={() => setForm(f => ({ ...f, networks: f.networks.filter((_, fi) => fi !== i) }))}
                    className="text-red-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Label</label>
                    <input className={inputCls} value={net.label}
                      onChange={e => { const arr = [...form.networks]; arr[i] = { ...arr[i], label: e.target.value }; setForm(f => ({ ...f, networks: arr })); }}
                      placeholder="LinkedIn" />
                  </div>
                  <div>
                    <label className={labelCls}>URL</label>
                    <input className={inputCls} value={net.url}
                      onChange={e => { const arr = [...form.networks]; arr[i] = { ...arr[i], url: e.target.value }; setForm(f => ({ ...f, networks: arr })); }}
                      placeholder="https://..." />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => setForm(f => ({ ...f, networks: [...f.networks, { label: '', url: '', icon: 'Globe' }] }))}
              className={`flex items-center gap-1 font-hand font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
            >
              <Plus size={16} /> Add Network
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
