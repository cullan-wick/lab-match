import { X } from 'lucide-react';

const DEPARTMENTS = ['Computer Sciences', 'Statistics', 'Biochemistry', 'Physics', 'Electrical & Computer Engineering', 'Psychology'];
const ALL_KEYWORDS = ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Protein Folding', 'CRISPR', 'Bayesian Methods', 'Causal Inference', 'Quantum Algorithms', 'Robotics', 'fMRI', 'Cognitive Science'];

export default function FilterPanel({ filters, onChange, onClose }) {
  const toggle = (key, value) => {
    const arr = filters[key] || [];
    onChange({
      ...filters,
      [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
    });
  };

  const hasFilters = (filters.status?.length > 0) || (filters.departments?.length > 0) || (filters.keywords?.length > 0);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex justify-end" onClick={onClose}>
      <div
        className="bg-white w-80 h-full overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Filters</h3>
          <div className="flex items-center gap-2">
            {hasFilters && (
              <button
                onClick={() => onChange({ status: [], departments: [], keywords: [] })}
                className="text-xs text-uw-red hover:underline"
              >
                Clear all
              </button>
            )}
            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Status */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Hiring Status</h4>
            <div className="space-y-2">
              {[
                { value: 'hiring', label: 'Actively Hiring', color: 'text-green-700 bg-green-50 border-green-200' },
                { value: 'potentially-open', label: 'Potentially Open', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
                { value: 'not-hiring', label: 'Not Hiring', color: 'text-red-700 bg-red-50 border-red-200' },
              ].map(({ value, label, color }) => (
                <label key={value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(filters.status || []).includes(value)}
                    onChange={() => toggle('status', value)}
                    className="rounded border-gray-300 text-uw-red focus:ring-uw-red"
                  />
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${color}`}>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Department */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Department</h4>
            <div className="space-y-2">
              {DEPARTMENTS.map(dept => (
                <label key={dept} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(filters.departments || []).includes(dept)}
                    onChange={() => toggle('departments', dept)}
                    className="rounded border-gray-300 text-uw-red focus:ring-uw-red"
                  />
                  <span className="text-sm text-gray-600">{dept}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Research Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {ALL_KEYWORDS.map(kw => (
                <button
                  key={kw}
                  onClick={() => toggle('keywords', kw)}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                    (filters.keywords || []).includes(kw)
                      ? 'bg-uw-red text-white border-uw-red'
                      : 'border-gray-200 text-gray-600 hover:border-uw-red hover:text-uw-red'
                  }`}
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
