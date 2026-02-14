# Research Match — UW-Madison Lab Opportunities Dashboard

A Next.js MVP demonstrating a research lab opportunities platform for UW-Madison students and professors.

## Overview

Research Match is a proof-of-concept web application showcasing how students can browse research lab openings and how professors can review applicants. This is a frontend-only demo with no backend or authentication—perfect for presenting to UW-Madison professors.

## Features

### Three Interactive Views

1. **Login Screen** - Welcome page with "Student Login" and "Professor Login" buttons
2. **Student Dashboard** - Browse available research lab opportunities with:
   - Lab details (name, professor, department, status)
   - Research descriptions and keywords
   - Application status indicators
   - Search functionality (visual only)

3. **Professor Dashboard** - Review student applications with:
   - Applicant summary statistics
   - Student profiles with GPA, coursework, and interest statements
   - Application status tracking (New/Reviewed/Shortlisted)
   - Quick view/review actions

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hooks** (useState for view management)

## Design System

Strictly follows UW-Madison branding:
- **Primary Color**: Cardinal Red (#c5050c)
- **Hover State**: Dark Red (#9b0000)
- **Background**: White (#ffffff)
- **Text**: Black (#000000) and Gray (#4a4a4a)
- **Card Backgrounds**: Light Gray (#f5f5f5)
- **Status Indicators**: Green (#28a745)

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Mock Data

The application includes realistic UW-Madison data:

### Research Labs
- Computational Biology Lab (Biochemistry)
- Human-Computer Interaction Group (Computer Sciences)
- Cognitive Neuroscience Lab (Psychology)
- Sustainable Energy Systems Lab (Mechanical Engineering)
- Social Networks & Data Science Group (Sociology)
- Quantum Computing Research Lab (Physics)

### Student Applications
- 6 diverse student profiles with realistic:
  - UW course numbers (CS 540, STAT 340, etc.)
  - Major and year information
  - GPA and coursework details
  - Research interest statements

## Key Interactions

- **View Switching**: Toggle between student and professor perspectives
- **Hover States**: All interactive elements have visual feedback
- **Status Indicators**: Color-coded badges for application and recruitment status
- **Responsive Cards**: Lab and applicant cards with shadow effects on hover
- **Smooth Transitions**: State changes include subtle fade effects

## Project Structure

```
research-match/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main application (all components and logic)
│   └── globals.css      # Global styles and Tailwind imports
├── tailwind.config.ts   # Tailwind configuration with UW colors
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Demo Notes

- No backend functionality—all data is hardcoded
- "Login" buttons simply switch views (no authentication)
- Search bars, profile buttons, and apply buttons are styled but non-functional
- Optimized for laptop screens (1280px+)
- Internal scrolling for content areas to maintain dashboard feel

## Future Enhancements (Not Included)

- Real authentication system
- Backend API integration
- Database for labs and applications
- Email notifications
- File upload for resumes/transcripts
- Advanced search and filtering
- Mobile responsive design

## License

MIT

## Contact

Built as an MVP for UW-Madison research opportunity matching.
© 2025 Research Match — University of Wisconsin-Madison
# lab-match
