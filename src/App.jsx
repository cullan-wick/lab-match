import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import StudentProfile from './pages/StudentProfile';
import StudentApplications from './pages/StudentApplications';
import ProfessorDashboard from './pages/ProfessorDashboard';
import ProfessorProfile from './pages/ProfessorProfile';

function ProtectedRoute({ children, requiredType }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/" replace />;
  if (requiredType && currentUser.type !== requiredType) {
    return <Navigate to={currentUser.type === 'student' ? '/student/dashboard' : '/professor/dashboard'} replace />;
  }
  return children;
}

function AppRoutes() {
  const { currentUser } = useApp();

  return (
    <Routes>
      <Route path="/" element={
        currentUser
          ? <Navigate to={currentUser.type === 'student' ? '/student/dashboard' : '/professor/dashboard'} replace />
          : <Login />
      } />
      <Route path="/student/dashboard" element={
        <ProtectedRoute requiredType="student"><StudentDashboard /></ProtectedRoute>
      } />
      <Route path="/student/profile" element={
        <ProtectedRoute requiredType="student"><StudentProfile /></ProtectedRoute>
      } />
      <Route path="/student/applications" element={
        <ProtectedRoute requiredType="student"><StudentApplications /></ProtectedRoute>
      } />
      <Route path="/professor/dashboard" element={
        <ProtectedRoute requiredType="professor"><ProfessorDashboard /></ProtectedRoute>
      } />
      <Route path="/professor/profile" element={
        <ProtectedRoute requiredType="professor"><ProfessorProfile /></ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
