import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Обновленная декларация типов для Skulpt
declare global {
  interface Window {
    Sk: {
      configure: (config: {
        output: (text: string) => void;
        read?: (name: string) => string;
        __future__?: any;
      }) => void;
      importMainWithBody: (
        name: string,
        isAsync: boolean,
        body: string,
        canSuspend: boolean
      ) => Promise<void>;
      misceval: {
        asyncToPromise: <T>(fn: () => T) => Promise<T>;
      };
      builtinFiles: {
        files: Record<string, string>;
      };
      python3: boolean;
    };
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);