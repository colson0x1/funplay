import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Logo from './components/Logo';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Logo />
    <App />
  </React.StrictMode>
);