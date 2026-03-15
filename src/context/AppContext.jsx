import { createContext, useContext, useState, useEffect } from 'react';
import { initialProfessors, initialStudents, initialApplications } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('uw_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [professors, setProfessors] = useState(() => {
    const saved = localStorage.getItem('uw_professors');
    return saved ? JSON.parse(saved) : initialProfessors;
  });

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('uw_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('uw_applications');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('uw_messages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('uw_professors', JSON.stringify(professors));
  }, [professors]);

  useEffect(() => {
    localStorage.setItem('uw_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('uw_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('uw_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('uw_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('uw_current_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    const allUsers = [...professors, ...students];
    const user = allUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return user;
    }
    return null;
  };

  const signup = (fields) => {
    const allUsers = [...professors, ...students];
    if (allUsers.find(u => u.email === fields.email)) {
      return { error: 'An account with this email already exists.' };
    }
    const id = `${fields.type}_${Date.now()}`;
    let newUser;
    if (fields.type === 'student') {
      newUser = {
        id,
        email: fields.email,
        password: fields.password,
        type: 'student',
        name: fields.name,
        year: fields.year || '',
        major: fields.major || '',
        gpa: '',
        bio: '',
        resumeName: null,
        transcriptName: null,
        classes: [],
        researchExperience: [],
        recommendationLetters: [],
      };
      setStudents(prev => [...prev, newUser]);
    } else {
      newUser = {
        id,
        email: fields.email,
        password: fields.password,
        type: 'professor',
        name: fields.name,
        department: fields.department || '',
        lab: fields.lab || '',
        status: 'not-hiring',
        website: '',
        bio: '',
        keywords: [],
        email_public: fields.email,
        avatar: null,
      };
      setProfessors(prev => [...prev, newUser]);
    }
    setCurrentUser(newUser);
    return { user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfessor = (updatedProf) => {
    setProfessors(prev => prev.map(p => p.id === updatedProf.id ? updatedProf : p));
    if (currentUser?.id === updatedProf.id) {
      setCurrentUser(updatedProf);
    }
  };

  const updateStudent = (updatedStudent) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    if (currentUser?.id === updatedStudent.id) {
      setCurrentUser(updatedStudent);
    }
  };

  const submitApplication = (professorId, message, resumeFile, transcriptFile) => {
    const student = students.find(s => s.id === currentUser.id);
    const newApp = {
      id: `app_${Date.now()}`,
      studentId: currentUser.id,
      professorId,
      message,
      status: 'under_review',
      timestamp: new Date().toISOString(),
      studentSnapshot: {
        name: student.name,
        email: student.email,
        year: student.year,
        major: student.major,
        gpa: student.gpa,
        bio: student.bio,
        classes: student.classes,
        researchExperience: student.researchExperience,
        resumeFile: resumeFile || null,
        transcriptFile: transcriptFile || null,
      }
    };
    setApplications(prev => [...prev, newApp]);
  };

  const updateApplicationStatus = (appId, status) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
  };

  const getStudentApplications = (studentId) => {
    return applications.filter(a => a.studentId === studentId);
  };

  const hasApplied = (professorId) => {
    return applications.some(a => a.studentId === currentUser?.id && a.professorId === professorId);
  };

  const getProfessorApplications = (professorId) => {
    return applications.filter(a => a.professorId === professorId);
  };

  return (
    <AppContext.Provider value={{
      currentUser, login, logout, signup,
      professors, students, applications, messages,
      updateProfessor, updateStudent,
      submitApplication, hasApplied, getProfessorApplications,
      updateApplicationStatus, getStudentApplications,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
