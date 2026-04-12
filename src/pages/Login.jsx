import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GraduationCap, FlaskConical } from 'lucide-react';

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();

  const enterAs = (role) => {
    const email = role === 'student' ? 'student1@wisc.edu' : 'prof1@wisc.edu';
    login(email, 'demo123');
    navigate(role === 'student' ? '/student/dashboard' : '/professor/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="bg-uw-red rounded-full p-3">
              <FlaskConical className="text-white" size={36} />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 tracking-tight">LabMatch</h1>
          </div>
          <p className="text-gray-500 text-base">University of Wisconsin–Madison</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl px-12 py-10">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">Try the Demo</h2>
          <p className="text-gray-400 text-sm text-center mb-8">Choose a role to explore the app</p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => enterAs('student')}
              className="flex items-center gap-4 w-full p-5 rounded-xl border-2 border-gray-200 hover:border-uw-red hover:bg-red-50 transition-all text-left group"
            >
              <div className="bg-gray-100 group-hover:bg-uw-red rounded-full p-3 transition-colors">
                <GraduationCap className="text-gray-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-base">Continue as Student</p>
                <p className="text-gray-400 text-sm">Browse labs and submit applications</p>
              </div>
            </button>

            <button
              onClick={() => enterAs('professor')}
              className="flex items-center gap-4 w-full p-5 rounded-xl border-2 border-gray-200 hover:border-uw-red hover:bg-red-50 transition-all text-left group"
            >
              <div className="bg-gray-100 group-hover:bg-uw-red rounded-full p-3 transition-colors">
                <FlaskConical className="text-gray-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-base">Continue as Professor</p>
                <p className="text-gray-400 text-sm">Manage your lab and review applicants</p>
              </div>
            </button>
          </div>
        </div>

        <p className="text-gray-400 text-xs text-center mt-6">© 2026 LabMatch. For demo purposes only.</p>
      </div>
    </div>
  );
}
