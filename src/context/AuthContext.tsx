import React, { useEffect, useState, createContext, useContext } from 'react';
interface AuthContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    // Check local storage on mount
    const storedAuth = localStorage.getItem('uniNews_isAdmin');
    if (storedAuth === 'true') {
      setIsAdmin(true);
    }
  }, []);
  const login = (username: string, password: string): boolean => {
    // Hardcoded credentials as per requirements
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('uniNews_isAdmin', 'true');
      return true;
    }
    return false;
  };
  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('uniNews_isAdmin');
  };
  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        login,
        logout
      }}>

      {children}
    </AuthContext.Provider>);

}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}