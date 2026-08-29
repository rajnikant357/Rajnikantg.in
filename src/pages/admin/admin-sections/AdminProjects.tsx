import React, { useState } from 'react';
import { Save, Plus, Trash2, ChevronUp, ChevronDown, Edit3, X, Check } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { Project } from '../../../../types';


interface Props { isDarkMode: boolean; }

const emptyProject = (): Project => ({
  id: `project-${Date.now()}`,
  title: '',
  tagline: '',
  subTagline: '',
  image: 'https://picsum.photos/seed/new/800/400',
  overview: '',
  problem: [''],
  solution: { intro: '', features: [''], summary: '' },
  market: [''],
  vision: [''],
  techStack: [],
  demoLink: '',
  repoLink: '',
});

interface ProjectEditorProps {
  project: Project;
  onUpdate: (p: Project) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  isDarkMode: boolean;
}

const ProjectEditor: React.FC<ProjectEditorProps> = ({
  project, onUpdate, onDelete, onMoveUp, onMoveDown, isFirst, isLast, isDarkMode
}) => {
  const [open, setOpen] = useState(false);

  const inputCls = `bg-transparent border-0 border-b-2 w-full px-1 py-0.5 font-hand text-lg outline-none transition-colors ${
    isDarkMode
      ? 'border-slate-600 focus:border-blue-400 text-slate-200 placeholder:text-slate-500'
      : 'border-slate-300 focus:border-blue-500 text-slate-800 placeholder:text-slate-400'
  } placeholder:italic`;

  const labelCls = `font-hand text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`;

  const updateField = (key: keyof Project, val: any) => onUpdate({ ...project, [key]: val });

  const updateArrayField = (key: 'problem' | 'market' | 'vision' | 'techStack', idx: number, val: string) => {
    const arr = [...(project[key] as string[])];
    arr[idx] = val;
    onUpdate({ ...project, [key]: arr });
  };

  const addArrayItem = (key: 'problem' | 'market' | 'vision' | 'techStack') => {
    onUpdate({ ...project, [key]: [...(project[key] as string[]), ''] });
  };

  const removeArrayItem = (key: 'problem' | 'market' | 'vision' | 'techStack', idx: number) => {
    const arr = (project[key] as string[]).filter((_, i) => i !== idx);
    onUpdate({ ...project, [key]: arr });
  };

  const updateSolution = (field: 'intro' | 'summary', val: string) => {
    onUpdate({ ...project, solution: { ...project.solution, [field]: val } });
  };

  const updateSolutionFeature = (idx: number, val: string) => {
    const features = [...project.solution.features];
    features[idx] = val;
    onUpdate({ ...project, solution: { ...project.solution, features } });
  };

  const ArrayEditor = ({ label, field, items }: { label: string, field: 'problem' | 'market' | 'vision' | 'techStack', items: string[] }) => (
    <div className="mb-4">
      <label className={labelCls}>{label}</label>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 mt-1">
          <input
            className={inputCls}
            value={item}
            onChange={e => updateArrayField(field, i, e.target.value)}
            placeholder={`${label} item ${i + 1}`}
          />
          <button onClick={() => removeArrayItem(field, i)} className="text-red-400 hover:text-red-600 shrink-0">
            <X size={16} />
          </button>
        </div>
      ))}
      <button
        onClick={() => addArrayItem(field)}
        className={`mt-2 text-sm font-hand font-bold flex items-center gap-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
      >
        <Plus size={14} /> Add item
      </button>
    </div>
  );

  return (
    <div className={`mb-4 border-2 ${isDarkMode ? 'border-slate-600' : 'border-slate-300'} transition-colors`}>
      {/* Header row */}
      <div
        className={`flex items-center justify-between px-4 py-3 cursor-pointer ${isDarkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'} transition-colors`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-0.5">
            <button onClick={e => { e.stopPropagation(); onMoveUp(); }} disabled={isFirst} className="disabled:opacity-30 hover:text-blue-500">
              <ChevronUp size={16} />
            </button>
            <button onClick={e => { e.stopPropagation(); onMoveDown(); }} disabled={isLast} className="disabled:opacity-30 hover:text-blue-500">
              <ChevronDown size={16} />
            </button>
          </div>
          <span className={`font-marker text-xl ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
            {project.title || 'Untitled Project'}
          </span>
          <span className={`font-hand text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {project.tagline}
          </span>
        </div>
        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
          <button
            onClick={onDelete}
            className="flex items-center gap-1 px-3 py-1 bg-red-200 hover:bg-red-300 text-red-900 border border-red-400 font-hand font-bold text-sm transform hover:rotate-1 transition-all"
          >
            <Trash2 size={14} /> Delete
          </button>
          <Edit3 size={18} className={isDarkMode ? 'text-slate-400' : 'text-slate-500'} />
        </div>
      </div>

      {/* Editor body */}
      {open && (
        <div className={`px-6 py-6 ${isDarkMode ? 'bg-slate-800/50' : 'bg-white'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
              <div className="mb-4">
                <label className={labelCls}>Project ID (slug)</label>
                <input className={inputCls} value={project.id} onChange={e => updateField('id', e.target.value)} placeholder="project-id" />
              </div>
              <div className="mb-4">
                <label className={labelCls}>Title</label>
                <input className={inputCls} value={project.title} onChange={e => updateField('title', e.target.value)} placeholder="PROJECT NAME" />
              </div>
              <div className="mb-4">
                <label className={labelCls}>Tagline</label>
                <input className={inputCls} value={project.tagline} onChange={e => updateField('tagline', e.target.value)} placeholder="Short tagline" />
              </div>
              <div className="mb-4">
                <label className={labelCls}>Sub Tagline</label>
                <input className={inputCls} value={project.subTagline} onChange={e => updateField('subTagline', e.target.value)} placeholder='"Quoted sub-tagline"' />
              </div>
              <div className="mb-4">
                <label className={labelCls}>Image URL</label>
                <input className={inputCls} value={project.image} onChange={e => updateField('image', e.target.value)} placeholder="https://..." />
              </div>
              <div className="mb-4">
                <label className={labelCls}>Live Demo URL</label>
                <input className={inputCls} value={project.demoLink || ''} onChange={e => updateField('demoLink', e.target.value)} placeholder="https://demo.com" />
              </div>
              <div className="mb-4">
                <label className={labelCls}>Repo URL</label>
                <input className={inputCls} value={project.repoLink || ''} onChange={e => updateField('repoLink', e.target.value)} placeholder="https://github.com/..." />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className={labelCls}>Overview (long description)</label>
                <textarea
                  className={`${inputCls} resize-none h-28`}
                  value={project.overview}
                  onChange={e => updateField('overview', e.target.value)}
                  placeholder="Platform overview..."
                />
              </div>
              <div className="mb-4">
                <label className={labelCls}>Solution Intro</label>
                <input className={inputCls} value={project.solution.intro} onChange={e => updateSolution('intro', e.target.value)} placeholder="This solution consolidates..." />
              </div>
              <div className="mb-4">
                <label className={labelCls}>Solution Summary</label>
                <input className={inputCls} value={project.solution.summary} onChange={e => updateSolution('summary', e.target.value)} placeholder="One-sentence summary..." />
              </div>
              <div className="mb-4">
                <label className={labelCls}>Solution Features</label>
                {project.solution.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 mt-1">
                    <input
                      className={inputCls}
                      value={f}
                      onChange={e => updateSolutionFeature(i, e.target.value)}
                      placeholder={`Feature ${i + 1}`}
                    />
                    <button onClick={() => {
                      const features = project.solution.features.filter((_, fi) => fi !== i);
                      onUpdate({ ...project, solution: { ...project.solution, features } });
                    }} className="text-red-400 hover:text-red-600 shrink-0">
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => onUpdate({ ...project, solution: { ...project.solution, features: [...project.solution.features, ''] } })}
                  className={`mt-2 text-sm font-hand font-bold flex items-center gap-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
                >
                  <Plus size={14} /> Add feature
                </button>
              </div>
            </div>
          </div>

          {/* Array sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-4">
            <ArrayEditor label="Tech Stack" field="techStack" items={project.techStack} />
            <ArrayEditor label="Problems Solved" field="problem" items={project.problem} />
            <ArrayEditor label="Market Points" field="market" items={project.market} />
            <ArrayEditor label="Vision Points" field="vision" items={project.vision} />
          </div>
        </div>
      )}
    </div>
  );
};

export const AdminProjects: React.FC<Props> = ({ isDarkMode }) => {
  const { data, updateProjects } = useAdminData();
  const [projects, setProjects] = useState<Project[]>([...data.projects]);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProjects(projects);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAdd = () => {
    setProjects(prev => [...prev, emptyProject()]);
  };

  const handleUpdate = (idx: number, updated: Project) => {
    setProjects(prev => prev.map((p, i) => i === idx ? updated : p));
  };

  const handleDelete = (idx: number) => {
    if (!confirm(`Delete "${projects[idx].title}"?`)) return;
    setProjects(prev => prev.filter((_, i) => i !== idx));
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const arr = [...projects];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setProjects(arr);
  };

  const moveDown = (idx: number) => {
    if (idx === projects.length - 1) return;
    const arr = [...projects];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setProjects(arr);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className={`font-marker text-3xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          🚀 Projects Manager
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-1.5 bg-blue-200 hover:bg-blue-300 text-blue-900 border border-blue-400 font-hand font-bold text-lg transform hover:-rotate-1 transition-all"
          >
            <Plus size={16} /> Add Project
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-1.5 bg-green-200 hover:bg-green-300 text-green-900 border border-green-400 font-hand font-bold text-lg transform hover:-rotate-1 transition-all"
          >
            <Save size={16} /> Save All
          </button>
        </div>
      </div>

      {saved && (
        <div className="mb-6 bg-green-100 border-l-4 border-green-500 p-3 font-hand text-green-800 text-lg">
          ✅ Projects saved! ({projects.length} projects)
        </div>
      )}

      <p className={`font-hand text-lg mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        Click on any project header to expand and edit it. Use arrows to reorder. Changes are applied on "Save All".
      </p>

      {projects.map((project, idx) => (
        <ProjectEditor
          key={project.id + idx}
          project={project}
          onUpdate={updated => handleUpdate(idx, updated)}
          onDelete={() => handleDelete(idx)}
          onMoveUp={() => moveUp(idx)}
          onMoveDown={() => moveDown(idx)}
          isFirst={idx === 0}
          isLast={idx === projects.length - 1}
          isDarkMode={isDarkMode}
        />
      ))}

      {projects.length === 0 && (
        <div className={`text-center py-16 font-hand text-xl ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          No projects yet. Click "Add Project" to create your first one.
        </div>
      )}
    </div>
  );
};
