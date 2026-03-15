import { useState } from 'react';
import { Plus, Save, Upload, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const YEARS = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];
const GRADES = ['A', 'AB', 'B', 'BC', 'C', 'D', 'F'];
const MAJORS = ['Computer Science', 'Mathematics', 'Statistics', 'Biology', 'Biochemistry', 'Chemistry', 'Physics', 'Psychology', 'Economics', 'Data Science', 'Electrical Engineering', 'Mechanical Engineering', 'Other'];

export default function StudentProfile() {
  const { currentUser, updateStudent } = useApp();
  const [form, setForm] = useState({ ...currentUser });
  const [saved, setSaved] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', grade: 'A' });
  const [newExp, setNewExp] = useState({ title: '', lab: '', duration: '', description: '' });
  const [showClassForm, setShowClassForm] = useState(false);
  const [showExpForm, setShowExpForm] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = () => {
    updateStudent(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addClass = () => {
    if (!newClass.name.trim()) return;
    set('classes', [...(form.classes || []), { ...newClass }]);
    setNewClass({ name: '', grade: 'A' });
    setShowClassForm(false);
  };

  const removeClass = (i) => set('classes', form.classes.filter((_, idx) => idx !== i));

  const addExp = () => {
    if (!newExp.title.trim()) return;
    set('researchExperience', [...(form.researchExperience || []), { ...newExp }]);
    setNewExp({ title: '', lab: '', duration: '', description: '' });
    setShowExpForm(false);
  };

  const removeExp = (i) => set('researchExperience', form.researchExperience.filter((_, idx) => idx !== i));

  const handleFileUpload = (key, e) => {
    const file = e.target.files[0];
    if (file) set(key, file.name);
  };

  const gradeColor = (grade) => {
    if (grade === 'A') return 'text-green-700 bg-green-50';
    if (grade === 'AB') return 'text-teal-700 bg-teal-50';
    if (grade === 'B') return 'text-blue-700 bg-blue-50';
    if (grade === 'BC') return 'text-indigo-700 bg-indigo-50';
    if (grade === 'C') return 'text-yellow-700 bg-yellow-50';
    return 'text-red-700 bg-red-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-sm text-gray-500 mt-0.5">This is what professors will see when you apply</p>
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              saved ? 'bg-green-500 text-white' : 'btn-primary'
            }`}
          >
            <Save size={15} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        {/* Personal Info */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input value={form.name || ''} onChange={e => set('name', e.target.value)} className="input-field" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input value={form.email || ''} readOnly className="input-field bg-gray-50 text-gray-500 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select value={form.year || ''} onChange={e => set('year', e.target.value)} className="input-field">
                <option value="">Select year</option>
                {YEARS.map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
              <select value={form.major || ''} onChange={e => set('major', e.target.value)} className="input-field">
                <option value="">Select major</option>
                {MAJORS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
              <input value={form.gpa || ''} onChange={e => set('gpa', e.target.value)} className="input-field" placeholder="3.85" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Personal Statement</label>
            <textarea
              value={form.bio || ''}
              onChange={e => set('bio', e.target.value)}
              className="input-field resize-none"
              rows={4}
              placeholder="Briefly describe your research interests, goals, and what you're looking for..."
            />
          </div>
        </div>

        {/* Documents */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Documents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'resumeName', label: 'Resume', accept: '.pdf,.doc,.docx' },
              { key: 'transcriptName', label: 'Transcript', accept: '.pdf' },
            ].map(({ key, label, accept }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <div className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors ${
                  form[key] ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-uw-red'
                }`}>
                  {form[key] ? (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-700 font-medium truncate">{form[key]}</span>
                      <button onClick={() => set(key, null)} className="text-gray-400 hover:text-red-500 ml-2 flex-shrink-0">
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <input type="file" accept={accept} onChange={e => handleFileUpload(key, e)} className="hidden" />
                      <Upload className="mx-auto text-gray-400 mb-1" size={20} />
                      <p className="text-xs text-gray-500">Click to upload {label}</p>
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Recommendation Letters */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Recommendation Letters</label>
              <label className="cursor-pointer text-xs text-uw-red hover:underline flex items-center gap-1">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={e => {
                    if (e.target.files[0]) {
                      set('recommendationLetters', [...(form.recommendationLetters || []), e.target.files[0].name]);
                    }
                  }}
                />
                <Plus size={13} /> Add letter
              </label>
            </div>
            {(form.recommendationLetters || []).length === 0 ? (
              <p className="text-xs text-gray-400 italic">No recommendation letters uploaded</p>
            ) : (
              <div className="space-y-1.5">
                {form.recommendationLetters.map((name, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                    <span className="text-sm text-gray-700 truncate">{name}</span>
                    <button onClick={() => set('recommendationLetters', form.recommendationLetters.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500 ml-2">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Classes */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Classes Taken</h2>
            <button
              onClick={() => setShowClassForm(!showClassForm)}
              className="flex items-center gap-1.5 text-xs text-uw-red hover:underline font-medium"
            >
              <Plus size={14} />
              Add class
            </button>
          </div>

          {showClassForm && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <input
                    value={newClass.name}
                    onChange={e => setNewClass(c => ({ ...c, name: e.target.value }))}
                    className="input-field"
                    placeholder="e.g. CS 760 - Machine Learning"
                  />
                </div>
                <div>
                  <select
                    value={newClass.grade}
                    onChange={e => setNewClass(c => ({ ...c, grade: e.target.value }))}
                    className="input-field"
                  >
                    {GRADES.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={addClass} className="btn-primary text-xs px-4 py-1.5">Add</button>
                <button onClick={() => setShowClassForm(false)} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
              </div>
            </div>
          )}

          {(form.classes || []).length === 0 ? (
            <p className="text-sm text-gray-400 italic">No classes added yet</p>
          ) : (
            <div className="space-y-2">
              {form.classes.map((c, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                  <span className="text-sm text-gray-700">{c.name}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${gradeColor(c.grade)}`}>{c.grade}</span>
                    <button onClick={() => removeClass(i)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Research Experience */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Research Experience</h2>
            <button
              onClick={() => setShowExpForm(!showExpForm)}
              className="flex items-center gap-1.5 text-xs text-uw-red hover:underline font-medium"
            >
              <Plus size={14} />
              Add experience
            </button>
          </div>

          {showExpForm && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input value={newExp.title} onChange={e => setNewExp(x => ({ ...x, title: e.target.value }))} className="input-field" placeholder="Position / Role" />
                <input value={newExp.lab} onChange={e => setNewExp(x => ({ ...x, lab: e.target.value }))} className="input-field" placeholder="Lab / Organization" />
                <input value={newExp.duration} onChange={e => setNewExp(x => ({ ...x, duration: e.target.value }))} className="input-field" placeholder="Duration (e.g. Jan 2024 – Present)" />
              </div>
              <textarea
                value={newExp.description}
                onChange={e => setNewExp(x => ({ ...x, description: e.target.value }))}
                className="input-field resize-none"
                rows={3}
                placeholder="Describe your work and contributions..."
              />
              <div className="flex gap-2">
                <button onClick={addExp} className="btn-primary text-xs px-4 py-1.5">Add</button>
                <button onClick={() => setShowExpForm(false)} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
              </div>
            </div>
          )}

          {(form.researchExperience || []).length === 0 ? (
            <p className="text-sm text-gray-400 italic">No research experience added yet</p>
          ) : (
            <div className="space-y-3">
              {form.researchExperience.map((exp, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 relative">
                  <button onClick={() => removeExp(i)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                  <div className="pr-6">
                    <p className="font-semibold text-sm text-gray-800">{exp.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{exp.lab} {exp.duration && `· ${exp.duration}`}</p>
                    {exp.description && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save button bottom */}
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
