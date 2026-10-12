# SmartMath 🧮

A Sinhala-language mathematics quiz web app for students in grades 6–9, designed for use in tuition classes. Students practise with lesson-based multiple-choice questions and get instant scores, while tuition teachers sign in to add questions and review student results.

**Live demo:** _add your Firebase Hosting URL here_
**Source code:** https://smartmath-a9p10.web.app

![SmartMath screenshot](docs/screenshot-student.png)
<!-- Add 2–3 screenshots: student quiz, teacher dashboard, results page -->

## Why I built it

Many Sri Lankan students study maths in Sinhala, but most online practice tools are English-only. SmartMath gives tuition class students a simple, mobile-friendly way to practise in their own language, and gives tuition teachers an easy way to build question banks and track how each student is doing, without paper tests or manual marking.

## Key Features

**For students**
- Quiz interface for grades 6, 7, 8 and 9
- Lesson-based questions with four answer options
- Automatic score calculation and result saving

**For tuition teachers**
- Secure email/password login with password reset
- Dashboard to add multiple-choice questions by grade and lesson
- View student quiz results

**General**
- Sinhala-first interface, responsive on phones and desktops
- Installable Progressive Web App (PWA)
- Deployed on Firebase Hosting

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React 19, Vite, React Router |
| Styling | Tailwind CSS, Lucide React, React Icons |
| Backend / Database | Firebase Authentication, Cloud Firestore |
| Hosting | Firebase Hosting (PWA) |

## What I Learned

- Building a role-based app (student vs. teacher) with Firebase Authentication
- Designing a Firestore data model and reading/writing data from React
- Creating a responsive, installable PWA with Vite and Tailwind CSS
- Building a Sinhala-language UI and handling localisation details

## Getting Started

**Requirements:** Node.js 18+, npm, and a Firebase project with Email/Password Authentication and Cloud Firestore enabled.

```bash
git clone https://github.com/Sashika71/Mathmate.git
cd Mathmate
npm install
```

Create a `.env` file in the project root (it is git-ignored — never commit it):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Start the dev server:

```bash
npm run dev
```

Vite will show the local URL, usually `http://localhost:5173`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build and deploy to Firebase Hosting |

## Routes

| Route | Description |
| --- | --- |
| `/` | Student quiz |
| `/admin-login` | Teacher sign-in and password reset |
| `/admin` | Teacher dashboard |
| `/admin/add-questions` | Add a multiple-choice question |
| `/admin/results` | View student quiz results |

## Data Model (Firestore)

**`questions`**
```text
grade: string
lesson: string
text: string
options: string[]
correct: string
createdAt: timestamp
```

**`student_results`** — stores the score, total number of questions, and submission timestamp for each completed quiz.

## Project Structure

```text
src/
├── components/
│   ├── AdminLayout.jsx
│   ├── Header.jsx
│   └── TeacherLogin.jsx
├── pages/
│   ├── StudentPage.jsx
│   └── Teacher/
│       ├── AddQuestion.jsx
│       ├── StudentResults.jsx
│       └── TeacherDashboard.jsx
├── App.jsx
├── firebase.js
└── main.jsx
```

## Deployment

Make sure the Firebase CLI is authenticated and `firebase.json` points to your project, then run:

```bash
npm run deploy
```

This builds the app and publishes the `dist` folder to Firebase Hosting. The PWA manifest and service worker are generated during the build.

## Future Improvements

- Per-student accounts and progress history
- Timed quizzes and difficulty levels
- Charts and analytics for teachers
- Question editing and deletion

## Author

**Sashika** — [GitHub](https://github.com/Sashika71)
