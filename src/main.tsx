import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Home from './pages/Home.tsx';
import Contact from './pages/Contact.tsx';
import About from './pages/About.tsx';
import FreeTrialPage from './pages/FreeTrialPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '',
        Component: Home,
      },
      {
        path: 'contact',
        Component: Contact,
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: 'free-trial',
        Component: FreeTrialPage,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
