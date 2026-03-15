import { useState } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { FlaskConical, ChevronDown, ChevronUp, FileText, BookOpen, Clock, XCircle, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

function StatusBadge({ status }) {
  if (status === 'declined') return (
    <span className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill bg-danger bg-opacity-10 text-danger fw-semibold" style={{ fontSize: '0.9rem' }}>
      <XCircle size={14} /> Declined
    </span>
  );
  if (status === 'accepted') return (
    <span className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill bg-success bg-opacity-10 text-success fw-semibold" style={{ fontSize: '0.9rem' }}>
      <CheckCircle2 size={14} /> Accepted
    </span>
  );
  return (
    <span className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill bg-warning bg-opacity-10 text-warning fw-semibold" style={{ fontSize: '0.9rem' }}>
      <Clock size={14} /> Under Review
    </span>
  );
}

function ApplicationCard({ app, professor }) {
  const [expanded, setExpanded] = useState(false);
  const snap = app.studentSnapshot;

  return (
    <div className="card overflow-hidden">
      <div className="p-4">
        <div className="d-flex align-items-start gap-3">
          <div className="rounded-3 bg-danger d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
            style={{ width: 56, height: 56, fontSize: 22 }}>
            {professor?.name?.split(' ').pop()?.charAt(0) || '?'}
          </div>
          <div className="flex-grow-1">
            <div className="d-flex align-items-start justify-content-between gap-2 flex-wrap">
              <div>
                <h5 className="mb-0 fw-semibold">{professor?.name || 'Unknown Professor'}</h5>
                <p className="mb-0 text-muted" style={{ fontSize: '1rem' }}>{professor?.department}</p>
                <div className="d-flex align-items-center gap-1 mt-1">
                  <FlaskConical size={14} className="text-muted" />
                  <span className="text-muted" style={{ fontSize: '0.9rem' }}>{professor?.lab}</span>
                </div>
              </div>
              <div className="d-flex flex-column align-items-end gap-1">
                <StatusBadge status={app.status} />
                <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                  Applied {new Date(app.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>

            {app.message && (
              <div className="mt-3 bg-light rounded-3 p-3">
                <p className="mb-1 text-muted fw-semibold" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Message</p>
                <p className="mb-0 text-dark" style={{ fontSize: '0.95rem' }}>{app.message}</p>
              </div>
            )}

            {(snap.resumeFile || snap.transcriptFile) && (
              <div className="d-flex flex-wrap gap-2 mt-3">
                {snap.resumeFile && (
                  snap.resumeFile.dataUrl ? (
                    <a href={snap.resumeFile.dataUrl} download={snap.resumeFile.name}
                      className="d-inline-flex align-items-center gap-1 rounded-pill px-3 py-1 text-decoration-none"
                      style={{ fontSize: '0.85rem', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}>
                      <FileText size={13} /> {snap.resumeFile.name}
                    </a>
                  ) : (
                    <span className="d-inline-flex align-items-center gap-1 bg-light rounded-pill px-3 py-1 text-muted" style={{ fontSize: '0.85rem' }}>
                      <FileText size={13} /> {snap.resumeFile.name}
                    </span>
                  )
                )}
                {snap.transcriptFile && (
                  snap.transcriptFile.dataUrl ? (
                    <a href={snap.transcriptFile.dataUrl} download={snap.transcriptFile.name}
                      className="d-inline-flex align-items-center gap-1 rounded-pill px-3 py-1 text-decoration-none"
                      style={{ fontSize: '0.85rem', background: '#faf5ff', color: '#7c3aed', border: '1px solid #ddd6fe' }}>
                      <FileText size={13} /> {snap.transcriptFile.name}
                    </a>
                  ) : (
                    <span className="d-inline-flex align-items-center gap-1 bg-light rounded-pill px-3 py-1 text-muted" style={{ fontSize: '0.85rem' }}>
                      <FileText size={13} /> {snap.transcriptFile.name}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 w-100 d-flex align-items-center justify-content-center gap-1 btn btn-light btn-sm text-muted"
          style={{ fontSize: '0.9rem' }}
        >
          {expanded ? <><ChevronUp size={14} /> Hide profile snapshot</> : <><ChevronDown size={14} /> View submitted profile</>}
        </button>
      </div>

      {expanded && (
        <div className="border-top bg-light p-4">
          <Row className="g-4">
            {snap.classes?.length > 0 && (
              <Col xs={12} md={6}>
                <p className="mb-2 fw-semibold text-muted d-flex align-items-center gap-1" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <BookOpen size={13} /> Coursework Submitted
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {snap.classes.map((c, i) => (
                    <span key={i} className="d-inline-flex align-items-center gap-1 bg-white border rounded-pill px-3 py-1" style={{ fontSize: '0.9rem' }}>
                      {c.name}
                      <span className="fw-bold text-success ms-1">{c.grade}</span>
                    </span>
                  ))}
                </div>
              </Col>
            )}
            {snap.researchExperience?.length > 0 && (
              <Col xs={12} md={6}>
                <p className="mb-2 fw-semibold text-muted d-flex align-items-center gap-1" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <FlaskConical size={13} /> Research Experience Submitted
                </p>
                <div className="d-flex flex-column gap-2">
                  {snap.researchExperience.map((exp, i) => (
                    <div key={i} className="bg-white border rounded-3 p-3">
                      <p className="mb-0 fw-semibold" style={{ fontSize: '0.95rem' }}>{exp.title}</p>
                      <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>{exp.lab}{exp.duration ? ` · ${exp.duration}` : ''}</p>
                    </div>
                  ))}
                </div>
              </Col>
            )}
          </Row>
        </div>
      )}
    </div>
  );
}

export default function StudentApplications() {
  const { currentUser, getStudentApplications, professors } = useApp();
  const applications = getStudentApplications(currentUser.id);

  const sorted = [...applications].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />

      <div className="bg-white border-bottom py-3">
        <Container fluid className="px-5">
          <h3 className="mb-0 fw-bold">My Applications</h3>
          <p className="mb-0 text-muted" style={{ fontSize: '1rem' }}>
            {applications.length} application{applications.length !== 1 ? 's' : ''} submitted
          </p>
        </Container>
      </div>

      <Container fluid className="px-5 py-4">
        {sorted.length === 0 ? (
          <div className="text-center py-5">
            <FlaskConical className="text-muted mb-3" size={48} />
            <p className="text-muted fw-medium fs-5">No applications yet</p>
            <p className="text-muted" style={{ fontSize: '1rem' }}>Browse labs and hit Apply to get started</p>
          </div>
        ) : (
          <Row xs={1} className="g-4">
            {sorted.map(app => (
              <Col key={app.id}>
                <ApplicationCard
                  app={app}
                  professor={professors.find(p => p.id === app.professorId)}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}
