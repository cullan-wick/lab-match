import { useState, useMemo } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { ExternalLink, MessageCircle, SlidersHorizontal, Search, CheckCircle2, FlaskConical } from 'lucide-react';
import Navbar from '../components/Navbar';
import MessageModal from '../components/MessageModal';
import FilterPanel from '../components/FilterPanel';
import { useApp } from '../context/AppContext';

function StatusBadge({ status }) {
  if (status === 'hiring') return <span className="badge-hiring">● Actively Hiring</span>;
  if (status === 'not-hiring') return <span className="badge-not-hiring">● Not Hiring</span>;
  return <span className="badge-open">● Potentially Open</span>;
}

function ProfCard({ prof, onMessage }) {
  const { hasApplied } = useApp();
  const applied = hasApplied(prof.id);

  return (
    <div className="card p-4 d-flex flex-column gap-3">
      <div className="d-flex align-items-start gap-3">
        <div className="rounded-3 bg-danger d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
          style={{ width: 64, height: 64, fontSize: 28 }}>
          {prof.name.split(' ').pop().charAt(0)}
        </div>
        <div className="flex-grow-1 overflow-hidden">
          <h4 className="mb-0 fw-semibold text-truncate">{prof.name}</h4>
          <p className="mb-0 text-muted text-truncate" style={{ fontSize: '1.1rem' }}>{prof.department}</p>
          <div className="d-flex align-items-center gap-1 mt-1">
            <FlaskConical size={16} className="text-muted flex-shrink-0" />
            <span className="text-muted text-truncate" style={{ fontSize: '1rem' }}>{prof.lab}</span>
          </div>
        </div>
        <StatusBadge status={prof.status} />
      </div>

      <p className="text-muted" style={{ fontSize: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {prof.bio}
      </p>

      <div className="d-flex flex-wrap gap-2">
        {prof.keywords.map(kw => (
          <span key={kw} className="badge bg-light text-secondary fw-normal" style={{ fontSize: '0.9rem' }}>{kw}</span>
        ))}
      </div>

      <div className="d-flex align-items-center gap-3 pt-2 border-top">
        <a href={prof.website} target="_blank" rel="noopener noreferrer"
          className="d-flex align-items-center gap-1 text-muted text-decoration-none" style={{ fontSize: '0.95rem' }}>
          <ExternalLink size={16} /> Lab Website
        </a>
        <span className="text-muted">|</span>
        <span className="text-muted text-truncate" style={{ fontSize: '0.95rem' }}>{prof.email_public}</span>
        <div className="ms-auto">
          {applied ? (
            <span className="d-flex align-items-center gap-1 text-success fw-medium" style={{ fontSize: '1rem' }}>
              <CheckCircle2 size={18} /> Applied
            </span>
          ) : (
            <button onClick={() => onMessage(prof)}
              className="d-flex align-items-center gap-2 btn btn-danger fw-medium" style={{ fontSize: '1rem' }}>
              <MessageCircle size={16} /> Apply
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const { professors } = useApp();
  const [search, setSearch] = useState('');
  const [selectedProf, setSelectedProf] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ status: [], departments: [], keywords: [] });

  const activeFilterCount = (filters.status?.length || 0) + (filters.departments?.length || 0) + (filters.keywords?.length || 0);

  const filtered = useMemo(() => {
    return professors.filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.lab.toLowerCase().includes(q)
        || p.department.toLowerCase().includes(q) || p.keywords.some(k => k.toLowerCase().includes(q));
      const matchStatus = !filters.status?.length || filters.status.includes(p.status);
      const matchDept = !filters.departments?.length || filters.departments.includes(p.department);
      const matchKw = !filters.keywords?.length || filters.keywords.some(k => p.keywords.includes(k));
      return matchSearch && matchStatus && matchDept && matchKw;
    });
  }, [professors, search, filters]);

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />

      <div className="bg-white border-bottom py-3">
        <Container fluid className="px-5">
          <Row className="align-items-center g-3">
            <Col>
              <h3 className="mb-0 fw-bold">Browse Research Labs</h3>
              <p className="mb-0 text-muted" style={{ fontSize: '1rem' }}>{filtered.length} lab{filtered.length !== 1 ? 's' : ''} found</p>
            </Col>
            <Col xs="auto" className="d-flex align-items-center gap-2">
              <InputGroup style={{ width: 340 }}>
                <InputGroup.Text className="bg-white border-end-0">
                  <Search size={18} className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name, lab, keyword..."
                  className="border-start-0 ps-0"
                  style={{ fontSize: '1rem' }}
                />
              </InputGroup>
              <Button
                variant={activeFilterCount > 0 ? 'danger' : 'outline-secondary'}
                className="d-flex align-items-center gap-2"
                style={{ fontSize: '1rem' }}
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal size={18} />
                Filters
                {activeFilterCount > 0 && (
                  <Badge bg="light" text="danger" className="rounded-pill">{activeFilterCount}</Badge>
                )}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container fluid className="px-5 py-4">
        {filtered.length === 0 ? (
          <div className="text-center py-5">
            <FlaskConical className="text-muted mb-3" size={48} />
            <p className="text-muted fw-medium fs-5">No labs match your search</p>
            <p className="text-muted" style={{ fontSize: '1rem' }}>Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <Row xs={1} className="g-4">
            {filtered.map(prof => (
              <Col key={prof.id}>
                <ProfCard prof={prof} onMessage={setSelectedProf} />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {selectedProf && <MessageModal professor={selectedProf} onClose={() => setSelectedProf(null)} />}
      {showFilters && <FilterPanel filters={filters} onChange={setFilters} onClose={() => setShowFilters(false)} />}
    </div>
  );
}
