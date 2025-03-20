import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
// in index.tsx
import './font.css';  // Import this before index.css
// rest of your code

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
