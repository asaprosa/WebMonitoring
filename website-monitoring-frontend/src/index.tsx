import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ClerkProvider } from '@clerk/clerk-react'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_FRONTEND_API

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <App /></ClerkProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
