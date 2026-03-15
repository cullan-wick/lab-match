import { useState } from 'react';
import { Save, Plus, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const STATUS_OPTIONS = [
  { value: 'hiring', label: 'Actively Hiring', desc: 'Actively looking for new students', color: 'border-green-400 bg-green-50 text-green-800' },
  { value: 'potentially-open', label: 'Potentially Open', desc: 'May consider strong applicants', color: 'border-yellow-400 bg-yellow-50 text-yellow-800' },
  { value: 'not-hiring', label: 'Not Hiring', desc: 'Lab is currently full', color: 'border-red-400 bg-red-50 text-red-800' },
];

const DEPARTMENTS = ['Computer Sciences', 'Mathematics', 'Statistics', 'Biology', 'Biochemistry', 'Chemistry', 'Physics', 'Psychology', 'Economics', 'Electrical & Computer Engineering', 'Mechanical Engineering', 'Other'];

export default function ProfessorProfile() {
  const { currentUser, updateProfessor } = useApp();
  const [form, setForm] = useState({ ...currentUser });
  const [saved, setSaved] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = () => {
    updateProfessor(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addKeyword = () => {
    const kw = newKeyword.trim();
    if (!kw) return;
    set('keywords', [...(form.keywords || []), kw]);
    setNewKeyword('');
  };

  const removeKeyword = (i) => set('keywords', form.keywords.filter((_, idx) => idx !== i));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lab Profile</h1>
            <p className="text-sm text-gray-500 mt-0.5">Visible to all students</p>
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${saved ? 'bg-green-500 text-white' : 'btn-primary'}`}
          >
            <Save size={15} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        {/* Hiring Status */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Hiring Status</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {STATUS_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => set('status', opt.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  form.status === opt.value
                    ? opt.color + ' border-2'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-sm">{opt.label}</p>
                <p className="text-xs mt-0.5 opacity-70">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Basic Info */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input value={form.name || ''} onChange={e => set('name', e.target.value)} className="input-field" placeholder="Dr. Jane Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (public)</label>
              <input value={form.email_public || ''} onChange={e => set('email_public', e.target.value)} className="input-field" placeholder="jdoe@wisc.edu" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select value={form.department || ''} onChange={e => set('department', e.target.value)} className="input-field">
                <option value="">Select department</option>
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lab Name</label>
              <input value={form.lab || ''} onChange={e => set('lab', e.target.value)} className="input-field" placeholder="Smith Research Lab" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Lab Website</label>
              <input value={form.website || ''} onChange={e => set('website', e.target.value)} className="input-field" placeholder="https://..." />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Lab Description</label>
            <textarea
              value={form.bio || ''}
              onChange={e => set('bio', e.target.value)}
              className="input-field resize-none"
              rows={5}
              placeholder="Describe your lab's research focus, current projects, and what you look for in students..."
            />
          </div>
        </div>

        {/* Keywords */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Research Keywords</h2>
          <div className="flex gap-2 mb-3">
            <input
              value={newKeyword}
              onChange={e => setNewKeyword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addKeyword()}
              className="input-field"
              placeholder="e.g. Machine Learning"
            />
            <button onClick={addKeyword} className="btn-primary flex items-center gap-1.5 whitespace-nowrap">
              <Plus size={15} /> Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(form.keywords || []).map((kw, i) => (
              <span key={i} className="flex items-center gap-1.5 bg-red-50 text-uw-red border border-red-200 text-sm px-3 py-1.5 rounded-full font-medium">
                {kw}
                <button onClick={() => removeKeyword(i)} className="hover:text-red-800 transition-colors">
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="card p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Preview (how students see you)</h2>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-uw-red to-red-800 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {form.name?.split(' ').pop()?.charAt(0) || '?'}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{form.name || 'Your Name'}</h3>
                <p className="text-sm text-gray-500">{form.department || 'Department'}</p>
                <p className="text-xs text-gray-400 mt-0.5">{form.lab || 'Lab Name'}</p>
              </div>
              {form.status && (
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  form.status === 'hiring' ? 'bg-green-100 text-green-800' :
                  form.status === 'not-hiring' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {form.status === 'hiring' ? '● Actively Hiring' : form.status === 'not-hiring' ? '● Not Hiring' : '● Potentially Open'}
                </span>
              )}
            </div>
            {form.bio && <p className="text-sm text-gray-600 mt-3 line-clamp-3">{form.bio}</p>}
            {(form.keywords || []).length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {form.keywords.map((kw, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{kw}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pb-8">
          <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all ${saved ? 'bg-green-500 text-white' : 'btn-primary'}`}>
            <Save size={15} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
