# LabMatch

A research lab matching platform for the University of Wisconsin-Madison that connects students with professors for research opportunities.

## Overview

LabMatch is a client-side React application with a dual-role system:

- **Students** — Browse available research labs, filter by department/keywords, and apply directly with their profile, resume, and transcript
- **Professors** — View and manage incoming student applications, update lab profile and hiring status

All data is stored in the browser's `localStorage` — no backend or database is required.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 4 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 3 + React Bootstrap |
| Icons | Lucide React |
| State | React Context API + localStorage |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

The app runs at `http://localhost:5173` with hot module replacement (HMR) enabled.

### Other scripts

```bash
npm run build      # Production build → ./dist/
npm run preview    # Serve the production build locally
npm run lint       # Run ESLint
```

---

## Demo Credentials

The app ships with pre-seeded demo accounts. Use these to log in without signing up.

### Student

| Field | Value |
|-------|-------|
| Email | `student1@wisc.edu` |
| Password | `demo123` |

### Professors

Any of `prof1@wisc.edu` through `prof6@wisc.edu` with password `demo123`.

---

## Features

### Student

- Browse all available research labs with a filterable card view
- Filter by department, hiring status, and research keywords
- Search by lab name or professor name
- Apply to a lab via a modal (optional cover message, resume upload, transcript upload)
- Track application statuses: **Under Review**, **Accepted**, **Declined**
- Manage personal profile: year, major, GPA, bio, coursework, research experience

### Professor

- View all incoming student applications for their lab
- Search applications by student name, major, or keywords
- Expand each application to review the full student profile and uploaded files
- Accept or decline applications
- Manage lab profile: hiring status, description, research keywords, website, public email

---

## Project Structure

```
labmatch/
├── src/
│   ├── components/
│   │   ├── FilterPanel.jsx       # Sidebar filter panel for lab browsing
│   │   ├── MessageModal.jsx      # Application submission modal
│   │   └── Navbar.jsx            # Top navigation bar
│   ├── context/
│   │   └── AppContext.jsx        # Global state + localStorage persistence
│   ├── data/
│   │   └── mockData.js           # Seed data for demo professors/students
│   ├── pages/
│   │   ├── Login.jsx             # Login + sign-up page
│   │   ├── StudentDashboard.jsx  # Lab browsing & application page
│   │   ├── StudentProfile.jsx    # Student profile editor
│   │   ├── StudentApplications.jsx # Student's submitted applications
│   │   ├── ProfessorDashboard.jsx  # Professor's application inbox
│   │   └── ProfessorProfile.jsx    # Professor lab profile editor
│   ├── App.jsx                   # Route definitions
│   └── main.jsx                  # React entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Data Models

All data lives in `localStorage` under these keys: `uw_current_user`, `uw_professors`, `uw_students`, `uw_applications`.

### Professor

```js
{
  id: string,
  email: string,
  type: 'professor',
  name: string,
  department: string,
  lab: string,
  status: 'hiring' | 'not-hiring' | 'potentially-open',
  website: string,
  bio: string,
  keywords: string[],
  email_public: string
}
```

### Student

```js
{
  id: string,
  email: string,
  type: 'student',
  name: string,
  year: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate',
  major: string,
  gpa: string,
  bio: string,
  classes: [{ name: string, grade: string }],
  researchExperience: [{ title: string, lab: string, duration: string, description: string }]
}
```

### Application

```js
{
  id: string,
  studentId: string,
  professorId: string,
  message: string,
  status: 'under_review' | 'declined' | 'accepted',
  timestamp: ISO8601,
  studentSnapshot: {
    name, email, year, major, gpa, bio,
    classes, researchExperience,
    resumeFile: { name, dataUrl },
    transcriptFile: { name, dataUrl }
  }
}
```

---

## Deployment

LabMatch compiles to a fully static site. There is no backend, no environment variables, and no server-side logic required.

### Vercel (recommended)

1. Push the repository to GitHub.
2. Import the repo in [vercel.com](https://vercel.com).
3. Vercel auto-detects Vite. Accept the defaults:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Click **Deploy**.

### Netlify

1. Push the repository to GitHub.
2. Create a new site in [netlify.com](https://netlify.com) and connect the repo.
3. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Add a `public/_redirects` file to handle client-side routing:
   ```
   /*  /index.html  200
   ```
5. Click **Deploy site**.

### GitHub Pages

1. Install the deploy plugin:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add to `package.json`:
   ```json
   "homepage": "https://<your-username>.github.io/labmatch",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Update `vite.config.js` to set the base path:
   ```js
   export default defineConfig({
     base: '/labmatch/',
     plugins: [react()]
   })
   ```
4. Run:
   ```bash
   npm run deploy
   ```

### Manual / Any Static Host

```bash
npm run build
```

Upload the contents of the `dist/` folder to any static hosting service (S3, Cloudflare Pages, Firebase Hosting, etc.).

> **Note on client-side routing:** If your host doesn't support SPA fallbacks, configure it to redirect all requests to `index.html`. Without this, refreshing any page other than `/` will return a 404.

---

## Customization

### UW Brand Colors

Defined in `tailwind.config.js`:

```js
colors: {
  'uw-red': '#C5050C',
  'uw-dark': '#9b0000'
}
```

### Seed Data

Edit `src/data/mockData.js` to change the pre-loaded demo professors and students.

---

## License

This project was built as a student MVP. No license has been applied.
