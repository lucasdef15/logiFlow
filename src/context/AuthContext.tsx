import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: any;
  company: any;
  login: (data: { token: string; user: any; company: any }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem('token')
  );

  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [company, setCompany] = useState(() => {
    const stored = sessionStorage.getItem('company');
    return stored ? JSON.parse(stored) : null;
  });

  const login = ({
    token,
    user,
    company,
  }: {
    token: string;
    user: any;
    company: any;
  }) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('company', JSON.stringify(company));

    setToken(token);
    setUser(user);
    setCompany(company);
  };

  const logout = () => {
    sessionStorage.clear();
    setToken(null);
    setUser(null);
    setCompany(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, user, company, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
