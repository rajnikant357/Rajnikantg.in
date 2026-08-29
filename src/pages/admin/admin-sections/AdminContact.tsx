import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useAdminData, ContactInfo } from '../../../context/AdminDataContext';

interface Props { isDarkMode: boolean; }

export const AdminContact: React.FC<Props> = ({ isDarkMode }) => {
  const { data, updateContact } = useAdminData();
  const [form, setForm] = useState<ContactInfo>({ ...data.contact });
  const [saved, setSaved] = useState(false);

  const inputCls = `bg-transparent border-0 border-b-2 w-full px-1 py-0.5 font-hand text-xl outline-none transition-colors ${
    isDarkMode
      ? 'border-slate-600 focus:border-blue-400 text-slate-200 placeholder:text-slate-500'
      : 'border-slate-300 focus:border-blue-500 text-slate-800 placeholder:text-slate-400'
  } placeholder:italic`;

  const labelCls = `font-hand text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`;

  const handleSave = () => {
    updateContact(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const field = (
    label: string,
    key: keyof ContactInfo,
    placeholder: string,
    icon: string,
  ) => (
    <div className="mb-6">
      <label className={labelCls}>{icon} {label}</label>
      <input
        className={inputCls}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
      />
      {form[key] && (
        <p className={`mt-1 font-hand text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          Preview: <a
            href={key === 'email' ? `mailto:${form[key]}` : key === 'phone' ? `tel:${form[key]}` : form[key]}
            target={key !== 'email' && key !== 'phone' ? '_blank' : undefined}
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            {form[key]}
          </a>
        </p>
      )}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className={`font-marker text-3xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          📬 Contact Info
        </h2>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-1.5 bg-green-200 hover:bg-green-300 text-green-900 border border-green-400 font-hand font-bold text-lg transform hover:-rotate-1 transition-all"
        >
          <Save size={16} /> Save
        </button>
      </div>

      {saved && (
        <div className="mb-6 bg-green-100 border-l-4 border-green-500 p-3 font-hand text-green-800 text-lg">
          ✅ Contact info saved!
        </div>
      )}

      <div className={`p-6 border-2 border-dashed ${isDarkMode ? 'border-slate-600' : 'border-slate-300'}`}>
        <p className={`font-hand text-sm mb-6 italic ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          These details appear in the Contact section and the navigation bar.
        </p>

        {field('Email Address', 'email', 'your@email.com', '📧')}
        {field('Phone Number', 'phone', '+91 XXXXXXXXXX', '📱')}
        {field('LinkedIn Profile URL', 'linkedin', 'https://linkedin.com/in/...', '💼')}
        {field('GitHub Profile URL', 'github', 'https://github.com/...', '🐙')}
        {field('Twitter / X Profile URL', 'twitter', 'https://x.com/...', '🐦')}
      </div>

      <div className={`mt-6 p-4 border-l-4 border-blue-400 ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
        <p className={`font-hand text-lg ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
          ℹ️ These are display-only edits stored in localStorage. Update your actual email server config in <code>.env</code> separately.
        </p>
      </div>
    </div>
  );
};
