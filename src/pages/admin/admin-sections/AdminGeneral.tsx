import React, { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { useAdminData, GeneralInfo } from '../../../context/AdminDataContext';

interface Props { isDarkMode: boolean; }

export const AdminGeneral: React.FC<Props> = ({ isDarkMode }) => {
  const { data, updateGeneral } = useAdminData();
  const [form, setForm] = useState<GeneralInfo>({ ...data.general });
  const [saved, setSaved] = useState(false);

  const inputCls = `bg-transparent border-0 border-b-2 w-full px-1 py-0.5 font-hand text-xl outline-none transition-colors ${
    isDarkMode
      ? 'border-slate-600 focus:border-blue-400 text-slate-200 placeholder:text-slate-500'
      : 'border-slate-300 focus:border-blue-500 text-slate-800 placeholder:text-slate-400'
  } placeholder:italic`;

  const labelCls = `font-hand text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider`;

  const handleSave = () => {
    updateGeneral(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => setForm({ ...data.general });

  const field = (label: string, key: keyof GeneralInfo, placeholder: string, multiline = false) => (
    <div className="mb-6">
      <label className={labelCls}>{label}</label>
      {multiline ? (
        <textarea
          className={`${inputCls} resize-none h-24`}
          value={form[key] as string}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          className={inputCls}
          value={form[key] as string}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          placeholder={placeholder}
        />
      )}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className={`font-marker text-3xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          ⚙️ General Settings
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className={`flex items-center gap-2 px-4 py-1.5 border font-hand font-bold text-lg transform hover:rotate-1 transition-all ${
              isDarkMode ? 'border-slate-500 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <RotateCcw size={16} /> Reset
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-1.5 bg-green-200 hover:bg-green-300 text-green-900 border border-green-400 font-hand font-bold text-lg transform hover:-rotate-1 transition-all"
          >
            <Save size={16} /> Save
          </button>
        </div>
      </div>

      {saved && (
        <div className="mb-6 bg-green-100 border-l-4 border-green-500 p-3 font-hand text-green-800 text-lg">
          ✅ General settings saved!
        </div>
      )}

      <div className={`p-6 border-2 border-dashed ${isDarkMode ? 'border-slate-600' : 'border-slate-300'}`}>
        <p className={`font-hand text-sm mb-4 italic ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          These values control the main heading, tagline, and meta info on the portfolio homepage.
        </p>

        {field('Your Name (displayed as header)', 'name', 'RAJNIKANT GAURAV')}
        {field('Main Tagline (one-liner)', 'tagline', 'Full Stack Developer & Creative Engineer.')}
        {field('Sub-Tagline (second line)', 'subTagline', 'Turning caffeine into clean code...')}
        {field('Resume File Path / URL', 'resumeLink', '/RAJNIKANT_GAURAV_resume.pdf')}
        {field('Profile Image URL', 'profileImage', '/myself.jpg')}
        {field('Footer Text', 'footerText', 'Built with 💻 & ☕.')}
      </div>

      <div className={`mt-6 p-4 border-l-4 border-yellow-400 bg-yellow-100/60 ${isDarkMode ? 'bg-yellow-900/20 border-yellow-600' : ''}`}>
        <p className="font-hand text-lg text-yellow-800">
          💡 <strong>Tip:</strong> Changes are saved to your browser's localStorage. To make them permanent, use the <strong>Export JSON</strong> button in the sidebar and update your <code>data/</code> files.
        </p>
      </div>
    </div>
  );
};
