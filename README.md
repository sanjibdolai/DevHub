# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# DevHub

A modern developer and blog directory web app.

## Features
- Firebase authentication (email/password)
- Protected routes for blog create/edit
- Developer directory: search, filter, pagination, avatar fallback
- Developer profile: bio, skills, social links, blog posts
- Blog system: CRUD, markdown, comments, infinite scroll
- Dark/light theme toggle (persisted)
- Responsive UI (mobile-first)
- Lazy loading (React.lazy + Suspense)
- Code splitting (route-based)
- Form validation (React Hook Form + Zod)
- Unit testing (Jest + React Testing Library)
- Mock API (JSON Server)
- Vercel deployment ready

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start mock API:
   ```sh
   npx json-server --watch db.json --port 3001 --routes routes.json
   ```
3. Start the app:
   ```sh
   npm run dev
   ```
4. Run tests:
   ```sh
   npm test
   ```

## Deployment
- Deploy to Vercel. See `vercel.json` for SPA routing.

## Tech Stack
- React 18+, React Router 6+, Redux Toolkit, RTK Query, TailwindCSS, JSON Server, Firebase Auth

## License
MIT
