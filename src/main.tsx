import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.scss';
import { BrowserRouter } from 'react-router-dom';
// import App from './App/App';
import MainPage from './pages/Main/Main';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </React.StrictMode>
  );
}
