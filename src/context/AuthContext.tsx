import React, { useEffect, useState, createContext, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
interface AuthContextType {
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL as string | undefined;
  useEffect(() => {
    if (!adminEmail) {
      console.warn(
        'VITE_ADMIN_EMAIL is not set. Admin access will be disabled.'
      );
    }
  }, [adminEmail]);
  const isAdmin = !!session?.user?.email && session.user.email === adminEmail;
  useEffect(() => {
    let isMounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setSession(data.session ?? null);
      setLoading(false);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );
    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);
  const login = async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) return false;
    if (adminEmail && data.user?.email !== adminEmail) {
      await supabase.auth.signOut();
      return false;
    }
    return true;
  };
  const logout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        login,
        logout,
        loading
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
