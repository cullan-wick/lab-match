'use client';

import { useState } from 'react';

// ============================================================================
// TYPES
// ============================================================================

type ViewState = 'login' | 'student' | 'professor' | 'application-detail' | 'student-profile' | 'professor-profile';

type StudentProfile = {
  name: string;
  email: string;
  major: string;
  graduationYear: string;
  classes: CourseGrade[];
  extracurriculars: string[];
  pastResearch: string[];
};

type ProfessorProfile = {
  name: string;
  email: string;
  keywords: string[];
  labName: string;
  isRecruiting: boolean;
  websiteUrl: string;
};

type LabListing = {
  id: string;
  labName: string;
  professorName: string;
  department: string;
  status: 'recruiting' | 'closed';
  description: string;
  keywords: string[];
  websiteUrl: string;
};

type CourseGrade = {
  courseName: string;
  grade: string;
};

type StudentApplication = {
  id: string;
  studentName: string;
  email: string;
  major: string;
  year: string;
  graduationYear: string;
  gpa: string;
  coursework: string[];
  classes: CourseGrade[];
  extracurriculars: string[];
  pastResearch: string[];
  interestStatement: string;
  status: 'new' | 'reviewed' | 'shortlisted';
};

// ============================================================================
// MOCK DATA
// ============================================================================

const mockLabListings: LabListing[] = [
  {
    id: '1',
    labName: 'Computational Biology Lab',
    professorName: 'Dr. Sarah Chen',
    department: 'Biochemistry',
    status: 'recruiting',
    description: 'Investigating protein folding dynamics using machine learning and molecular simulation techniques.',
    keywords: ['Machine Learning', 'Genomics', 'Python', 'Bioinformatics'],
    websiteUrl: '#',
  },
  {
    id: '2',
    labName: 'Human-Computer Interaction Group',
    professorName: 'Dr. Michael Rodriguez',
    department: 'Computer Sciences',
    status: 'recruiting',
    description: 'Exploring novel interaction paradigms for accessibility and inclusive design in AR/VR environments.',
    keywords: ['HCI', 'UX Research', 'Virtual Reality', 'JavaScript'],
    websiteUrl: '#',
  },
  {
    id: '3',
    labName: 'Cognitive Neuroscience Lab',
    professorName: 'Dr. Emily Thompson',
    department: 'Psychology',
    status: 'closed',
    description: 'Studying decision-making processes and reward pathways using fMRI and behavioral experiments.',
    keywords: ['Neuroscience', 'fMRI', 'MATLAB', 'Statistics'],
    websiteUrl: '#',
  },
  {
    id: '4',
    labName: 'Sustainable Energy Systems Lab',
    professorName: 'Dr. James Liu',
    department: 'Mechanical Engineering',
    status: 'recruiting',
    description: 'Developing next-generation battery technologies and renewable energy storage solutions.',
    keywords: ['Clean Energy', 'Materials Science', 'Thermodynamics', 'CAD'],
    websiteUrl: '#',
  },
  {
    id: '5',
    labName: 'Social Networks & Data Science Group',
    professorName: 'Dr. Priya Patel',
    department: 'Sociology',
    status: 'recruiting',
    description: 'Analyzing social media behavior patterns and their impact on public health communication.',
    keywords: ['Data Science', 'Social Networks', 'R', 'Natural Language Processing'],
    websiteUrl: '#',
  },
  {
    id: '6',
    labName: 'Quantum Computing Research Lab',
    professorName: 'Dr. Robert Zhang',
    department: 'Physics',
    status: 'closed',
    description: 'Advancing quantum error correction and developing quantum algorithms for optimization problems.',
    keywords: ['Quantum Computing', 'Physics', 'Linear Algebra', 'C++'],
    websiteUrl: '#',
  },
];

