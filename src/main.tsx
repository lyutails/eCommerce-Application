import App from "./App";
import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
      <h1>Hello</h1>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}