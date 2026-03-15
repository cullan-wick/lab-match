import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GraduationCap, FlaskConical, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function Login() {
  const [mode, setMode] = useState(null); // 'student' | 'professor'
  const [view, setView] = useState('welcome'); // 'welcome' | 'login' | 'signup'
  const [welcomeRole, setWelcomeRole] = useState('student'); // 'student' | 'professor'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [major, setMajor] = useState('');
  const [department, setDepartment] = useState('');
  const [lab, setLab] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const { login, signup } = useApp();
  const navigate = useNavigate();

  const reset = () => {
    setMode(null);
    setView('welcome');
    setError('');
    setEmail(''); setPassword(''); setConfirmPassword('');
    setName(''); setYear(''); setMajor(''); setDepartment(''); setLab('');
  };

  const goBack = () => {
    setError('');
    if (view === 'login' || view === 'signup') {
      setView('welcome');
      setMode(null);
    }
  };

  const selectRole = (role, targetView) => {
    setMode(role);
    setView(targetView);
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const user = login(email, password);
    if (!user) { setError('Invalid email or password.'); return; }
    if (user.type !== mode) {
      setError(`This account is registered as a ${user.type}, not a ${mode}.`);
      return;
    }
    navigate(mode === 'student' ? '/student/dashboard' : '/professor/dashboard');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    const result = signup({ type: mode, name, email, password, year, major, department, lab });
    if (result.error) { setError(result.error); return; }
    navigate(mode === 'student' ? '/student/dashboard' : '/professor/dashboard');
  };

  const fillDemo = () => {
    if (mode === 'student') { setEmail('student1@wisc.edu'); setPassword('demo123'); }
    else { setEmail('prof1@wisc.edu'); setPassword('demo123'); }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="bg-uw-red rounded-full p-3">
              <FlaskConical className="text-white" size={36} />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 tracking-tight">LabMatch</h1>
          </div>
          <p className="text-gray-500 text-base">University of Wisconsin–Madison</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl px-16 py-12">

          {/* ── Welcome: choose action ── */}
          {view === 'welcome' && (
            <>
              <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">Welcome back</h2>
              <p className="text-gray-400 text-base text-center mb-10">Connect students with research labs</p>

              {/* Log In button */}
              <button
                onClick={() => selectRole(welcomeRole, 'login')}
                className="btn-primary w-full py-4 text-lg mb-5"
              >
                Log In as {welcomeRole === 'student' ? 'Student' : 'Professor'}
              </button>

              {/* Student / Professor toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
                <button
                  onClick={() => setWelcomeRole('student')}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-base font-semibold rounded-lg transition-all ${welcomeRole === 'student' ? 'bg-white text-gray-800 shadow' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <GraduationCap size={22} /> Student
                </button>
                <button
                  onClick={() => setWelcomeRole('professor')}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-base font-semibold rounded-lg transition-all ${welcomeRole === 'professor' ? 'bg-white text-gray-800 shadow' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <FlaskConical size={22} /> Professor
                </button>
              </div>

              {/* Sign Up button */}
              <button
                onClick={() => selectRole(welcomeRole, 'signup')}
                className="w-full py-4 text-lg font-semibold border-2 border-gray-200 text-gray-600 rounded-lg hover:border-gray-400 hover:text-gray-800 transition-colors"
              >
                Sign Up as {welcomeRole === 'student' ? 'Student' : 'Professor'}
              </button>
            </>
          )}

          {/* ── Login form ── */}
          {view === 'login' && (
            <>
              <button onClick={goBack} className="text-gray-400 hover:text-gray-600 text-sm mb-4 flex items-center gap-1">
                ← Back
              </button>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Sign in as {mode === 'student' ? 'Student' : 'Professor'}
              </h2>
              <p className="text-gray-400 text-xs mb-6">UW Madison credentials</p>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 text-red-700 rounded-lg p-3 mb-4 text-sm">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="input-field" placeholder="netid@wisc.edu" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="input-field pr-10" placeholder="••••••••" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full py-2.5 text-base">Sign In</button>
              </form>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <button onClick={fillDemo} className="text-xs text-gray-400 hover:text-uw-red transition-colors">
                  Fill demo credentials
                </button>
                <button onClick={() => { setView('signup'); setError(''); setPassword(''); }}
                  className="text-xs text-uw-red hover:underline font-medium">
                  Create account →
                </button>
              </div>
            </>
          )}

          {/* ── Sign Up form ── */}
          {view === 'signup' && (
            <>
              <button onClick={goBack} className="text-gray-400 hover:text-gray-600 text-sm mb-4 flex items-center gap-1">
                ← Back
              </button>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Create {mode === 'student' ? 'Student' : 'Professor'} Account
              </h2>
              <p className="text-gray-400 text-xs mb-6">Join LabMatch with your UW email</p>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 text-red-700 rounded-lg p-3 mb-4 text-sm">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    className="input-field" placeholder="Your full name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="input-field" placeholder="netid@wisc.edu" required />
                </div>

                {mode === 'student' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <select value={year} onChange={e => setYear(e.target.value)}
                        className="input-field" required>
                        <option value="">Select...</option>
                        <option>Freshman</option>
                        <option>Sophomore</option>
                        <option>Junior</option>
                        <option>Senior</option>
                        <option>Graduate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                      <input type="text" value={major} onChange={e => setMajor(e.target.value)}
                        className="input-field" placeholder="e.g. Computer Science" required />
                    </div>
                  </div>
                )}

                {mode === 'professor' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input type="text" value={department} onChange={e => setDepartment(e.target.value)}
                        className="input-field" placeholder="e.g. Computer Sciences" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lab Name</label>
                      <input type="text" value={lab} onChange={e => setLab(e.target.value)}
                        className="input-field" placeholder="Your lab name" required />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="input-field pr-10" placeholder="Min. 6 characters" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <input type={showConfirm ? 'text' : 'password'} value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="input-field pr-10" placeholder="••••••••" required />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full py-2.5 text-base !mt-4">
                  Create Account
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <button onClick={() => { setView('login'); setError(''); setPassword(''); setConfirmPassword(''); }}
                  className="text-xs text-uw-red hover:underline font-medium">
                  Already have an account? Sign in →
                </button>
              </div>
            </>
          )}

        </div>
        <p className="text-gray-400 text-xs text-center mt-6">© 2026 LabMatch. For demo purposes only.</p>
      </div>
    </div>

  );
}
