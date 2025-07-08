// src/main.tsx
import '@/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app/App';
import { ReactQueryProvider } from '@/app/providers/ReactQueryProvider';
import { ToastProvider } from '@/app/providers/ToastProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      {' '}
      <ToastProvider />
      <App />
    </ReactQueryProvider>
  </StrictMode>
);
