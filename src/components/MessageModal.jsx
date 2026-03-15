import { useState, useRef } from 'react';
import { X, CheckCircle, Upload, FileText, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

function FileSlot({ label, file, onUpload, onRemove, accept, inputRef }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
      <div className={`rounded-xl border-2 p-3 flex items-center justify-between gap-3 ${file ? 'border-green-300 bg-green-50' : 'border-dashed border-gray-200'}`}>
        {file ? (
          <>
            <div className="flex items-center gap-2 min-w-0">
              <FileText size={16} className="text-green-600 flex-shrink-0" />
              <span className="text-sm text-green-700 font-medium truncate">{file.name}</span>
              {!file.dataUrl && <span className="text-xs text-gray-400">(re-upload to enable download)</span>}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => inputRef.current.click()} className="text-xs text-gray-500 hover:text-gray-700 underline">Change</button>
              <button onClick={onRemove} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
            </div>
          </>
        ) : (
          <button onClick={() => inputRef.current.click()} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 w-full">
            <Upload size={15} /> <span>{label} <span className="text-gray-400">(optional)</span></span>
          </button>
        )}
        <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={onUpload} />
      </div>
    </div>
  );
}

export default function MessageModal({ professor, onClose }) {
  const { submitApplication, currentUser } = useApp();
  const [message, setMessage] = useState('');
  const [resumeFile, setResumeFile] = useState(
    currentUser?.resumeName ? { name: currentUser.resumeName, dataUrl: null } : null
  );
  const [transcriptFile, setTranscriptFile] = useState(
    currentUser?.transcriptName ? { name: currentUser.transcriptName, dataUrl: null } : null
  );
  const [sent, setSent] = useState(false);
  const resumeRef = useRef();
  const transcriptRef = useRef();

  const readFile = (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter({ name: file.name, dataUrl: reader.result });
    reader.readAsDataURL(file);
  };

  const handleApply = () => {
    submitApplication(professor.id, message, resumeFile, transcriptFile);
    setSent(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl">

        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Apply to {professor.name}</h3>
            <p className="text-sm text-gray-500">{professor.lab}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {sent ? (
          <div className="p-10 text-center">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={52} />
            <h4 className="font-semibold text-gray-900 text-lg mb-2">Application Sent!</h4>
            <p className="text-sm text-gray-500 mb-6">
              Your profile has been sent to {professor.name}.
            </p>
            <button onClick={onClose} className="btn-primary px-8 py-2">Done</button>
          </div>
        ) : (
          <>
            <div className="p-5 space-y-5">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Applying as</p>
                <p className="font-semibold text-gray-800">{currentUser?.name}</p>
                <p className="text-sm text-gray-500">{currentUser?.major} · {currentUser?.year}{currentUser?.gpa ? ` · GPA: ${currentUser.gpa}` : ''}</p>
              </div>

              <FileSlot
                label="Resume"
                file={resumeFile}
                onUpload={e => readFile(e, setResumeFile)}
                onRemove={() => setResumeFile(null)}
                accept=".pdf,.doc,.docx"
                inputRef={resumeRef}
              />
              <FileSlot
                label="Transcript"
                file={transcriptFile}
                onUpload={e => readFile(e, setTranscriptFile)}
                onRemove={() => setTranscriptFile(null)}
                accept=".pdf"
                inputRef={transcriptRef}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="input-field resize-none"
                  rows={4}
                  placeholder={`Hi ${professor.name.split(' ').pop()}, I'm interested in your research on...`}
                />
              </div>

              <p className="text-xs text-blue-700 bg-blue-50 rounded-lg p-3">
                Your full profile (classes, research experience, GPA) will be attached automatically.
              </p>
            </div>

            <div className="flex gap-3 p-5 pt-0">
              <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleApply} className="btn-primary flex-1 py-2.5">
                Submit Application
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
