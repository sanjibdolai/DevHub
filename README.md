# DevHub

A modern developer and blog directory web app.

## Features

- Firebase authentication (email/password)
- Protected routes for blog create/edit
- Developer directory: search, filter, pagination, avatar fallback
- Developer profile: bio, skills, social links, blog posts
- Blog system: CRUD, markdown, comments, pegination
- Dark/light theme toggle (persisted)
- Responsive UI (mobile-first)
- Lazy loading (React.lazy + Suspense)
- Code splitting (route-based)
- Form validation (React Hook Form + Yup)
- Mock API (JSON Server)
- Vercel deployment ready

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start mock API:
   ```sh
   npx json-server --watch db.json --port 3000 --middlewares middleware.cjs
   ```
3. Start the app:
   ```sh
   npm run dev
   ```

## Deployment

- Deploy to Vercel. See `vercel.json` for SPA routing.

## Tech Stack

- React 19, React Router 7, Redux Toolkit, RTK Query, TailwindCSS, JSON Server, Firebase Auth
