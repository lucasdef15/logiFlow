import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Home from './pages/Home.tsx';
import Contact from './pages/Contact.tsx';
import About from './pages/About.tsx';
import FreeTrialPage from './pages/FreeTrialPage.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext.tsx';
import { ThemeProvider } from './context/Theme-provider.tsx';
import RegistrationDetails from './pages/RegistrationDetails.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { path: '', Component: Home },
      { path: 'contact', Component: Contact },
      { path: 'about', Component: About },
      { path: 'free-trial', Component: FreeTrialPage },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },

      // Rotas protegidas
      {
        path: 'dashboard',
        element: <ProtectedRoute />,
        children: [{ path: '', element: <Dashboard /> }],
      },
      {
        path: 'registrationDetails',
        element: <ProtectedRoute />,
        children: [{ path: '', element: <RegistrationDetails /> }],
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
