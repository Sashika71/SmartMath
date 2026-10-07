# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Deploy

Build and deploy the PWA to Firebase Hosting with:

```bash
npm run deploy
```

The build step is required because Firebase Hosting publishes the `dist` directory. After deployment, open the live HTTPS URL in Chrome or Edge and check DevTools > Application:

- **Manifest** should load `/manifest.webmanifest` and show both icons.
- **Service Workers** should show `/sw.js` as activated.
- The browser's install icon or **Install SmartMath** option may only appear after a reload. Installation is provided by the browser; there is no in-app install button. Incognito mode, an old service worker, or a previously cached manifest can prevent the option; use DevTools > Application > Storage > Clear site data and reload.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