const mockStudentApplications: StudentApplication[] = [
  {
    id: '1',
    studentName: 'Alex Martinez',
    email: 'amartinez@wisc.edu',
    major: 'Computer Science',
    year: 'Junior',
    graduationYear: '2026',
    gpa: '3.8/4.0',
    coursework: ['CS 540 — Intro to AI', 'CS 577 — Algorithms', 'STAT 340 — Data Science'],
    classes: [
      { courseName: 'CS 540 — Intro to Artificial Intelligence', grade: 'A' },
      { courseName: 'CS 577 — Introduction to Algorithms', grade: 'A-' },
      { courseName: 'STAT 340 — Data Science Modeling', grade: 'A' },
      { courseName: 'CS 564 — Database Management Systems', grade: 'B+' },
      { courseName: 'MATH 340 — Elementary Matrix & Linear Algebra', grade: 'A-' },
    ],
    extracurriculars: [
      'Vice President, UW Data Science Club',
      'Volunteer Tutor, Computer Science Learning Center',
      'Member, Association for Computing Machinery (ACM)',
    ],
    pastResearch: [
      'Undergraduate Research Assistant, Dr. Lisa Wang\'s ML Lab (Fall 2024) - Worked on natural language processing models for medical text analysis',
      'Summer Research Intern, Morgridge Institute (Summer 2024) - Developed image classification algorithms for biological data',
    ],
    interestStatement: 'Passionate about applying machine learning to solve real-world healthcare challenges. I am particularly interested in developing interpretable AI models that can assist clinicians in diagnostic decision-making.',
    status: 'new',
  },
  {
    id: '2',
    studentName: 'Jordan Kim',
    email: 'jkim@wisc.edu',
    major: 'Biochemistry',
    year: 'Sophomore',
    graduationYear: '2027',
    gpa: '3.9/4.0',
    coursework: ['BIOCHEM 501 — Biochemistry', 'CHEM 343 — Organic Chemistry', 'CS 220 — Data Science'],
    classes: [
      { courseName: 'BIOCHEM 501 — Introduction to Biochemistry', grade: 'A' },
      { courseName: 'CHEM 343 — Organic Chemistry I', grade: 'A' },
      { courseName: 'CS 220 — Data Science Programming I', grade: 'A' },
      { courseName: 'BIOLOGY 152 — Introductory Biology', grade: 'A' },
      { courseName: 'MATH 221 — Calculus and Analytic Geometry', grade: 'A-' },
    ],
    extracurriculars: [
      'President, Undergraduate Biochemistry Society',
      'Research Volunteer, UW Hospital Pharmacy',
      'Teaching Assistant, Chemistry Department',
    ],
    pastResearch: [
      'Research Volunteer, Dr. Chen\'s Structural Biology Lab (Spring 2025) - Assisted with protein crystallization experiments and data collection',
    ],
    interestStatement: 'Eager to explore protein structure prediction using computational methods. My goal is to bridge wet lab biochemistry with bioinformatics to accelerate drug discovery. I\'m fascinated by how ML can reveal protein folding patterns.',
    status: 'reviewed',
  },
  {
    id: '3',
    studentName: 'Taylor Johnson',
    email: 'tjohnson@wisc.edu',
    major: 'Psychology',
    year: 'Senior',
    graduationYear: '2025',
    gpa: '3.7/4.0',
    coursework: ['PSYCH 210 — Experimental Methods', 'PSYCH 560 — Cognitive Neuroscience', 'STAT 240'],
    classes: [
      { courseName: 'PSYCH 210 — Introduction to Experimental Methods', grade: 'A-' },
      { courseName: 'PSYCH 560 — Principles of Cognitive Neuroscience', grade: 'A' },
      { courseName: 'STAT 240 — Introduction to Statistics', grade: 'B+' },
      { courseName: 'PSYCH 435 — Learning and Memory', grade: 'A' },
      { courseName: 'NEUROSCI 201 — Introduction to Neuroscience', grade: 'A-' },
    ],
    extracurriculars: [
      'Research Coordinator, Psychology Honors Program',
      'Peer Mentor, First-Year Psychology Students',
      'Member, Psi Chi International Honor Society',
    ],
    pastResearch: [
      'Honors Thesis Research, Dr. Thompson\'s Cognitive Neuroscience Lab (2024-2025) - Investigating neural correlates of episodic memory using fMRI',
      'Research Assistant, Dr. Martinez\'s Behavioral Lab (2023-2024) - Conducted behavioral experiments on decision-making under uncertainty',
    ],
    interestStatement: 'Interested in understanding the neural basis of learning and memory. My honors thesis explores how reward signals modulate memory consolidation. I aim to pursue a PhD in cognitive neuroscience and study memory disorders like Alzheimer\'s.',
    status: 'shortlisted',
  },
  {
    id: '4',
    studentName: 'Sam Nguyen',
    email: 'snguyen@wisc.edu',
    major: 'Data Science',
    year: 'Junior',
    graduationYear: '2026',
    gpa: '3.6/4.0',
    coursework: ['CS 540 — Intro to AI', 'STAT 451 — Machine Learning', 'COMP SCI 639 — Data Management'],
    classes: [
      { courseName: 'CS 540 — Intro to Artificial Intelligence', grade: 'B+' },
      { courseName: 'STAT 451 — Introduction to Machine Learning', grade: 'A-' },
      { courseName: 'COMP SCI 639 — Foundations of Data Management', grade: 'B' },
      { courseName: 'STAT 340 — Data Science Modeling', grade: 'A' },
      { courseName: 'INFO SCI 301 — Introduction to Information Science', grade: 'A-' },
    ],
    extracurriculars: [
      'Project Lead, Madison Data Analytics Club',
      'Data Analytics Intern, UW Athletics Department',
      'Hackathon Participant, BadgerHacks 2024',
    ],
    pastResearch: [
      'Independent Study Project (Fall 2024) - Built predictive models for student retention using university enrollment data',
    ],
    interestStatement: 'Looking to apply data analysis skills to social science research problems. I believe data-driven insights can inform better public policy and social interventions. Particularly interested in network analysis and social media behavioral patterns.',
    status: 'new',
  },
  {
    id: '5',
    studentName: 'Riley Chen',
    email: 'rchen@wisc.edu',
    major: 'Mechanical Engineering',
    year: 'Sophomore',
    graduationYear: '2027',
    gpa: '3.85/4.0',
    coursework: ['ME 340 — Thermodynamics', 'ME 361 — Material Science', 'MATH 234 — Calculus'],
    classes: [
      { courseName: 'ME 340 — Introduction to Thermodynamics', grade: 'A' },
      { courseName: 'ME 361 — Introduction to Material Science', grade: 'A-' },
      { courseName: 'MATH 234 — Calculus—Functions of Several Variables', grade: 'A' },
      { courseName: 'ME 303 — Fundamental Concepts of Engineering Drawing', grade: 'A' },
      { courseName: 'PHYSICS 208 — General Physics', grade: 'B+' },
    ],
    extracurriculars: [
      'Team Member, Formula SAE Racing Team',
      'Sustainability Chair, Engineering Student Council',
      'Volunteer, Engineering Outreach Programs',
    ],
    pastResearch: [
      'Research Volunteer, Dr. Liu\'s Energy Systems Lab (Spring 2025) - Assisted with battery characterization experiments and data analysis',
    ],
    interestStatement: 'Motivated to contribute to sustainable energy solutions and battery research. Climate change is the defining challenge of our generation, and I want to develop technologies for clean energy storage. Excited about lithium-ion alternatives.',
    status: 'reviewed',
  },
  {
    id: '6',
    studentName: 'Morgan Lee',
    email: 'mlee@wisc.edu',
    major: 'Physics',
    year: 'Senior',
    graduationYear: '2025',
    gpa: '4.0/4.0',
    coursework: ['PHYSICS 449 — Quantum Mechanics', 'MATH 541 — Linear Algebra', 'CS 532 — Theory'],
    classes: [
      { courseName: 'PHYSICS 449 — Quantum Mechanics II', grade: 'A' },
      { courseName: 'MATH 541 — Modern Algebra', grade: 'A' },
      { courseName: 'CS 532 — Theory of Computation', grade: 'A' },
      { courseName: 'PHYSICS 721 — Electromagnetic Theory', grade: 'A' },
      { courseName: 'MATH 521 — Analysis I', grade: 'A' },
    ],
    extracurriculars: [
      'President, Society of Physics Students',
      'Math Tutor, STEM Learning Center',
      'Organizer, Physics Colloquium Series',
    ],
    pastResearch: [
      'Honors Research, Dr. Zhang\'s Quantum Computing Lab (2024-2025) - Developing quantum error correction codes for topological qubits',
      'Summer Research, IBM Quantum Network (Summer 2024) - Implemented quantum algorithms on IBM quantum computers',
    ],
    interestStatement: 'Excited about quantum algorithms and their applications in cryptography. I\'m particularly interested in post-quantum cryptographic systems that can resist attacks from quantum computers. Planning to pursue a PhD in quantum information science.',
    status: 'new',
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ResearchMatch() {
  const [view, setView] = useState<ViewState>('login');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [previousView, setPreviousView] = useState<ViewState>('student');

  // Profile states
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    name: 'Alex Johnson',
    email: 'ajohnson@wisc.edu',
    major: 'Computer Science',
    graduationYear: '2026',
    classes: [
      { courseName: 'CS 540 — Intro to Artificial Intelligence', grade: 'A' },
      { courseName: 'CS 577 — Introduction to Algorithms', grade: 'A-' },
    ],
    extracurriculars: ['Data Science Club', 'ACM Member'],
    pastResearch: ['ML Research Lab - Summer 2024'],
  });

  const [professorProfile, setProfessorProfile] = useState<ProfessorProfile>({
    name: 'Dr. Sarah Chen',
    email: 'schen@wisc.edu',
    keywords: ['Machine Learning', 'Genomics', 'Bioinformatics'],
    labName: 'Computational Biology Lab',
    isRecruiting: true,
    websiteUrl: 'https://biochem.wisc.edu/faculty/chen',
  });

  const handleViewApplication = (studentId: string) => {
    setSelectedStudentId(studentId);
    setView('application-detail');
  };

  const handleBackToProfessor = () => {
    setSelectedStudentId(null);
    setView('professor');
  };

  const handleViewProfile = (profileType: 'student' | 'professor') => {
    setPreviousView(view);
    setView(profileType === 'student' ? 'student-profile' : 'professor-profile');
  };

  const handleBackFromProfile = () => {
    setView(previousView);
  };

  const selectedStudent = selectedStudentId
    ? mockStudentApplications.find(s => s.id === selectedStudentId)
    : null;

  return (
    <div className="h-screen overflow-hidden bg-white">
      {view === 'login' && <LoginView onLogin={setView} />}
      {view === 'student' && (
        <StudentDashboard
          onViewChange={setView}
          onViewProfile={() => handleViewProfile('student')}
        />
      )}
      {view === 'professor' && (
        <ProfessorDashboard
          onViewChange={setView}
          onViewApplication={handleViewApplication}
          onViewProfile={() => handleViewProfile('professor')}
        />
      )}
      {view === 'application-detail' && selectedStudent && (
        <ApplicationDetailView
          student={selectedStudent}
          onBack={handleBackToProfessor}
          onViewChange={setView}
        />
      )}
      {view === 'student-profile' && (
        <StudentProfileView
          profile={studentProfile}
          onSave={setStudentProfile}
          onBack={handleBackFromProfile}
          onViewChange={setView}
        />
      )}
      {view === 'professor-profile' && (
        <ProfessorProfileView
          profile={professorProfile}
          onSave={setProfessorProfile}
          onBack={handleBackFromProfile}
          onViewChange={setView}
        />
      )}
    </div>
  );
}

