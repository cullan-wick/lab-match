import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar as BSNavbar, Container, Nav } from 'react-bootstrap';
import { useApp } from '../context/AppContext';
import { FlaskConical, LogOut, User, LayoutDashboard, ClipboardList } from 'lucide-react';

export default function Navbar() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/'); };

  const isStudent = currentUser?.type === 'student';
  const dashboardPath = isStudent ? '/student/dashboard' : '/professor/dashboard';
  const profilePath = isStudent ? '/student/profile' : '/professor/profile';

  return (
    <BSNavbar bg="white" sticky="top" className="border-bottom shadow-sm">
      <Container fluid className="px-4">
        <BSNavbar.Brand as={Link} to={dashboardPath} className="d-flex align-items-center gap-2 fw-bold text-dark fs-4">
          <div className="bg-uw-red rounded-lg p-1.5">
            <FlaskConical className="text-white" size={24} />
          </div>
          LabMatch
        </BSNavbar.Brand>

        <Nav className="ms-auto d-flex align-items-center gap-3">
          <Nav.Link
            as={Link} to={dashboardPath}
            className={`d-flex align-items-center gap-2 fw-medium fs-6 ${location.pathname === dashboardPath ? 'text-danger' : 'text-secondary'}`}
          >
            <LayoutDashboard size={20} />
            {isStudent ? 'Browse' : 'Applications'}
          </Nav.Link>
          {isStudent && (
            <Nav.Link
              as={Link} to="/student/applications"
              className={`d-flex align-items-center gap-2 fw-medium fs-6 ${location.pathname === '/student/applications' ? 'text-danger' : 'text-secondary'}`}
            >
              <ClipboardList size={20} />
              My Applications
            </Nav.Link>
          )}
          <Nav.Link
            as={Link} to={profilePath}
            className={`d-flex align-items-center gap-2 fw-medium fs-6 ${location.pathname === profilePath ? 'text-danger' : 'text-secondary'}`}
          >
            <User size={20} />
            My Profile
          </Nav.Link>

          <div className="d-flex align-items-center gap-2 ms-2 ps-2 border-start">
            <div className="text-end d-none d-sm-block">
              <p className="mb-0 fw-semibold text-dark lh-1" style={{ fontSize: '1rem' }}>{currentUser?.name}</p>
              <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>{isStudent ? 'Student' : 'Professor'}</p>
            </div>
            <div className="rounded-circle bg-danger d-flex align-items-center justify-content-center text-white fw-bold"
              style={{ width: 42, height: 42, fontSize: 18 }}>
              {currentUser?.name?.charAt(0)}
            </div>
            <button onClick={handleLogout} className="btn btn-outline-secondary border-0" title="Sign out">
              <LogOut size={20} />
            </button>
          </div>
        </Nav>
      </Container>
    </BSNavbar>
  );
}