// ============================================================================
// LOGIN VIEW
// ============================================================================

function LoginView({ onLogin }: { onLogin: (view: ViewState) => void }) {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-200 transition-all hover:shadow-xl">
        {/* UW-Madison Crest Placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-cardinal rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-3xl font-bold">W</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-2 text-black">
          Research Match
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Connecting students with research opportunities at UW-Madison
        </p>

        {/* Login Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => onLogin('student')}
            className="w-full py-4 px-6 bg-cardinal text-white font-semibold rounded-lg shadow-md hover:bg-cardinal-dark hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Student Login
          </button>
          <button
            onClick={() => onLogin('professor')}
            className="w-full py-4 px-6 bg-cardinal text-white font-semibold rounded-lg shadow-md hover:bg-cardinal-dark hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Professor Login
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          © 2025 Research Match — University of Wisconsin-Madison
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// STUDENT DASHBOARD
// ============================================================================

function StudentDashboard({
  onViewChange,
  onViewProfile,
}: {
  onViewChange: (view: ViewState) => void;
  onViewProfile: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState<LabListing | null>(null);

  const handleApply = (lab: LabListing) => {
    setSelectedLab(lab);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLab(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-2xl font-bold text-black">Research Match — Lab Listings</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onViewChange('professor')}
            className="px-4 py-2 text-sm text-gray-700 hover:text-cardinal font-medium transition-colors"
          >
            Switch to Professor View
          </button>
          <button
            onClick={onViewProfile}
            className="px-4 py-2 text-sm text-gray-700 hover:text-cardinal font-medium transition-colors"
          >
            Profile
          </button>
          <button
            onClick={() => onViewChange('login')}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search by keyword, professor, or department..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal focus:border-transparent"
          readOnly
        />
      </div>

      {/* Lab Listings */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-6xl mx-auto space-y-4">
          {mockLabListings.map((lab) => (
            <LabCard key={lab.id} lab={lab} onApply={handleApply} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3 text-center text-xs text-gray-500">
        © 2025 Research Match — University of Wisconsin-Madison
      </footer>

      {/* Application Modal */}
      {isModalOpen && selectedLab && (
        <ApplicationModal lab={selectedLab} onClose={handleCloseModal} />
      )}
    </div>
  );
}

function LabCard({ lab, onApply }: { lab: LabListing; onApply: (lab: LabListing) => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Lab Name & Professor */}
          <h2 className="text-xl font-bold text-black mb-1">{lab.labName}</h2>
          <p className="text-sm text-gray-600 mb-2">
            {lab.professorName} — {lab.department}
          </p>

          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-3">
            {lab.status === 'recruiting' ? (
              <>
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                <span className="text-sm font-medium text-green-600">Actively Recruiting</span>
              </>
            ) : (
              <>
                <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span>
                <span className="text-sm font-medium text-gray-500">Applications Closed</span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 mb-4">{lab.description}</p>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-4">
            {lab.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* Professor Website Link */}
          <a
            href={lab.websiteUrl}
            className="text-sm text-cardinal hover:text-cardinal-dark font-medium hover:underline"
          >
            Professor Website →
          </a>
        </div>

        {/* Apply Button */}
        <button
          onClick={() => lab.status === 'recruiting' && onApply(lab)}
          className="ml-6 px-6 py-3 bg-cardinal text-white font-semibold rounded-lg shadow-md hover:bg-cardinal-dark hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={lab.status === 'closed'}
        >
          {lab.status === 'recruiting' ? 'Apply' : 'Closed'}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// APPLICATION MODAL
// ============================================================================

function ApplicationModal({ lab, onClose }: { lab: LabListing; onClose: () => void }) {
  const [message, setMessage] = useState('');
  const maxChars = 280;

  const handleSubmit = () => {
    // Don't save anything, just close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-black mb-1">Apply to {lab.labName}</h2>
              <p className="text-sm text-gray-600">
                {lab.professorName} — {lab.department}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Why are you interested in this research opportunity?
          </label>
          <textarea
            value={message}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) {
                setMessage(e.target.value);
              }
            }}
            placeholder="Share your research interests, relevant experience, and why you'd be a great fit for this lab..."
            className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal focus:border-transparent resize-none text-sm"
            maxLength={maxChars}
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">
              Share your motivation and relevant background
            </p>
            <p className={`text-xs font-medium ${message.length >= maxChars ? 'text-red-600' : 'text-gray-500'}`}>
              {message.length}/{maxChars}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={message.length === 0}
            className="px-6 py-2 bg-cardinal text-white font-semibold rounded-lg shadow-md hover:bg-cardinal-dark hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PROFESSOR DASHBOARD
// ============================================================================

function ProfessorDashboard({
  onViewChange,
  onViewApplication,
  onViewProfile,
}: {
  onViewChange: (view: ViewState) => void;
  onViewApplication: (studentId: string) => void;
  onViewProfile: () => void;
}) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-2xl font-bold text-black">Research Match — Applicant Inbox</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onViewChange('student')}
            className="px-4 py-2 text-sm text-gray-700 hover:text-cardinal font-medium transition-colors"
          >
            Switch to Student View
          </button>
          <button
            onClick={onViewProfile}
            className="px-4 py-2 text-sm text-gray-700 hover:text-cardinal font-medium transition-colors"
          >
            Profile
          </button>
          <button
            onClick={() => onViewChange('login')}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Summary Stats */}
      <div className="bg-gray-50 px-6 py-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4">
          <StatCard title="Total Applicants" value="12" />
          <StatCard title="New This Week" value="5" />
          <StatCard title="Under Review" value="3" />
        </div>
      </div>

      {/* Student Applications */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-6xl mx-auto space-y-4">
          {mockStudentApplications.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onViewApplication={onViewApplication}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3 text-center text-xs text-gray-500">
        © 2025 Research Match — University of Wisconsin-Madison
      </footer>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className="text-3xl font-bold text-cardinal">{value}</p>
    </div>
  );
}

function StudentCard({
  student,
  onViewApplication,
}: {
  student: StudentApplication;
  onViewApplication: (studentId: string) => void;
}) {
  const getStatusBadge = (status: StudentApplication['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">New</span>;
      case 'reviewed':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">Reviewed</span>;
      case 'shortlisted':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Shortlisted</span>;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Student Name & Status */}
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-black">{student.studentName}</h2>
            {getStatusBadge(student.status)}
          </div>

          {/* Email */}
          <p className="text-sm text-gray-600 mb-1">{student.email}</p>

          {/* Major, Year, GPA */}
          <p className="text-sm text-gray-700 mb-3">
            {student.major}, {student.year} — GPA: {student.gpa}
          </p>

          {/* Relevant Coursework */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-600 mb-2">Relevant Coursework:</p>
            <div className="flex flex-wrap gap-2">
              {student.coursework.map((course, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* Interest Statement */}
          <p className="text-sm text-gray-700 italic border-l-4 border-cardinal pl-3">
            "{student.interestStatement.slice(0, 150)}..."
          </p>
        </div>

        {/* View Application Button */}
        <button
          onClick={() => onViewApplication(student.id)}
          className="ml-6 px-6 py-3 bg-cardinal text-white font-semibold rounded-lg shadow-md hover:bg-cardinal-dark hover:shadow-lg transition-all"
        >
          View Application
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// APPLICATION DETAIL VIEW
// ============================================================================

function ApplicationDetailView({
  student,
  onBack,
  onViewChange,
}: {
  student: StudentApplication;
  onBack: () => void;
  onViewChange: (view: ViewState) => void;
}) {
  const getStatusBadge = (status: StudentApplication['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">New</span>;
      case 'reviewed':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">Reviewed</span>;
      case 'shortlisted':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Shortlisted</span>;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-black">Application Details</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onViewChange('student')}
            className="px-4 py-2 text-sm text-gray-700 hover:text-cardinal font-medium transition-colors"
          >
            Switch to Student View
          </button>
          <button className="px-4 py-2 text-sm text-gray-700 hover:text-cardinal font-medium transition-colors">
            Profile
          </button>
          <button
            onClick={() => onViewChange('login')}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Student Header Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">{student.studentName}</h2>
                <p className="text-lg text-gray-600 mb-1">{student.email}</p>
                <p className="text-base text-gray-700">
                  {student.major}, {student.year} • Expected Graduation: {student.graduationYear}
                </p>
              </div>
              {getStatusBadge(student.status)}
            </div>
            <div className="bg-cardinal/5 rounded-lg p-4 border-l-4 border-cardinal">
              <p className="text-sm font-semibold text-gray-700 mb-1">GPA</p>
              <p className="text-2xl font-bold text-cardinal">{student.gpa}</p>
            </div>
          </div>

          {/* Classes & Grades */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              📚 Classes & Grades
            </h3>
            <div className="space-y-3">
              {student.classes.map((course, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm text-gray-700 font-medium">{course.courseName}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      course.grade.startsWith('A')
                        ? 'bg-green-100 text-green-700'
                        : course.grade.startsWith('B')
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {course.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Extracurriculars */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              🎯 Extracurricular Activities
            </h3>
            <ul className="space-y-3">
              {student.extracurriculars.map((activity, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <span className="text-cardinal mt-1">•</span>
                  <span className="text-sm">{activity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Past Research */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              🔬 Past Research Experience
            </h3>
            {student.pastResearch.length > 0 ? (
              <ul className="space-y-4">
                {student.pastResearch.map((research, idx) => (
                  <li key={idx} className="p-4 bg-gray-50 rounded-lg border-l-4 border-cardinal">
                    <p className="text-sm text-gray-700">{research}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">No prior research experience listed.</p>
            )}
          </div>

          {/* Interest Statement */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              💬 Research Interest Statement
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed italic border-l-4 border-cardinal pl-4 py-2 bg-gray-50 rounded">
              "{student.interestStatement}"
            </p>
            <p className="text-xs text-gray-500 mt-2 text-right">
              {student.interestStatement.length} characters
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button className="flex-1 py-3 px-6 bg-cardinal text-white font-semibold rounded-lg shadow-md hover:bg-cardinal-dark hover:shadow-lg transition-all">
              Schedule Interview
            </button>
            <button className="flex-1 py-3 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all">
              Shortlist Applicant
            </button>
            <button className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 hover:shadow-lg transition-all">
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3 text-center text-xs text-gray-500">
        © 2025 Research Match — University of Wisconsin-Madison
      </footer>
    </div>
  );
}

// ============================================================================
// STUDENT PROFILE VIEW
// ============================================================================

function StudentProfileView({
  profile,
  onSave,
  onBack,
  onViewChange,
}: {
  profile: StudentProfile;
  onSave: (profile: StudentProfile) => void;
  onBack: () => void;
  onViewChange: (view: ViewState) => void;
}) {
  const [editedProfile, setEditedProfile] = useState(profile);
  const [newClassName, setNewClassName] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [newExtracurricular, setNewExtracurricular] = useState('');
  const [newResearch, setNewResearch] = useState('');

  const handleSave = () => {
    onSave(editedProfile);
    onBack();
  };

  const addClass = () => {
    if (newClassName && newGrade) {
      setEditedProfile({
        ...editedProfile,
        classes: [...editedProfile.classes, { courseName: newClassName, grade: newGrade }],
      });
      setNewClassName('');
      setNewGrade('');
    }
  };

  const removeClass = (index: number) => {
    setEditedProfile({
      ...editedProfile,
      classes: editedProfile.classes.filter((_, i) => i !== index),
    });
  };

  const addExtracurricular = () => {
    if (newExtracurricular) {
      setEditedProfile({
        ...editedProfile,
        extracurriculars: [...editedProfile.extracurriculars, newExtracurricular],
      });
      setNewExtracurricular('');
    }
  };

  const removeExtracurricular = (index: number) => {
    setEditedProfile({
      ...editedProfile,
      extracurriculars: editedProfile.extracurriculars.filter((_, i) => i !== index),
    });
  };

  const addResearch = () => {
    if (newResearch) {
      setEditedProfile({
        ...editedProfile,
        pastResearch: [...editedProfile.pastResearch, newResearch],
      });
      setNewResearch('');
    }
  };

  const removeResearch = (index: number) => {
    setEditedProfile({
      ...editedProfile,
      pastResearch: editedProfile.pastResearch.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-black">My Profile</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onViewChange('professor')}
            className="px-4 py-2 text-sm text-gray-700 hover:text-cardinal font-medium transition-colors"
          >
            Switch to Professor View
          </button>
          <button
            onClick={() => onViewChange('login')}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-black mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Major</label>
                <input
                  type="text"
                  value={editedProfile.major}
                  onChange={(e) => setEditedProfile({ ...editedProfile, major: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Year of Graduation</label>
                <input
                  type="text"
                  value={editedProfile.graduationYear}
                  onChange={(e) => setEditedProfile({ ...editedProfile, graduationYear: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal"
                  placeholder="e.g., 2026"
                />
              </div>
            </div>
          </div>

          {/* Classes & Grades */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-black mb-4">Classes & Grades</h3>
            <div className="space-y-3 mb-4">
              {editedProfile.classes.map((course, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{course.courseName}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-cardinal/10 text-cardinal text-sm font-bold rounded-full">
                      {course.grade}
                    </span>
                    <button
                      onClick={() => removeClass(idx)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="Course name (e.g., CS 540 — Intro to AI)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal"
              />
              <input
                type="text"
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
                placeholder="Grade"
                className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal"
              />
              <button
                onClick={addClass}
                className="px-4 py-2 bg-cardinal text-white font-semibold rounded-lg hover:bg-cardinal-dark transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Extracurriculars */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-black mb-4">Extracurricular Activities</h3>
            <div className="space-y-2 mb-4">
              {editedProfile.extracurriculars.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{activity}</span>
                  <button
                    onClick={() => removeExtracurricular(idx)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newExtracurricular}
                onChange={(e) => setNewExtracurricular(e.target.value)}
                placeholder="Add extracurricular activity"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal"
              />
              <button
                onClick={addExtracurricular}
                className="px-4 py-2 bg-cardinal text-white font-semibold rounded-lg hover:bg-cardinal-dark transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Past Research */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-black mb-4">Past Research Experience</h3>
            <div className="space-y-2 mb-4">
              {editedProfile.pastResearch.map((research, idx) => (
                <div key={idx} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700 flex-1">{research}</span>
                  <button
                    onClick={() => removeResearch(idx)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium ml-3"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newResearch}
                onChange={(e) => setNewResearch(e.target.value)}
                placeholder="Add research experience"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal"
              />
              <button
                onClick={addResearch}
                className="px-4 py-2 bg-cardinal text-white font-semibold rounded-lg hover:bg-cardinal-dark transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-black mb-4">Resume</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <button className="px-6 py-3 bg-cardinal text-white font-semibold rounded-lg shadow-md hover:bg-cardinal-dark transition-colors">
                Upload Resume (Non-functional)
              </button>
              <p className="text-sm text-gray-500 mt-2">PDF, DOC, or DOCX (Max 5MB)</p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 py-3 px-6 bg-cardinal text-white font-semibold rounded-lg shadow-md hover:bg-cardinal-dark hover:shadow-lg transition-all"
            >
              Save Profile
            </button>
            <button
              onClick={onBack}
              className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 hover:shadow-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3 text-center text-xs text-gray-500">
        © 2025 Research Match — University of Wisconsin-Madison
      </footer>
    </div>
  );
}

// ============================================================================
// PROFESSOR PROFILE VIEW
// ============================================================================

function ProfessorProfileView({
  profile,
  onSave,
  onBack,
  onViewChange,
}: {
  profile: ProfessorProfile;
  onSave: (profile: ProfessorProfile) => void;
  onBack: () => void;
  onViewChange: (view: ViewState) => void;
}) {
  const [editedProfile, setEditedProfile] = useState(profile);
  const [newKeyword, setNewKeyword] = useState('');

  const handleSave = () => {
    onSave(editedProfile);
    onBack();
  };

  const addKeyword = () => {
    if (newKeyword && !editedProfile.keywords.includes(newKeyword)) {
      setEditedProfile({
        ...editedProfile,
        keywords: [...editedProfile.keywords, newKeyword],
      });
      setNewKeyword('');
    }
  };

  const removeKeyword = (index: number) => {
    setEditedProfile({
      ...editedProfile,
      keywords: editedProfile.keywords.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-black">My Profile</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onViewChange('student')}
            className="px-4 py-2 text-sm text-gray-700 hover:text-cardinal font-medium transition-colors"
          >
            Switch to Student View
          </button>
          <button
            onClick={() => onViewChange('login')}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-black mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lab Name</label>
                <input
                  type="text"
                  value={editedProfile.labName}
                  onChange={(e) => setEditedProfile({ ...editedProfile, labName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Professor Website</label>
                <input
                  type="url"
                  value={editedProfile.websiteUrl}
                  onChange={(e) => setEditedProfile({ ...editedProfile, websiteUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Recruitment Status */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-black mb-4">Recruitment Status</h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Currently {editedProfile.isRecruiting ? 'Recruiting' : 'Full'}
                </p>
                <p className="text-xs text-gray-600">
                  Toggle to {editedProfile.isRecruiting ? 'close' : 'open'} applications for your lab
                </p>
              </div>
              <button
                onClick={() =>
                  setEditedProfile({ ...editedProfile, isRecruiting: !editedProfile.isRecruiting })
                }
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  editedProfile.isRecruiting ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    editedProfile.isRecruiting ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Research Keywords */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-black mb-4">Research Keywords</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {editedProfile.keywords.map((keyword, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1 bg-cardinal/10 text-cardinal text-sm font-medium rounded-full"
                >
                  <span>{keyword}</span>
                  <button
                    onClick={() => removeKeyword(idx)}
                    className="text-cardinal hover:text-cardinal-dark font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Add research keyword"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal"
              />
              <button
                onClick={addKeyword}
                className="px-4 py-2 bg-cardinal text-white font-semibold rounded-lg hover:bg-cardinal-dark transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 py-3 px-6 bg-cardinal text-white font-semibold rounded-lg shadow-md hover:bg-cardinal-dark hover:shadow-lg transition-all"
            >
              Save Profile
            </button>
            <button
              onClick={onBack}
              className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 hover:shadow-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3 text-center text-xs text-gray-500">
        © 2025 Research Match — University of Wisconsin-Madison
      </footer>
    </div>
  );
}
